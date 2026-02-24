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
                  affiliations.push({ religion: rel, country, organization: entry.name, entryId: entry.id, role: ind.role, category: entry.category, coIndividuals: co });
                }
              });
            }
          });
        }
      }
    });
    res.json(Object.assign({}, person, { affiliations }));
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
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
  try {
    const cacheKey = `graph-${country||''}-${category||''}`;
    const result = getCached(cacheKey, 30000, () => {
      delete require.cache[require.resolve('./data/jewish.json')];
      const jd = require('./data/jewish.json');
      const nodes = [], links = [], nodeSet = new Set(), entryIdMap = {};
      for (const c in jd.countries) { for (const entry of jd.countries[c]) { entryIdMap[entry.id] = { name: entry.name, country: c, category: entry.category, type: entry.type }; } }
      for (const c in jd.countries) {
        if (country && c !== country) continue;
        for (const entry of jd.countries[c]) {
          if (category && entry.category !== category) continue;
          if (!nodeSet.has(entry.id)) { nodeSet.add(entry.id); nodes.push({ id: entry.id, name: entry.name, country: c, category: entry.category || '', type: entry.type, group: entry.category || 'other' }); }
          if (entry.connections) {
            for (const conn of entry.connections) {
              for (const eid in entryIdMap) {
                const eInfo = entryIdMap[eid];
                if (conn.name.toLowerCase() === eInfo.name.toLowerCase() || eid === conn.entryId) {
                  if (country && eInfo.country !== country && c !== country) continue;
                  if (!nodeSet.has(eid)) { nodeSet.add(eid); nodes.push({ id: eid, name: eInfo.name, country: eInfo.country, category: eInfo.category || '', type: eInfo.type, group: eInfo.category || 'other' }); }
                  links.push({ source: entry.id, target: eid, type: conn.type || 'related', description: conn.description || '' });
                }
              }
            }
          }
          if (entry.individuals) {
            for (const ind of entry.individuals) {
              for (const c2 in jd.countries) {
                for (const e2 of jd.countries[c2]) {
                  if (e2.id === entry.id) continue;
                  if (e2.individuals && e2.individuals.some(i => i.id === ind.id)) {
                    if (category && e2.category !== category) continue;
                    if (!nodeSet.has(e2.id)) { nodeSet.add(e2.id); nodes.push({ id: e2.id, name: e2.name, country: c2, category: e2.category || '', type: e2.type, group: e2.category || 'other' }); }
                    const linkKey = [entry.id, e2.id].sort().join('|');
                    if (!links.find(l => [l.source, l.target].sort().join('|') === linkKey)) { links.push({ source: entry.id, target: e2.id, type: 'shared-person', description: 'Shared: ' + ind.name }); }
                  }
                }
              }
            }
          }
        }
      }
      return { nodes: nodes.slice(0, 500), links: links.slice(0, 2000) };
    });
    res.json(result);
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
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

// audit endpoint - flag low quality entries
app.get('/api/audit', (req, res) => {
  try {
    delete require.cache[require.resolve('./data/jewish.json')];
    const jd = require('./data/jewish.json');
    const issues = [];
    for (const country in jd.countries) {
      for (const entry of jd.countries[country]) {
        const flags = [];
        if (!entry.description || entry.description.length < 100) flags.push('short-description');
        if (!entry.website) flags.push('no-website');
        if (!entry.connections || entry.connections.length < 2) flags.push('few-connections');
        if (!entry.individuals || entry.individuals.length < 1) flags.push('no-individuals');
        if (!entry.category) flags.push('no-category');
        if (!entry.founded) flags.push('no-founded-year');
        if (flags.length > 0) {
          issues.push({ id: entry.id, name: entry.name, country, category: entry.category || '', flags, score: Math.max(0, 100 - flags.length * 15) });
        }
      }
    }
    issues.sort((a, b) => a.score - b.score);
    const summary = { total: issues.length, avgScore: Math.round(issues.reduce((s, i) => s + i.score, 0) / issues.length || 0), byFlag: {} };
    issues.forEach(i => i.flags.forEach(f => { summary.byFlag[f] = (summary.byFlag[f] || 0) + 1; }));
    res.json({ summary, issues });
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// export endpoint - returns data in CSV or JSON format
app.get('/api/export', (req, res) => {
  const format = req.query.format || 'json';
  const country = req.query.country;
  const category = req.query.category;
  try {
    delete require.cache[require.resolve('./data/jewish.json')];
    const jd = require('./data/jewish.json');
    const entries = [];
    for (const c in jd.countries) {
      if (country && c !== country) continue;
      for (const entry of jd.countries[c]) {
        if (category && entry.category !== category) continue;
        entries.push({ id: entry.id, name: entry.name, type: entry.type, category: entry.category || '', country: c, description: entry.description || '', website: entry.website || '', founded: entry.founded || '', individuals: (entry.individuals || []).length, connections: (entry.connections || []).length });
      }
    }
    if (format === 'csv') {
      const headers = ['id','name','type','category','country','description','website','founded','individuals','connections'];
      const csvRows = [headers.join(',')];
      entries.forEach(e => {
        csvRows.push(headers.map(h => { const v = String(e[h] || ''); return '"' + v.replace(/"/g, '""') + '"'; }).join(','));
      });
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="export.csv"');
      res.send(csvRows.join('\n'));
    } else {
      res.setHeader('Content-Disposition', 'attachment; filename="export.json"');
      res.json(entries);
    }
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

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
  console.log(`  ║   Juice v4.2 , Est. 2016             ║`);
  console.log(`  ║   Server running on port ${port}        ║`);
  console.log(`  ║   http://localhost:${port}              ║`);
  console.log(`  ╚══════════════════════════════════════╝\n`);
});
