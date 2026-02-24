const fs = require('fs');
const path = require('path');

// Usage: node scripts/addEntry.js <religion> <country> <name> <type> <description> [website] [individuals]
// individuals format: "Name:Role;Name2:Role2"
// Example:
//  node scripts/addEntry.js jewish "United States" "New Org" "non-profit" "Description" "https://example.com" "Alice CEO;Bob Founder"

// helper for slug generation
function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// core operation that can be called programmatically
function addEntry({ religion, country, name, type, description, website, individualsStr }) {
  if (!religion || !country || !name || !type || !description) {
    throw new Error('Missing required fields for addEntry');
  }

  const id = slugify(name);
  const file = path.join(__dirname, '..', 'data', `${religion}.json`);
  if (!fs.existsSync(file)) {
    throw new Error(`Data file for religion '${religion}' does not exist (${file}).`);
  }

  let data;
  try {
    data = JSON.parse(fs.readFileSync(file));
  } catch (err) {
    throw new Error('Failed to parse JSON: ' + err);
  }

  if (!data.countries[country]) {
    data.countries[country] = [];
  }

  const entry = { id, name, type, description, individuals: [] };
  if (website) entry.website = website;
  if (individualsStr) {
    const peopleFile = path.join(__dirname, '..', 'data', 'people.json');
    let peopleData = { people: {} };
    if (fs.existsSync(peopleFile)) {
      try { peopleData = JSON.parse(fs.readFileSync(peopleFile)); } catch {}
    }
    const pairs = individualsStr.split(';');
    pairs.forEach(p => {
      const [iname, irole] = p.split(':');
      if (iname) {
        const nameTrim = iname.trim();
        const indId = slugify(nameTrim);
        entry.individuals.push({ id: indId, name: nameTrim, role: (irole||'').trim() });
        // add to people.json if missing
        if (!peopleData.people[indId]) {
          peopleData.people[indId] = { name: nameTrim, bio: '', notes: '' };
        }
      }
    });
    // write people data back
    fs.writeFileSync(peopleFile, JSON.stringify(peopleData, null, 2));
  }

  data.countries[country].push(entry);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// CLI handling
const [,, religion, country, name, type, description, website, individualsStr] = process.argv;
// note: this script now also updates people.json with generated individual ids
if (religion && country && name && type && description) {
  try {
    addEntry({ religion, country, name, type, description, website, individualsStr });
    console.log('Entry added successfully.');
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
} else if (require.main === module) {
  console.error('Usage: node scripts/addEntry.js <religion> <country> <name> <type> <description> [website] [individuals]');
  process.exit(1);
}

module.exports = { addEntry };

