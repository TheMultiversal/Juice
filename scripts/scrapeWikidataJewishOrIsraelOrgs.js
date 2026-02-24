// Fetch organizations from Wikidata that are Jewish (religion) or located in Israel and add them to jewish.json
// Usage: node scripts/scrapeWikidataJewishOrIsraelOrgs.js

const axios = require('axios');
const addEntryModule = require('./addEntry');
const fs = require('fs');
const path = require('path');

async function querySPARQL(query) {
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

  // query organisations with religion Judaism
  let rows1 = [];
  try {
    rows1 = await querySPARQL(`
SELECT ?org ?orgLabel ?countryLabel WHERE {
  ?org wdt:P31/wdt:P279* wd:Q43229.
  ?org wdt:P140 wd:Q747.
  OPTIONAL { ?org wdt:P17 ?country. }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
LIMIT 50000
`);
    console.log('religious orgs fetched', rows1.length);
  } catch (e) {
    console.error('failed to fetch religious orgs', e.message);
  }

  // query organisations located in Israel
  let rows2 = [];
  try {
    rows2 = await querySPARQL(`
SELECT ?org ?orgLabel ?countryLabel WHERE {
  ?org wdt:P31/wdt:P279* wd:Q43229.
  ?org wdt:P17 wd:Q801.
  OPTIONAL { ?org wdt:P17 ?country. }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
LIMIT 50000
`);
    console.log('israeli orgs fetched', rows2.length);
  } catch (e) {
    console.error('failed to fetch israeli orgs', e.message);
  }

  const allRows = [...rows1, ...rows2];
  const seen = new Set();

  allRows.forEach(r => {
    const name = r.orgLabel.value;
    if (seen.has(name)) return;
    seen.add(name);
    const country = r.countryLabel ? r.countryLabel.value : 'Unknown';
    if (!existing.countries[country]) existing.countries[country] = [];
    const already = existing.countries[country].some(e => e.name === name);
    if (already) return;
    try {
      addEntryModule.addEntry({ religion: 'jewish', country, name, type: 'organization', description: '' });
      console.log('added', name, 'in', country);
    } catch (e) {
      console.error('error adding', name, e.message);
    }
  });

  console.log('done');
}

if (require.main === module) main();
module.exports = { main };
