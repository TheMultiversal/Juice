const fs = require('fs');
const path = require('path');

// Usage: node scripts/addPerson.js <name> [bio]
// Example:
//  node scripts/addPerson.js "David Harris" "Long biography here"


function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function addPerson({ name, bio }) {
  if (!name) {
    throw new Error('Name is required');
  }
  const id = slugify(name);
  const file = path.join(__dirname, '..', 'data', 'people.json');
  let data = { people: {} };
  if (fs.existsSync(file)) {
    try { data = JSON.parse(fs.readFileSync(file)); } catch {}
  }

  data.people[id] = data.people[id] || { name, bio: '' };
  if (bio) data.people[id].bio = bio;
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  return id;
}

// CLI support
const [,, name, bio] = process.argv;
if (name) {
  try {
    const id = addPerson({ name, bio });
    console.log('Person added/updated:', id);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
} else if (require.main === module) {
  console.error('Usage: node scripts/addPerson.js <name> [bio]');
  process.exit(1);
}

module.exports = { addPerson };
