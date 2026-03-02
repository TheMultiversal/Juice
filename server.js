const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Gzip compression - cuts JSON payload ~70%
app.use(compression());

// Helper: normalize connection type (extract short type from "Type - Description" format)
function normalizeConnType(rawType) {
  if (!rawType) return 'related';
  const dash = rawType.indexOf(' - ');
  return dash > 0 ? rawType.substring(0, dash) : rawType;
}
function normalizeConnDesc(rawType, rawDesc) {
  if (rawDesc) return rawDesc;
  if (!rawType) return '';
  const dash = rawType.indexOf(' - ');
  return dash > 0 ? rawType.substring(dash + 3) : '';
}

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

// --- Global data & indexes (loaded once at startup) ---
let JD = null;           // jewish.json raw data
let PD = null;           // people.json raw data
let ENTRY_BY_ID = {};    // entryId -> { ...entry, _country }
let NAME_TO_ID = {};     // lowercased name -> entryId
let SLUG_TO_ID = {};     // slug(name) -> entryId
let IND_TO_ENTRIES = {}; // individualId -> [{ entryId, country, category }]
let ALL_ENTRIES = [];    // flat array of all entries with _country
let ADJ = {};            // entryId -> [{ target, type, desc, via }] for path finding

function _slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

function _resolve(name) {
  if (!name) return null;
  const id = NAME_TO_ID[name.toLowerCase()] || SLUG_TO_ID[_slug(name)];
  if (id && ENTRY_BY_ID[id]) return id;
  const np = name.replace(/\s*\([^)]*\)\s*/g, '').trim();
  if (np !== name) { const id2 = SLUG_TO_ID[_slug(np)]; if (id2 && ENTRY_BY_ID[id2]) return id2; }
  return null;
}

function loadData() {
  const t0 = Date.now();
  delete require.cache[require.resolve('./data/jewish.json')];
  delete require.cache[require.resolve('./data/people.json')];
  JD = require('./data/jewish.json');
  PD = require('./data/people.json');

  ENTRY_BY_ID = {};
  NAME_TO_ID = {};
  SLUG_TO_ID = {};
  IND_TO_ENTRIES = {};
  ALL_ENTRIES = [];

  for (const c in JD.countries) {
    for (const entry of JD.countries[c]) {
      const e = { ...entry, _country: c };
      ENTRY_BY_ID[entry.id] = e;
      NAME_TO_ID[entry.name.toLowerCase()] = entry.id;
      SLUG_TO_ID[_slug(entry.name)] = entry.id;
      ALL_ENTRIES.push(e);
      const noParens = entry.name.replace(/\s*\([^)]*\)\s*/g, '').trim();
      if (noParens !== entry.name) SLUG_TO_ID[_slug(noParens)] = entry.id;
      if (entry.individuals) {
        for (const ind of entry.individuals) {
          if (!IND_TO_ENTRIES[ind.id]) IND_TO_ENTRIES[ind.id] = [];
          IND_TO_ENTRIES[ind.id].push({ entryId: entry.id, country: c, category: entry.category || '' });
        }
      }
    }
  }

  // Pre-build adjacency list for path finding
  ADJ = {};
  for (const entry of ALL_ENTRIES) {
    if (!ADJ[entry.id]) ADJ[entry.id] = [];
    if (entry.connections) {
      for (const conn of entry.connections) {
        let tid = conn.entryId || conn.target;
        if (!tid && conn.name) tid = _resolve(conn.name);
        else if (tid && !ENTRY_BY_ID[tid] && conn.name) tid = _resolve(conn.name);
        if (tid === entry.id && conn.source) tid = conn.source;
        if (tid && tid !== entry.id && ENTRY_BY_ID[tid]) {
          ADJ[entry.id].push({ target: tid, type: normalizeConnType(conn.type), desc: normalizeConnDesc(conn.type, conn.description), via: 'connection' });
        }
      }
    }
    if (entry.individuals) {
      const addedTargets = new Set();
      for (const ind of entry.individuals) {
        const shared = IND_TO_ENTRIES[ind.id];
        if (!shared) continue;
        for (const s of shared) {
          if (s.entryId === entry.id || addedTargets.has(s.entryId)) continue;
          addedTargets.add(s.entryId);
          ADJ[entry.id].push({ target: s.entryId, type: 'shared-person', desc: 'Via: ' + ind.name, via: 'person' });
        }
      }
    }
  }

  // Clear all cached computed results
  for (const k of Object.keys(_cache)) delete _cache[k];

  console.log(`  Data loaded in ${Date.now() - t0}ms: ${ALL_ENTRIES.length} entries, ${Object.keys(PD.people).length} people, ${Object.keys(IND_TO_ENTRIES).length} individuals indexed`);
}

// ID aliases for merged/renamed entries
const ID_ALIASES = {
  'jeffrey-epstein-network': 'epstein-network',
};

const CACHE_TTL = 300000; // 5 minutes

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// list all countries
app.get('/api/countries', (req, res) => {
  try {
    try {
      delete require.cache[require.resolve('./data/countries.json')];
      const data = require('./data/countries.json');
      return res.json(data);
    } catch (e) {}
    // Fallback: extract from pre-loaded data
    res.json({ countries: Object.keys(JD.countries).sort() });
  } catch (err) {
    res.status(404).json({ error: 'Countries not found' });
  }
});

// --- SPECIFIC ROUTES (before /:religion wildcard) ---

// lookup a person by id globally
app.get('/api/person/:id', (req, res) => {
  const id = req.params.id;
  try {
    const person = PD.people[id];
    if (!person) return res.status(404).json({ error: 'Person not found' });

    // Find all affiliations using pre-built index
    const affiliations = [];
    if (IND_TO_ENTRIES[id]) {
      for (const ref of IND_TO_ENTRIES[id]) {
        const entry = ENTRY_BY_ID[ref.entryId];
        if (!entry) continue;
        const ind = (entry.individuals || []).find(i => i.id === id);
        const co = (entry.individuals || []).filter(o => o.id && o.id !== id).map(o => ({ id: o.id, name: o.name, role: o.role }));
        affiliations.push({
          religion: 'jewish', country: ref.country, organization: entry.name, entryId: entry.id,
          role: ind ? ind.role : '', category: entry.category || '', coIndividuals: co,
          summary: entry.summary || '', website: entry.website || ''
        });
      }
    }

    // Build network: all people connected through shared orgs
    const networkMap = {};
    for (const aff of affiliations) {
      for (const co of (aff.coIndividuals || [])) {
        if (!networkMap[co.id]) {
          const pData = PD.people[co.id];
          networkMap[co.id] = { name: co.name, bio: (pData && pData.bio) ? pData.bio.substring(0, 200) : '', sharedOrgs: [] };
        }
        networkMap[co.id].sharedOrgs.push({
          org: aff.organization, entryId: aff.entryId, theirRole: co.role, yourRole: aff.role, country: aff.country, category: aff.category
        });
      }
    }
    const network = Object.entries(networkMap)
      .map(([pid, data]) => ({ id: pid, ...data }))
      .sort((a, b) => b.sharedOrgs.length - a.sharedOrgs.length);

    const categories = {}, countries = {};
    affiliations.forEach(a => {
      categories[a.category] = (categories[a.category] || 0) + 1;
      countries[a.country] = (countries[a.country] || 0) + 1;
    });

    res.json(Object.assign({}, person, {
      affiliations, network,
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

    const allPeople = getCached('people-all', CACHE_TTL, () => {
      const peopleList = [];
      for (const [pid, person] of Object.entries(PD.people)) {
        const affs = (IND_TO_ENTRIES[pid] || []).map(ref => {
          const entry = ENTRY_BY_ID[ref.entryId];
          if (!entry) return null;
          const ind = (entry.individuals || []).find(i => i.id === pid);
          return { entryId: entry.id, name: entry.name, country: ref.country, role: ind ? ind.role : '', category: ref.category };
        }).filter(Boolean);
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
    const entries = [], connections = [];
    for (const entry of ALL_ENTRIES) {
      if (entry.name.toLowerCase().includes(q) || (entry.description || '').toLowerCase().includes(q) || (entry.type || '').toLowerCase().includes(q) || (entry.category || '').toLowerCase().includes(q)) {
        let snippet = (entry.description || '').substring(0, 250);
        const descLower = (entry.description || '').toLowerCase();
        const matchIdx = descLower.indexOf(q);
        if (matchIdx > 100) {
          const start = Math.max(0, matchIdx - 80);
          snippet = '...' + (entry.description || '').substring(start, start + 250);
        }
        entries.push({ id: entry.id, name: entry.name, type: entry.type, category: entry.category || '', country: entry._country, description: snippet, founded: entry.founded || null, website: entry.website || '' });
      }
      if (entry.connections) {
        for (const conn of entry.connections) {
          if ((conn.name || '').toLowerCase().includes(q) || (conn.description || '').toLowerCase().includes(q)) {
            connections.push({ entryId: entry.id, entryName: entry.name, country: entry._country, connection: conn });
          }
        }
      }
    }
    const people = [];
    for (const [pid, person] of Object.entries(PD.people)) {
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
    const result = getCached('stats', CACHE_TTL, () => {
      let totalEntries = 0, totalConnections = 0, totalIndividuals = 0;
      const byCountry = {}, byCategory = {}, byType = {}, connectionTypes = {};
      for (const entry of ALL_ENTRIES) {
        const c = entry._country;
        byCountry[c] = (byCountry[c] || 0) + 1;
        totalEntries++;
        const cat = entry.category || 'Uncategorized';
        byCategory[cat] = (byCategory[cat] || 0) + 1;
        const t = entry.type || 'Unknown';
        byType[t] = (byType[t] || 0) + 1;
        if (entry.connections) { totalConnections += entry.connections.length; for (const conn of entry.connections) { const ct = conn.type || 'other'; connectionTypes[ct] = (connectionTypes[ct] || 0) + 1; } }
        if (entry.individuals) totalIndividuals += entry.individuals.length;
      }
      const topCountries = Object.entries(byCountry).sort((a, b) => b[1] - a[1]).map(([country, count]) => ({ country, count }));
      const topCategories = Object.entries(byCategory).sort((a, b) => b[1] - a[1]).map(([category, count]) => ({ category, count }));
      const topTypes = Object.entries(byType).sort((a, b) => b[1] - a[1]).slice(0, 30).map(([type, count]) => ({ type, count }));
      const topConnectionTypes = Object.entries(connectionTypes).sort((a, b) => b[1] - a[1]).slice(0, 20).map(([type, count]) => ({ type, count }));
      return { totalEntries, totalCountries: Object.keys(byCountry).length, totalPeople: Object.keys(PD.people).length, totalConnections, totalIndividuals, topCountries, topCategories, topTypes, topConnectionTypes };
    });
    res.json(result);
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// detailed stats: decade histogram, connection distribution, most connected
app.get('/api/stats/detailed', (req, res) => {
  try {
    const result = getCached('stats-detailed', CACHE_TTL, () => {
      const decades = {};
      const connDist = { '0': 0, '1-2': 0, '3-5': 0, '6-10': 0, '11-20': 0, '20+': 0 };
      const topConn = [];
      for (const entry of ALL_ENTRIES) {
        if (entry.founded) {
          const d = Math.floor(entry.founded / 10) * 10;
          decades[d] = (decades[d] || 0) + 1;
        }
        const nc = (entry.connections || []).length;
        if (nc === 0) connDist['0']++;
        else if (nc <= 2) connDist['1-2']++;
        else if (nc <= 5) connDist['3-5']++;
        else if (nc <= 10) connDist['6-10']++;
        else if (nc <= 20) connDist['11-20']++;
        else connDist['20+']++;
        topConn.push({ id: entry.id, name: entry.name, country: entry._country, connections: nc });
      }
      topConn.sort((a, b) => b.connections - a.connections);
      const decadesSorted = Object.entries(decades).sort((a, b) => a[0] - b[0]).map(([decade, count]) => ({ decade: +decade, count }));
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
    const result = getCached(cacheKey, CACHE_TTL, () => {
      const nodes = [], links = [], nodeSet = new Set(), linkSet = new Set();
      for (const entry of ALL_ENTRIES) {
        const c = entry._country;
        if (country && c !== country) continue;
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
            const lk = entry.id + '|' + personNodeId;
            if (!linkSet.has(lk)) {
              linkSet.add(lk);
              links.push({ source: entry.id, target: personNodeId, type: 'person-affiliation', description: ind.role || 'Affiliated' });
            }
          }
        }

        if (entry.connections) {
          for (const conn of entry.connections) {
            let targetId = conn.entryId || conn.target;
            if (!targetId && conn.name) targetId = NAME_TO_ID[(conn.name || '').toLowerCase()];
            if (targetId === entry.id && conn.source) targetId = conn.source;
            if (!targetId || targetId === entry.id || !ENTRY_BY_ID[targetId]) continue;
            const eInfo = ENTRY_BY_ID[targetId];
            if (country && eInfo._country !== country && c !== country) continue;
            if (!nodeSet.has(targetId)) { nodeSet.add(targetId); nodes.push({ id: targetId, name: eInfo.name, country: eInfo._country, category: eInfo.category || '', type: eInfo.type, group: eInfo.category || 'other', nodeType: 'entry' }); }
            const lk = entry.id < targetId ? entry.id + '|' + targetId : targetId + '|' + entry.id;
            if (!linkSet.has(lk)) { linkSet.add(lk); links.push({ source: entry.id, target: targetId, type: normalizeConnType(conn.type), description: normalizeConnDesc(conn.type, conn.description) }); }
          }
        }
        // Shared individuals - use pre-built index
        if (entry.individuals) {
          for (const ind of entry.individuals) {
            const shared = IND_TO_ENTRIES[ind.id];
            if (!shared) continue;
            for (const s of shared) {
              if (s.entryId === entry.id) continue;
              if (category && s.category !== category) continue;
              const lk = entry.id < s.entryId ? entry.id + '|' + s.entryId : s.entryId + '|' + entry.id;
              if (linkSet.has(lk)) continue;
              linkSet.add(lk);
              if (!nodeSet.has(s.entryId)) {
                const ei = ENTRY_BY_ID[s.entryId];
                nodeSet.add(s.entryId);
                nodes.push({ id: s.entryId, name: ei.name, country: s.country, category: ei.category || '', type: ei.type, group: ei.category || 'other', nodeType: 'entry' });
              }
              links.push({ source: entry.id, target: s.entryId, type: 'shared-person', description: 'Shared: ' + ind.name });
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
// Extracted as a function so it can be reused by both the endpoint and pre-warming
function computeFocusGraph(focusId, depth, includePeople, roleFilter) {
  if (!ENTRY_BY_ID[focusId]) return { error: 'Entry not found', nodes: [], links: [] };

  const focusEntry = ENTRY_BY_ID[focusId];
  const focusIndCount = (focusEntry.individuals || []).length;
  const isBigEntry = focusIndCount > 80;

  // BFS using pre-built indexes - O(V + E) instead of O(n³)
  const visited = new Set([focusId]);
  let frontier = [focusId];
  for (let d = 0; d < depth; d++) {
    const nextFrontier = [];
    for (const eid of frontier) {
      const entry = ENTRY_BY_ID[eid];
      if (!entry) continue;
      if (entry.connections) {
        for (const conn of entry.connections) {
          let tid = conn.entryId || conn.target;
          if (!tid && conn.name) tid = _resolve(conn.name);
          else if (tid && !ENTRY_BY_ID[tid] && conn.name) tid = _resolve(conn.name);
          if (tid === eid && conn.source) tid = conn.source;
          if (tid && tid !== eid && ENTRY_BY_ID[tid] && !visited.has(tid)) {
            visited.add(tid);
            nextFrontier.push(tid);
          }
        }
      }
      if (!isBigEntry && entry.individuals) {
        for (const ind of entry.individuals) {
          const shared = IND_TO_ENTRIES[ind.id];
          if (!shared) continue;
          for (const s of shared) {
            if (s.entryId === eid || visited.has(s.entryId)) continue;
            visited.add(s.entryId);
            nextFrontier.push(s.entryId);
          }
        }
      }
    }
    frontier = nextFrontier;
  }

  const nodes = [], links = [], nodeSet = new Set(), linkSet = new Set();
  const indImportance = {};
  for (const eid of visited) {
    const entry = ENTRY_BY_ID[eid];
    if (!entry || !entry.individuals) continue;
    for (const ind of entry.individuals) {
      indImportance[ind.id] = (indImportance[ind.id] || 0) + 1;
    }
  }
  const roleCategories = {};
  if (focusEntry.individuals) {
    for (const ind of focusEntry.individuals) {
      const role = (ind.role || 'Other').split(' - ')[0].trim();
      roleCategories[role] = (roleCategories[role] || 0) + 1;
    }
  }
  const focusNameWords = focusEntry.name.toLowerCase().split(/\s+/).filter(w => w.length > 3);

  for (const eid of visited) {
    const entry = ENTRY_BY_ID[eid];
    if (!entry) continue;
    const c = entry._country;
    if (!nodeSet.has(eid)) {
      nodeSet.add(eid);
      nodes.push({ id: eid, name: entry.name, country: c, category: entry.category || '', type: entry.type, group: entry.category || 'other', nodeType: 'entry', isFocus: eid === focusId });
    }
    if (includePeople && entry.individuals) {
      let inds = entry.individuals;
      if (roleFilter) {
        const rf = roleFilter.toLowerCase();
        inds = inds.filter(ind => (ind.role || '').toLowerCase().includes(rf));
      }
      if (eid === focusId) {
        inds = inds.filter(ind => {
          const pWords = ind.name.toLowerCase().split(/\s+/);
          const overlap = pWords.filter(pw => pw.length > 3 && focusNameWords.some(fw => fw.includes(pw) || pw.includes(fw)));
          return overlap.length === 0;
        });
      }
      for (const ind of inds) {
        const pid = 'person-' + ind.id;
        if (!nodeSet.has(pid)) {
          nodeSet.add(pid);
          const roleTag = (ind.role || 'Other').split(' - ')[0].trim();
          nodes.push({ id: pid, name: ind.name, country: c, category: 'People', type: 'Individual', group: 'People', nodeType: 'person', personId: ind.id, role: ind.role || '', roleTag });
        }
        const lk = eid + '|' + pid;
        if (!linkSet.has(lk)) { linkSet.add(lk); links.push({ source: eid, target: pid, type: 'person-affiliation', description: ind.role || 'Affiliated' }); }
      }
    }
    if (entry.connections) {
      for (const conn of entry.connections) {
        let tid = conn.entryId || conn.target;
        if (!tid && conn.name) tid = _resolve(conn.name);
        else if (tid && !ENTRY_BY_ID[tid] && conn.name) tid = _resolve(conn.name);
        if (tid === eid && conn.source) tid = conn.source;
        if (tid && tid !== eid && visited.has(tid)) {
          const lk = eid < tid ? eid + '|' + tid : tid + '|' + eid;
          if (!linkSet.has(lk)) { linkSet.add(lk); links.push({ source: eid, target: tid, type: normalizeConnType(conn.type), description: normalizeConnDesc(conn.type, conn.description) }); }
        }
      }
    }
    if (!isBigEntry && entry.individuals) {
      for (const ind of entry.individuals) {
        const shared = IND_TO_ENTRIES[ind.id];
        if (!shared) continue;
        for (const s of shared) {
          if (s.entryId === eid || !visited.has(s.entryId)) continue;
          const lk = eid < s.entryId ? eid + '|' + s.entryId : s.entryId + '|' + eid;
          if (!linkSet.has(lk)) { linkSet.add(lk); links.push({ source: eid, target: s.entryId, type: 'shared-person', description: 'Shared: ' + ind.name }); }
        }
      }
    }
  }

  const linkCount = {};
  for (const l of links) {
    linkCount[l.source] = (linkCount[l.source] || 0) + 1;
    linkCount[l.target] = (linkCount[l.target] || 0) + 1;
  }

  return {
    focusId, focusName: focusEntry.name, focusCategory: focusEntry.category, depth,
    nodes, links, linkCount,
    totalPeople: focusIndCount,
    roleCategories: Object.entries(roleCategories).sort((a,b) => b[1]-a[1]).map(([role, count]) => ({ role, count })),
    isBigEntry
  };
}

app.get('/api/graph/focus/:entryId', (req, res) => {
  let focusId = req.params.entryId;
  if (ID_ALIASES[focusId]) focusId = ID_ALIASES[focusId];
  const depth = Math.min(parseInt(req.query.depth) || 2, 3);
  const includePeople = req.query.people !== '0';
  const roleFilter = req.query.role || '';
  try {
    const cacheKey = `focus-${focusId}-d${depth}-p${includePeople?1:0}-r${roleFilter}`;
    const result = getCached(cacheKey, CACHE_TTL, () => computeFocusGraph(focusId, depth, includePeople, roleFilter));
    res.json(result);
  } catch (err) { console.error(err); res.status(500).json({ error: 'Server error' }); }
});

// timeline data endpoint - entries with founding years
app.get('/api/timeline', (req, res) => {
  try {
    const result = getCached('timeline', CACHE_TTL, () => {
      const items = [];
      for (const entry of ALL_ENTRIES) {
        if (entry.founded) {
          items.push({ id: entry.id, name: entry.name, type: entry.type, category: entry.category || '', country: entry._country, founded: entry.founded, description: (entry.description || '').substring(0, 200) });
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
    const all = ALL_ENTRIES.slice(); // shallow copy for shuffle
    // Fisher-Yates shuffle
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    const entries = all.slice(0, count).map(e => ({
      id: e.id, name: e.name, type: e.type, category: e.category || '',
      country: e._country, description: (e.description || '').substring(0, 200),
      founded: e.founded || null, website: e.website || ''
    }));
    res.json({ entries });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// degrees of separation / shortest path between two entries
// Uses pre-built adjacency list - O(V + E) BFS
app.get('/api/path', (req, res) => {
  const from = req.query.from;
  const to = req.query.to;
  if (!from || !to) return res.status(400).json({ error: 'Provide from and to entry IDs' });
  if (from === to) return res.json({ path: [from], distance: 0, edges: [] });
  try {
    // BFS on pre-built adjacency list
    const visited = new Set([from]);
    const queue = [[from]];
    while (queue.length > 0) {
      const p = queue.shift();
      const current = p[p.length - 1];
      if (current === to) {
        // build edge details
        const edges = [];
        for (let i = 0; i < p.length - 1; i++) {
          const edgeInfo = (ADJ[p[i]] || []).find(e => e.target === p[i + 1]);
          const fromEntry = ENTRY_BY_ID[p[i]];
          const toEntry = ENTRY_BY_ID[p[i + 1]];
          edges.push({
            from: p[i], fromName: fromEntry?.name,
            to: p[i + 1], toName: toEntry?.name,
            type: edgeInfo?.type || 'unknown', description: edgeInfo?.desc || ''
          });
        }
        const pathDetails = p.map(id => {
          const e = ENTRY_BY_ID[id];
          return { id, name: e?.name || id, country: e?._country, category: e?.category };
        });
        return res.json({ path: pathDetails, distance: p.length - 1, edges });
      }
      for (const neighbor of (ADJ[current] || [])) {
        if (!visited.has(neighbor.target) && ENTRY_BY_ID[neighbor.target]) {
          visited.add(neighbor.target);
          queue.push([...p, neighbor.target]);
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
    const results = ids.map(id => ENTRY_BY_ID[id]).filter(Boolean).map(e => {
      const { _country, ...rest } = e;
      return { ...rest, country: _country };
    });
    // find shared people between entries
    const sharedPeople = [];
    for (let i = 0; i < results.length; i++) {
      for (let j = i + 1; j < results.length; j++) {
        const a = (results[i].individuals || []).map(p => p.id);
        const bSet = new Set((results[j].individuals || []).map(p => p.id));
        const shared = a.filter(id => bSet.has(id));
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
    if (religion === 'jewish') return res.json(JD);
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
    const data = religion === 'jewish' ? JD : require(`./data/${religion}.json`);
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
    const data = religion === 'jewish' ? JD : require(`./data/${religion}.json`);
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
  let id = req.params.id;
  if (ID_ALIASES[id]) id = ID_ALIASES[id];
  try {
    // Fast path for jewish entries using pre-built index
    if (religion === 'jewish' && ENTRY_BY_ID[id]) {
      const entry = ENTRY_BY_ID[id];
      const result = { ...entry, country: entry._country };
      delete result._country;
      if (result.connections) {
        result.connections = result.connections.map(conn => {
          if (conn.name) return conn;
          if (conn.source || conn.target) {
            const targetId = conn.target || conn.source;
            const targetEntry = ENTRY_BY_ID[targetId];
            const targetName = targetEntry ? targetEntry.name : targetId;
            const rawType = conn.type || '';
            const dashIdx = rawType.indexOf(' - ');
            const shortType = dashIdx > 0 ? rawType.substring(0, dashIdx) : rawType;
            const desc = dashIdx > 0 ? rawType.substring(dashIdx + 3) : '';
            return { name: targetName, entryId: targetId, type: shortType, description: desc || rawType };
          }
          return conn;
        });
      }
      return res.json(result);
    }

    const data = religion === 'jewish' ? JD : require(`./data/${religion}.json`);

    // Build id->name lookup so we can normalize source/target connections
    const idToName = {};
    for (const country in data.countries) {
      for (const e of data.countries[country]) {
        if (e.id) idToName[e.id] = e.name;
      }
    }

    for (const country in data.countries) {
      const found = data.countries[country].find(e => e.id === id);
      if (found) {
        const result = Object.assign({}, found, { country });

        // Normalize connections: convert source/target format to name/entryId/type/description
        if (result.connections) {
          result.connections = result.connections.map(conn => {
            // Already in name format  -  pass through
            if (conn.name) return conn;
            // source/target format  -  normalize
            if (conn.source || conn.target) {
              const targetId = conn.target || conn.source;
              const targetName = idToName[targetId] || targetId;
              // The type field in source/target format often contains the description
              const rawType = conn.type || '';
              const dashIdx = rawType.indexOf(' - ');
              const shortType = dashIdx > 0 ? rawType.substring(0, dashIdx) : rawType;
              const desc = dashIdx > 0 ? rawType.substring(dashIdx + 3) : '';
              return {
                name: targetName,
                entryId: targetId,
                type: shortType,
                description: desc || rawType
              };
            }
            return conn;
          });
        }

        return res.json(result);
      }
    }
    res.status(404).json({ error: 'Entry not found' });
  } catch (err) {
    res.status(404).json({ error: 'Religion data not found' });
  }
});

// Load data at startup, then start server
loadData();

// Pre-warm cache for the most common network views so first visitor gets instant load
(function preWarmCache() {
  const t0 = Date.now();
  const commonEntries = ['epstein-network'];
  let warmed = 0;
  for (const entryId of commonEntries) {
    if (!ENTRY_BY_ID[entryId]) continue;
    for (const p of [1, 0]) {
      for (const d of [1, 2]) {
        const key = `focus-${entryId}-d${d}-p${p ? 1 : 0}-r`;
        getCached(key, CACHE_TTL, () => computeFocusGraph(entryId, d, !!p, ''));
        warmed++;
      }
    }
  }
  console.log(`  Cache pre-warmed: ${warmed} views in ${Date.now() - t0}ms`);
})();

app.listen(port, () => {
  console.log(`\n  ╔══════════════════════════════════════╗`);
  console.log(`  ║   Juice v4.2 - Est. 2016             ║`);
  console.log(`  ║   Server running on port ${port}        ║`);
  console.log(`  ║   http://localhost:${port}              ║`);
  console.log(`  ╚══════════════════════════════════════╝\n`);
});
