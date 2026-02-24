// Fetch Jewish organizations from Wikidata via SPARQL and add them to jewish.json
// Usage: node scripts/scrapeWikidataJewishOrgs.js

const axios = require('axios');
const addEntryModule = require('./addEntry');
const fs = require('fs');
const path = require('path');

// fetch organizations for a single country name
// get the Wikidata QID for a country name
async function getCountryQID(countryName) {
  const url = 'https://www.wikidata.org/w/api.php';
  const resp = await axios.get(url, {
    params: {
      action: 'wbsearchentities',
      format: 'json',
      language: 'en',
      search: countryName,
      type: 'item'
    },
    headers: { 'User-Agent': 'religion-directory-scraper/1.0 (contact@example.com)' }
  });
  const results = resp.data.search;
  if (results && results.length) {
    return results[0].id; // best match
  }
  throw new Error('Country QID not found for ' + countryName);
}

// fetch organizations located in a given country QID
async function fetchOrgsByCountryQID(qid) {
  const query = `
SELECT ?org ?orgLabel WHERE {
  ?org wdt:P31/wdt:P279* wd:Q43229.
  ?org wdt:P17 wd:${qid}.
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
LIMIT 500
`;
  const url = 'https://query.wikidata.org/sparql';
  let attempt = 0;
  while (attempt < 5) {
    try {
      const resp = await axios.get(url, {
        params: { query, format: 'json' },
        headers: { 'User-Agent': 'religion-directory-scraper/1.0 (contact@example.com)' }
      });
      return resp.data.results.bindings;
    } catch (e) {
      attempt++;
      const status = e.response ? e.response.status : null;
      if (status === 429 || status === 504) {
        const delay = 1000 * attempt;
        console.error(`    request ${status}, retrying after ${delay}ms`);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      throw e;
    }
  }
  throw new Error('Failed after retries');
}

async function main() {
  try {
    const countries = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'countries.json')));
    const dataFile = path.join(__dirname, '..', 'data', 'jewish.json');
    const existing = JSON.parse(fs.readFileSync(dataFile));

    const limit = parseInt(process.argv[2] || '0');
    let processed = 0;
    for (const country of countries) {
      if (limit && processed >= limit) break;
      processed++;
      console.log('querying', country);
      let qid;
      try {
        qid = await getCountryQID(country);
      } catch (e) {
        console.error('  could not find QID for', country);
        continue;
      }
      let rows = [];
      try {
        rows = await fetchOrgsByCountryQID(qid);
        console.log(`  got ${rows.length} items`);
      } catch (err) {
        console.error('  query failed for', country, err.message);
        continue;
      }
      for (const r of rows) {
        const name = r.orgLabel.value;
        // simple filter: label contains jewish OR we could later fetch P140
        if (!/jewish/i.test(name)) continue;
        const already = existing.countries[country] && existing.countries[country].some(e => e.name === name);
        if (already) continue;
        try {
          addEntryModule.addEntry({ religion: 'jewish', country, name, type: 'organization', description: '' });
          console.log('    added', name);
        } catch (e) {
          console.error('    error adding', name, e.message);
        }
      }
      await new Promise(r => setTimeout(r, 200));
    }
    console.log('Done processing all countries');
  } catch (err) {
    console.error('Failed to fetch or process', err.message);
  }
}

if (require.main === module) main();
module.exports = { main };
