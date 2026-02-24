// Scrape Wikipedia category for organization names and add them to religion/country data
// Usage: node scripts/scrapeWikipediaCategory.js <religion> <country> <wikiCategory> [limit]
// Example: node scripts/scrapeWikipediaCategory.js jewish "United States" "Jewish_organizations_in_the_United_States"

const axios = require('axios');
const addEntryModule = require('./addEntry');

async function fetchCategoryMembers(cat, limit = 500) {
  const url = 'https://en.wikipedia.org/w/api.php';
  const params = {
    action: 'query',
    list: 'categorymembers',
    cmtitle: `Category:${cat}`,
    cmlimit: limit,
    format: 'json'
  };
  const resp = await axios.get(url, { params, headers: { 'User-Agent': 'religion-directory-scraper/1.0 (contact@example.com)' } });
  return resp.data.query.categorymembers.map(m => m.title);
}

async function main() {
  const [,, religion, country, wikiCat, limit] = process.argv;
  if (!religion || !country || !wikiCat) {
    console.error('Usage: node scripts/scrapeWikipediaCategory.js <religion> <country> <wikiCategory> [limit]');
    process.exit(1);
  }

  try {
    const members = await fetchCategoryMembers(wikiCat, limit || 500);
    console.log(`Found ${members.length} items in category ${wikiCat}`);
    for (const name of members) {
      try {
        addEntryModule.addEntry({ religion, country, name, type: 'organization', description: '', website: '' });
        console.log('Added', name);
      } catch (e) {
        console.error('Error adding', name, e.message);
      }
    }
  } catch (e) {
    console.error('Failed to fetch category members:', e.message);
  }
}

if (require.main === module) {
  main();
}
