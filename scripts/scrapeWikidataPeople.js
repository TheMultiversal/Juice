// Fetch people from Wikidata who are Jewish or Israeli and add them to people.json
// Usage: node scripts/scrapeWikidataPeople.js [limit]

const axios = require('axios');
const { addPerson } = require('./addPerson');
const fs = require('fs');
const path = require('path');

async function fetchPeople(limit = 1000, offset = 0) {
  // query persons with religion Judaism or citizenship Israel
  const query = `
SELECT ?person ?personLabel WHERE {
  ?person wdt:P31 wd:Q5.
  OPTIONAL { ?person wdt:P140 wd:Q747. }
  OPTIONAL { ?person wdt:P27 wd:Q801. }
  FILTER(bound(?personLabel))
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
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
  const limit = parseInt(process.argv[2] || '500');
  let offset = 0;
  let count = 0;
  while (true) {
    try {
      const rows = await fetchPeople(limit, offset);
      if (!rows.length) break;
      for (const r of rows) {
        const name = r.personLabel.value;
        try {
          addPerson({ name, bio: '' });
          console.log('added person', name);
          count++;
        } catch (e) {
          console.error('error adding person', name, e.message);
        }
      }
      offset += limit;
      // be polite
      await new Promise(r => setTimeout(r, 500));
    } catch (e) {
      console.error('query failed', e.message);
      break;
    }
  }
  console.log('done, total added (or attempted):', count);
}

if (require.main === module) main();
module.exports = { main };
