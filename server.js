const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// --- In-memory cache with TTL ---
const _cache = {};
function getCached(key, ttlMs, fn) {
  const now = Date.now();
  if (_cache[key] && (now - _cache[key].ts) < ttlMs) return _cache[key].data;
  const data = fn();
  _cache[key] = { data, ts: now };
  return data;
}
function invalidateCache(prefix) {
  for (const k of Object.keys(_cache)) { if (k.startsWith(prefix)) delete _cache[k]; }
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// list all countries
app.get('/api/countries', (req, res) => {
  try {
    delete require.cache[require.resolve('./data/countries.json')];
    const data = require('./data/countries.json');
    res.json(data);
  } catch (err) {
    // fallback: extract countries from jewish.json
    try {
      delete require.cache[require.resolve('./data/jewish.json')];
      const jd = require('./data/jewish.json');
      res.json({ countries: Object.keys(jd.countries).sort() });
    } catch (e2) {
      res.status(404).json({ error: 'Countries not found' });
    }
  }
});

// --- SPECIFIC ROUTES (before /:religion wildcard) ---

// lookup a person by id globally
app.get('/api/person/:id', (req, res) => {
  const id = req.params.id;
  try {
    delete require.cache[require.resolve('./data/people.json')];
    const peopleData = require('./data/people.json');
    const person = peopleData.people[id];
    if (!person) return res.status(404).json({ error: 'Person not found' });
    const affiliations = [];
    const fs = require('fs');
    const files = fs.readdirSync(path.join(__dirname, 'data'));
    // Build person-to-org map for connection analysis
    const personOrgs = {}; // personId -> [{org, role, country, entryId}]
    files.forEach(fn => {
      if (fn.endsWith('.json') && fn !== 'people.json' && fn !== 'countries.json') {
        const rel = fn.replace('.json','');
        delete require.cache[require.resolve(`./data/${fn}`)];
        const data = require(`./data/${fn}`);
        for (const country in data.countries) {
          data.countries[country].forEach(entry => {
            if (entry.individuals) {
              entry.individuals.forEach(ind => {
                if (ind.id === id) {
                  const co = entry.individuals.filter(o => o.id && o.id !== id).map(o => ({ id: o.id, name: o.name, role: o.role }));
                  affiliations.push({
                    religion: rel, country, organization: entry.name, entryId: entry.id,
                    role: ind.role, category: entry.category, coIndividuals: co,
                    summary: entry.summary || '', website: entry.website || ''
                  });
                }
                // Track all people's org memberships
                if (ind.id) {
                  if (!personOrgs[ind.id]) personOrgs[ind.id] = [];
                  personOrgs[ind.id].push({ org: entry.name, entryId: entry.id, role: ind.role, country, religion: rel, category: entry.category });
                }
              });
            }
          });
        }
      }
    });

    // Build network: all people connected through shared orgs
    const networkMap = {}; // personId -> { name, sharedOrgs: [{org, theirRole, yourRole}] }
    affiliations.forEach(a => {
      (a.coIndividuals || []).forEach(co => {
        if (!networkMap[co.id]) {
          const pData = peopleData.people[co.id];
          networkMap[co.id] = { name: co.name, bio: (pData && pData.bio) ? pData.bio.substring(0, 200) : '', sharedOrgs: [] };
        }
        networkMap[co.id].sharedOrgs.push({
          org: a.organization, entryId: a.entryId, theirRole: co.role, yourRole: a.role, country: a.country, category: a.category
        });
      });
    });
    // Sort network by number of shared orgs (most connected first)
    const network = Object.entries(networkMap)
      .map(([pid, data]) => ({ id: pid, ...data }))
      .sort((a, b) => b.sharedOrgs.length - a.sharedOrgs.length);

    // Category & country summary
    const categories = {};
    const countries = {};
    affiliations.forEach(a => {
      categories[a.category] = (categories[a.category] || 0) + 1;
      countries[a.country] = (countries[a.country] || 0) + 1;
    });

    res.json(Object.assign({}, person, {
      affiliations,
      network,
      categorySummary: Object.entries(categories).sort((a,b) => b[1]-a[1]).map(([c,n]) => ({ category: c, count: n })),
      countrySummary: Object.entries(countries).sort((a,b) => b[1]-a[1]).map(([c,n]) => ({ country: c, count: n })),
      totalConnections: network.length,
      totalAffiliations: affiliations.length
    }));
  } catch (err) { console.error(err); res.status(500).json({ error: 'Server error' }); }
});

// list all people (with pagination)
app.get('/api/people/all', (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 0, 1000);
    const offset = parseInt(req.query.offset) || 0;
    const q = (req.query.q || '').toLowerCase().trim();

    const allPeople = getCached('people-all', 30000, () => {
      delete require.cache[require.resolve('./data/people.json')];
      delete require.cache[require.resolve('./data/jewish.json')];
      const peopleData = require('./data/people.json');
      const jd = require('./data/jewish.json');
      const peopleList = [];
      for (const [pid, person] of Object.entries(peopleData.people)) {
        const affs = [];
        for (const country in jd.countries) {
          for (const entry of jd.countries[country]) {
            if (entry.individuals) {
              for (const ind of entry.individuals) {
                if (ind.id === pid) affs.push({ entryId: entry.id, name: entry.name, country, role: ind.role, category: entry.category });
              }
            }
          }
        }
        peopleList.push({ id: pid, name: person.name, bio: person.bio, affiliations: affs });
      }
      peopleList.sort((a, b) => a.name.localeCompare(b.name));
      return peopleList;
    });

    let filtered = allPeople;
    if (q) filtered = allPeople.filter(p => p.name.toLowerCase().includes(q) || (p.bio || '').toLowerCase().includes(q));

    const total = filtered.length;
    if (limit > 0) filtered = filtered.slice(offset, offset + limit);
    else if (offset > 0) filtered = filtered.slice(offset);

    res.json({ total, offset, limit: limit || total, people: filtered });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// global search
app.get('/api/search', (req, res) => {
  const q = (req.query.q || '').toLowerCase().trim();
  if (!q) return res.json({ entries: [], people: [], connections: [] });
  try {
    delete require.cache[require.resolve('./data/jewish.json')];
    delete require.cache[require.resolve('./data/people.json')];
    const jd = require('./data/jewish.json');
    const pd = require('./data/people.json');
    const entries = [], connections = [];
    for (const country in jd.countries) {
      for (const entry of jd.countries[country]) {
        if (entry.name.toLowerCase().includes(q) || (entry.description || '').toLowerCase().includes(q) || (entry.type || '').toLowerCase().includes(q) || (entry.category || '').toLowerCase().includes(q)) {
          // Get context snippet around first match in description
          let snippet = (entry.description || '').substring(0, 250);
          const descLower = (entry.description || '').toLowerCase();
          const matchIdx = descLower.indexOf(q);
          if (matchIdx > 100) {
            const start = Math.max(0, matchIdx - 80);
            snippet = '...' + (entry.description || '').substring(start, start + 250);
          }
          entries.push({ id: entry.id, name: entry.name, type: entry.type, category: entry.category, country, description: snippet, founded: entry.founded || null, website: entry.website || '' });
        }
        if (entry.connections) {
          for (const conn of entry.connections) {
            if (conn.name.toLowerCase().includes(q) || (conn.description || '').toLowerCase().includes(q)) {
              connections.push({ entryId: entry.id, entryName: entry.name, country, connection: conn });
            }
          }
        }
      }
    }
    const people = [];
    for (const [pid, person] of Object.entries(pd.people)) {
      if (person.name.toLowerCase().includes(q) || (person.bio || '').toLowerCase().includes(q)) {
        people.push({ id: pid, name: person.name, bio: (person.bio || '').substring(0, 150) });
      }
    }
    res.json({ entries: entries.slice(0, 100), people: people.slice(0, 100), connections: connections.slice(0, 100) });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// stats endpoint
app.get('/api/stats', (req, res) => {
  try {
    const result = getCached('stats', 30000, () => {
      delete require.cache[require.resolve('./data/jewish.json')];
      delete require.cache[require.resolve('./data/people.json')];
      const jd = require('./data/jewish.json');
      const pd = require('./data/people.json');
      let totalEntries = 0, totalConnections = 0, totalIndividuals = 0;
      const byCountry = {}, byCategory = {}, byType = {}, connectionTypes = {};
      for (const country in jd.countries) {
        const entries = jd.countries[country];
        byCountry[country] = entries.length;
        totalEntries += entries.length;
        for (const entry of entries) {
          const cat = entry.category || 'Uncategorized';
          byCategory[cat] = (byCategory[cat] || 0) + 1;
          const t = entry.type || 'Unknown';
          byType[t] = (byType[t] || 0) + 1;
          if (entry.connections) { totalConnections += entry.connections.length; for (const c of entry.connections) { const ct = c.type || 'other'; connectionTypes[ct] = (connectionTypes[ct] || 0) + 1; } }
          if (entry.individuals) totalIndividuals += entry.individuals.length;
        }
      }
      const topCountries = Object.entries(byCountry).sort((a, b) => b[1] - a[1]).map(([country, count]) => ({ country, count }));
      const topCategories = Object.entries(byCategory).sort((a, b) => b[1] - a[1]).map(([category, count]) => ({ category, count }));
      const topTypes = Object.entries(byType).sort((a, b) => b[1] - a[1]).slice(0, 30).map(([type, count]) => ({ type, count }));
      const topConnectionTypes = Object.entries(connectionTypes).sort((a, b) => b[1] - a[1]).slice(0, 20).map(([type, count]) => ({ type, count }));
      return { totalEntries, totalCountries: Object.keys(byCountry).length, totalPeople: Object.keys(pd.people).length, totalConnections, totalIndividuals, topCountries, topCategories, topTypes, topConnectionTypes };
    });
    res.json(result);
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// detailed stats: decade histogram, connection distribution, most connected
app.get('/api/stats/detailed', (req, res) => {
  try {
    const result = getCached('stats-detailed', 30000, () => {
      delete require.cache[require.resolve('./data/jewish.json')];
      const jd = require('./data/jewish.json');
      const decades = {};
      const connDist = { '0': 0, '1-2': 0, '3-5': 0, '6-10': 0, '11-20': 0, '20+': 0 };
      const topConn = [];
      for (const c in jd.countries) {
        for (const entry of jd.countries[c]) {
          // Decade histogram
          if (entry.founded) {
            const d = Math.floor(entry.founded / 10) * 10;
            decades[d] = (decades[d] || 0) + 1;
          }
          // Connection distribution
          const nc = (entry.connections || []).length;
          if (nc === 0) connDist['0']++;
          else if (nc <= 2) connDist['1-2']++;
          else if (nc <= 5) connDist['3-5']++;
          else if (nc <= 10) connDist['6-10']++;
          else if (nc <= 20) connDist['11-20']++;
          else connDist['20+']++;
          topConn.push({ id: entry.id, name: entry.name, country: c, connections: nc });
        }
      }
      topConn.sort((a, b) => b.connections - a.connections);
      const decadesSorted = Object.entries(decades).sort((a, b) => a[0] - b[0]).map(([decade, count]) => ({ decade: +decade, count }));
      // Cumulative growth
      let cum = 0;
      const growth = decadesSorted.map(d => { cum += d.count; return { decade: d.decade, cumulative: cum }; });
      return { decades: decadesSorted, connDist, topConnected: topConn.slice(0, 15), growth };
    });
    res.json(result);
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// network graph data
app.get('/api/graph', (req, res) => {
  const country = req.query.country;
  const category = req.query.category;
  const includePeople = req.query.people !== '0'; // include people by default
  try {
    const cacheKey = `graph-${country||''}-${category||''}-p${includePeople?1:0}`;
    const result = getCached(cacheKey, 30000, () => {
      delete require.cache[require.resolve('./data/jewish.json')];
      const jd = require('./data/jewish.json');
      const nodes = [], links = [], nodeSet = new Set();
      // Build fast lookup maps: id->info and lowercased name->id
      const entryIdMap = {}, nameToId = {};
      for (const c in jd.countries) {
        for (const entry of jd.countries[c]) {
          entryIdMap[entry.id] = { name: entry.name, country: c, category: entry.category, type: entry.type };
          nameToId[entry.name.toLowerCase()] = entry.id;
        }
      }
      // Build individual-to-entries map for shared-person links
      const indToEntries = {};
      for (const c in jd.countries) {
        for (const entry of jd.countries[c]) {
          if (entry.individuals) {
            for (const ind of entry.individuals) {
              if (!indToEntries[ind.id]) indToEntries[ind.id] = [];
              indToEntries[ind.id].push({ entryId: entry.id, country: c, category: entry.category });
            }
          }
        }
      }
      const linkSet = new Set();
      for (const c in jd.countries) {
        if (country && c !== country) continue;
        for (const entry of jd.countries[c]) {
          if (category && entry.category !== category) continue;
          if (!nodeSet.has(entry.id)) { nodeSet.add(entry.id); nodes.push({ id: entry.id, name: entry.name, country: c, category: entry.category || '', type: entry.type, group: entry.category || 'other', nodeType: 'entry' }); }

          // Add people as nodes if requested
          if (includePeople && entry.individuals) {
            for (const ind of entry.individuals) {
              const personNodeId = 'person-' + ind.id;
              if (!nodeSet.has(personNodeId)) {
                nodeSet.add(personNodeId);
                nodes.push({ id: personNodeId, name: ind.name, country: c, category: 'People', type: 'Individual', group: 'People', nodeType: 'person', personId: ind.id, role: ind.role || '' });
              }
              // Link person to entry
              const lk = entry.id + '|' + personNodeId;
              if (!linkSet.has(lk)) {
                linkSet.add(lk);
                links.push({ source: entry.id, target: personNodeId, type: 'person-affiliation', description: ind.role || 'Affiliated' });
              }
            }
          }

          if (entry.connections) {
            for (const conn of entry.connections) {
              // Use direct ID or name lookup instead of scanning all entries
              const targetId = conn.entryId || nameToId[(conn.name || '').toLowerCase()];
              if (!targetId || !entryIdMap[targetId]) continue;
              const eInfo = entryIdMap[targetId];
              if (country && eInfo.country !== country && c !== country) continue;
              if (!nodeSet.has(targetId)) { nodeSet.add(targetId); nodes.push({ id: targetId, name: eInfo.name, country: eInfo.country, category: eInfo.category || '', type: eInfo.type, group: eInfo.category || 'other', nodeType: 'entry' }); }
              const lk = entry.id < targetId ? entry.id + '|' + targetId : targetId + '|' + entry.id;
              if (!linkSet.has(lk)) { linkSet.add(lk); links.push({ source: entry.id, target: targetId, type: conn.type || 'related', description: conn.description || '' }); }
            }
          }
          // Shared individuals - use prebuilt map
          if (entry.individuals) {
            for (const ind of entry.individuals) {
              const shared = indToEntries[ind.id];
              if (!shared) continue;
              for (const s of shared) {
                if (s.entryId === entry.id) continue;
                if (category && s.category !== category) continue;
                const lk = entry.id < s.entryId ? entry.id + '|' + s.entryId : s.entryId + '|' + entry.id;
                if (linkSet.has(lk)) continue;
                linkSet.add(lk);
                if (!nodeSet.has(s.entryId)) {
                  const ei = entryIdMap[s.entryId];
                  nodeSet.add(s.entryId);
                  nodes.push({ id: s.entryId, name: ei.name, country: s.country, category: ei.category || '', type: ei.type, group: ei.category || 'other', nodeType: 'entry' });
                }
                links.push({ source: entry.id, target: s.entryId, type: 'shared-person', description: 'Shared: ' + ind.name });
              }
            }
          }
        }
      }
      // Only include links where both endpoints are in the node set
      const finalLinks = links.filter(l => nodeSet.has(l.source) && nodeSet.has(l.target));
      return { nodes, links: finalLinks };
    });
    res.json(result);
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// focused network graph - N-degree neighborhood around a single entry
app.get('/api/graph/focus/:entryId', (req, res) => {
  const focusId = req.params.entryId;
  const depth = Math.min(parseInt(req.query.depth) || 2, 3);
  const includePeople = req.query.people !== '0';
  try {
    const cacheKey = `focus-${focusId}-d${depth}-p${includePeople?1:0}`;
    const result = getCached(cacheKey, 30000, () => {
      delete require.cache[require.resolve('./data/jewish.json')];
      const jd = require('./data/jewish.json');

      // Build full lookup maps
      const entryIdMap = {}, nameToId = {}, entryById = {};
      for (const c in jd.countries) {
        for (const entry of jd.countries[c]) {
          entryIdMap[entry.id] = { name: entry.name, country: c, category: entry.category, type: entry.type };
          nameToId[entry.name.toLowerCase()] = entry.id;
          entryById[entry.id] = { ...entry, _country: c };
        }
      }

      if (!entryById[focusId]) return { error: 'Entry not found', nodes: [], links: [] };

      // BFS to collect entries within N degrees
      const visited = new Set([focusId]);
      let frontier = [focusId];
      for (let d = 0; d < depth; d++) {
        const nextFrontier = [];
        for (const eid of frontier) {
          const entry = entryById[eid];
          if (!entry) continue;
          if (entry.connections) {
            for (const conn of entry.connections) {
              const tid = conn.entryId || nameToId[(conn.name || '').toLowerCase()];
              if (tid && entryById[tid] && !visited.has(tid)) {
                visited.add(tid);
                nextFrontier.push(tid);
              }
            }
          }
          // Shared individuals - entries sharing the same person
          if (entry.individuals) {
            for (const ind of entry.individuals) {
              for (const c2 in jd.countries) {
                for (const e2 of jd.countries[c2]) {
                  if (e2.id === eid || visited.has(e2.id)) continue;
                  if (e2.individuals && e2.individuals.some(i => i.id === ind.id)) {
                    visited.add(e2.id);
                    nextFrontier.push(e2.id);
                  }
                }
              }
            }
          }
        }
        frontier = nextFrontier;
      }

      // Build nodes and links from the visited set
      const nodes = [], links = [], nodeSet = new Set(), linkSet = new Set();
      for (const eid of visited) {
        const entry = entryById[eid];
        if (!entry) continue;
        const c = entry._country;
        if (!nodeSet.has(eid)) {
          nodeSet.add(eid);
          nodes.push({ id: eid, name: entry.name, country: c, category: entry.category || '', type: entry.type, group: entry.category || 'other', nodeType: 'entry', isFocus: eid === focusId });
        }
        // People
        if (includePeople && entry.individuals) {
          for (const ind of entry.individuals) {
            const pid = 'person-' + ind.id;
            if (!nodeSet.has(pid)) {
              nodeSet.add(pid);
              nodes.push({ id: pid, name: ind.name, country: c, category: 'People', type: 'Individual', group: 'People', nodeType: 'person', personId: ind.id, role: ind.role || '' });
            }
            const lk = eid + '|' + pid;
            if (!linkSet.has(lk)) { linkSet.add(lk); links.push({ source: eid, target: pid, type: 'person-affiliation', description: ind.role || 'Affiliated' }); }
          }
        }
        // Connections between visited entries
        if (entry.connections) {
          for (const conn of entry.connections) {
            const tid = conn.entryId || nameToId[(conn.name || '').toLowerCase()];
            if (!tid || !visited.has(tid)) continue;
            const lk = eid < tid ? eid + '|' + tid : tid + '|' + eid;
            if (!linkSet.has(lk)) { linkSet.add(lk); links.push({ source: eid, target: tid, type: conn.type || 'related', description: conn.description || '' }); }
          }
        }
        // Shared person links within visited set
        if (entry.individuals) {
          for (const ind of entry.individuals) {
            for (const eid2 of visited) {
              if (eid2 === eid) continue;
              const e2 = entryById[eid2];
              if (e2 && e2.individuals && e2.individuals.some(i => i.id === ind.id)) {
                const lk = eid < eid2 ? eid + '|' + eid2 : eid2 + '|' + eid;
                if (!linkSet.has(lk)) { linkSet.add(lk); links.push({ source: eid, target: eid2, type: 'shared-person', description: 'Shared: ' + ind.name }); }
              }
            }
          }
        }
      }

      const focusEntry = entryById[focusId];
      return { focusId, focusName: focusEntry.name, focusCategory: focusEntry.category, depth, nodes, links };
    });
    res.json(result);
  } catch (err) { console.error(err); res.status(500).json({ error: 'Server error' }); }
});

// timeline data endpoint - entries with founding years
app.get('/api/timeline', (req, res) => {
  try {
    const result = getCached('timeline', 30000, () => {
      delete require.cache[require.resolve('./data/jewish.json')];
      const jd = require('./data/jewish.json');
      const items = [];
      for (const country in jd.countries) {
        for (const entry of jd.countries[country]) {
          if (entry.founded) {
            items.push({ id: entry.id, name: entry.name, type: entry.type, category: entry.category || '', country, founded: entry.founded, description: (entry.description || '').substring(0, 200) });
          }
        }
      }
      items.sort((a, b) => a.founded - b.founded);
      return { total: items.length, items };
    });
    res.json(result);
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// random entries endpoint
app.get('/api/random', (req, res) => {
  const count = Math.min(parseInt(req.query.count) || 5, 20);
  try {
    delete require.cache[require.resolve('./data/jewish.json')];
    const jd = require('./data/jewish.json');
    const all = [];
    for (const country in jd.countries) {
      for (const entry of jd.countries[country]) {
        all.push(Object.assign({}, entry, { country }));
      }
    }
    // Fisher-Yates shuffle
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    const entries = all.slice(0, count).map(e => ({
      id: e.id, name: e.name, type: e.type, category: e.category || '',
      country: e.country, description: (e.description || '').substring(0, 200),
      founded: e.founded || null, website: e.website || ''
    }));
    res.json({ entries });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// degrees of separation / shortest path between two entries
app.get('/api/path', (req, res) => {
  const from = req.query.from;
  const to = req.query.to;
  if (!from || !to) return res.status(400).json({ error: 'Provide from and to entry IDs' });
  if (from === to) return res.json({ path: [from], distance: 0, edges: [] });
  try {
    delete require.cache[require.resolve('./data/jewish.json')];
    const jd = require('./data/jewish.json');
    // Build adjacency list
    const adj = {};
    const entryMap = {};
    for (const c in jd.countries) {
      for (const entry of jd.countries[c]) {
        entryMap[entry.id] = { name: entry.name, country: c, category: entry.category || '' };
        if (!adj[entry.id]) adj[entry.id] = [];
        // connections
        if (entry.connections) {
          for (const conn of entry.connections) {
            // find target entry by name
            for (const c2 in jd.countries) {
              for (const e2 of jd.countries[c2]) {
                if (conn.name.toLowerCase() === e2.name.toLowerCase() || conn.entryId === e2.id) {
                  adj[entry.id].push({ target: e2.id, type: conn.type || 'related', desc: conn.description || '', via: 'connection' });
                }
              }
            }
          }
        }
        // shared individuals
        if (entry.individuals) {
          for (const ind of entry.individuals) {
            for (const c2 in jd.countries) {
              for (const e2 of jd.countries[c2]) {
                if (e2.id === entry.id) continue;
                if (e2.individuals && e2.individuals.some(i => i.id === ind.id)) {
                  const exists = adj[entry.id].find(a => a.target === e2.id);
                  if (!exists) adj[entry.id].push({ target: e2.id, type: 'shared-person', desc: 'Via: ' + ind.name, via: 'person' });
                }
              }
            }
          }
        }
      }
    }
    // BFS
    const visited = new Set([from]);
    const queue = [[from]];
    const edgeMap = {};
    while (queue.length > 0) {
      const path = queue.shift();
      const current = path[path.length - 1];
      if (current === to) {
        // build edge details
        const edges = [];
        for (let i = 0; i < path.length - 1; i++) {
          const edgeInfo = (adj[path[i]] || []).find(e => e.target === path[i + 1]);
          edges.push({
            from: path[i], fromName: entryMap[path[i]]?.name,
            to: path[i + 1], toName: entryMap[path[i + 1]]?.name,
            type: edgeInfo?.type || 'unknown', description: edgeInfo?.desc || ''
          });
        }
        const pathDetails = path.map(id => ({ id, name: entryMap[id]?.name || id, country: entryMap[id]?.country, category: entryMap[id]?.category }));
        return res.json({ path: pathDetails, distance: path.length - 1, edges });
      }
      for (const neighbor of (adj[current] || [])) {
        if (!visited.has(neighbor.target) && entryMap[neighbor.target]) {
          visited.add(neighbor.target);
          queue.push([...path, neighbor.target]);
        }
      }
      if (visited.size > 2000) break; // safety limit
    }
    res.json({ path: [], distance: -1, edges: [], message: 'No path found between these entries' });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// audit endpoint removed from public access - use scripts/audit.js locally instead



// compare endpoint - return multiple entries for comparison
app.get('/api/compare', (req, res) => {
  const ids = (req.query.ids || '').split(',').filter(Boolean);
  if (ids.length < 2) return res.status(400).json({ error: 'Provide at least 2 entry IDs' });
  try {
    delete require.cache[require.resolve('./data/jewish.json')];
    const jd = require('./data/jewish.json');
    const results = [];
    for (const c in jd.countries) {
      for (const entry of jd.countries[c]) {
        if (ids.includes(entry.id)) {
          results.push(Object.assign({}, entry, { country: c }));
        }
      }
    }
    // find shared people between entries
    const sharedPeople = [];
    for (let i = 0; i < results.length; i++) {
      for (let j = i + 1; j < results.length; j++) {
        const a = (results[i].individuals || []).map(p => p.id);
        const b = (results[j].individuals || []).map(p => p.id);
        const shared = a.filter(id => b.includes(id));
        if (shared.length) sharedPeople.push({ entries: [results[i].id, results[j].id], people: shared });
      }
    }
    res.json({ entries: results, sharedPeople });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// --- WILDCARD ROUTES (must come after specific routes) ---

// a simple API endpoint to retrieve data by religion
app.get('/api/:religion', (req, res) => {
  const religion = req.params.religion;
  try {
    // clear cache so JSON updates are picked up without restarting
    delete require.cache[require.resolve(`./data/${religion}.json`)];
    const data = require(`./data/${religion}.json`);
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: 'Religion data not found' });
  }
});

// list all categories (unique) and entry counts for a religion
app.get('/api/:religion/categories', (req, res) => {
  const religion = req.params.religion;
  try {
    delete require.cache[require.resolve(`./data/${religion}.json`)];
    const data = require(`./data/${religion}.json`);
    const cats = {};
    for (const country in data.countries) {
      for (const entry of data.countries[country]) {
        const cat = entry.category || 'Uncategorized';
        if (!cats[cat]) cats[cat] = { count: 0, entries: [] };
        cats[cat].count++;
        cats[cat].entries.push({ id: entry.id, name: entry.name, type: entry.type, country, description: entry.description ? entry.description.substring(0, 120) + '...' : '' });
      }
    }
    // sort categories alphabetically
    const sorted = Object.keys(cats).sort().reduce((o, k) => { o[k] = cats[k]; return o; }, {});
    res.json({ categories: sorted });
  } catch (err) {
    res.status(404).json({ error: 'Religion data not found' });
  }
});

// get all entries in a specific category
app.get('/api/:religion/category/:cat', (req, res) => {
  const religion = req.params.religion;
  const cat = decodeURIComponent(req.params.cat);
  try {
    delete require.cache[require.resolve(`./data/${religion}.json`)];
    const data = require(`./data/${religion}.json`);
    const entries = [];
    for (const country in data.countries) {
      for (const entry of data.countries[country]) {
        if (entry.category === cat) {
          entries.push(Object.assign({}, entry, { country }));
        }
      }
    }
    // group by country
    const byCountry = {};
    entries.forEach(e => {
      if (!byCountry[e.country]) byCountry[e.country] = [];
      byCountry[e.country].push(e);
    });
    res.json({ category: cat, totalEntries: entries.length, countries: byCountry });
  } catch (err) {
    res.status(404).json({ error: 'Religion data not found' });
  }
});

// lookup a specific entry by id across all countries
app.get('/api/:religion/entry/:id', (req, res) => {
  const religion = req.params.religion;
  const id = req.params.id;
  try {
    delete require.cache[require.resolve(`./data/${religion}.json`)];
    const data = require(`./data/${religion}.json`);
    for (const country in data.countries) {
      const found = data.countries[country].find(e => e.id === id);
      if (found) {
        return res.json(Object.assign({}, found, { country }));
      }
    }
    res.status(404).json({ error: 'Entry not found' });
  } catch (err) {
    res.status(404).json({ error: 'Religion data not found' });
  }
});

app.listen(port, () => {
  console.log(`\n  ╔══════════════════════════════════════╗`);
  console.log(`  ║   Juice v4.2 - Est. 2016             ║`);
  console.log(`  ║   Server running on port ${port}        ║`);
  console.log(`  ║   http://localhost:${port}              ║`);
  console.log(`  ╚══════════════════════════════════════╝\n`);
});
