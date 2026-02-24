// Fetch organizations whose English label contains "jewish" or that are located in Israel and add them to jewish.json
// Loops through results with offset to avoid timeouts.
// Usage: node scripts/scrapeWikidataLabelOrIsrael.js [limitPerPage]

const axios = require('axios');
const addEntryModule = require('./addEntry');
const fs = require('fs');
const path = require('path');

async function fetchChunk(limit = 500, offset = 0) {
  const query = `
SELECT ?org ?orgLabel ?countryLabel WHERE {
  ?org wdt:P31/wdt:P279* wd:Q43229.
  ?org wdt:P17 ?country.
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
  FILTER( CONTAINS(LCASE(?orgLabel), "jewish") || ?country = wd:Q801 )
}
LIMIT ${limit}
OFFSET ${offset}
`;
  const url = 'https://query.wikidata.org/sparql';
  const resp = await axios.get(url, {
    params: { query, format: 'json' },
    headers: { 'User-Agent': 'religion-directory-scraper/1.0 (contact@example.com)' }
  });
  return resp.data.results.bindings;
}

async function main() {
  const dataFile = path.join(__dirname, '..', 'data', 'jewish.json');
  const existing = JSON.parse(fs.readFileSync(dataFile));
  const limit = parseInt(process.argv[2] || '500');
  let offset = 0;
  let total = 0;
  while (true) {
    console.log('fetching offset', offset);
    let rows;
    try {
      rows = await fetchChunk(limit, offset);
    } catch (e) {
      console.error('chunk query failed', e.message);
      break;
    }
    if (!rows.length) break;
    for (const r of rows) {
      const name = r.orgLabel.value;
      const country = r.countryLabel ? r.countryLabel.value : 'Unknown';
      if (!existing.countries[country]) existing.countries[country] = [];
      const already = existing.countries[country].some(e => e.name === name);
      if (already) continue;
      try {
        addEntryModule.addEntry({ religion: 'jewish', country, name, type: 'organization', description: '' });
        console.log(' added', name, 'in', country);
        total++;
      } catch (e) {
        console.error(' error adding', name, e.message);
      }
    }
    offset += limit;
    await new Promise(r => setTimeout(r, 200));
  }
  console.log('done total added', total);
}

if (require.main === module) main();
module.exports = { main };
