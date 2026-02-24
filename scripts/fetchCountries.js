// download country list from restcountries.com and update data/countries.json
// Usage: node scripts/fetchCountries.js

const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function main() {
  try {
    // The API now requires a fields filter; we only need the common name
    const resp = await axios.get('https://restcountries.com/v3.1/all?fields=name');
    const countries = resp.data.map(c => c.name.common).sort();
    const file = path.join(__dirname, '..', 'data', 'countries.json');
    fs.writeFileSync(file, JSON.stringify(countries, null, 2));
    console.log(`Wrote ${countries.length} countries to ${file}`);
  } catch (err) {
    console.error('Failed to fetch countries:', err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main: main };
