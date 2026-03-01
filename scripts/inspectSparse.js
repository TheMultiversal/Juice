const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./data/jewish.json', 'utf8'));
const flat = Object.values(data).flat();
const ep = flat.find(x => x.id === 'epstein-network');
if (!ep) { console.log('No epstein-network entry found'); process.exit(1); }

const subs = ep.subEntries || [];
console.log('Total sub-entries:', subs.length);

// Find bill-clinton-connections
const bc = subs.find(s => s.id && s.id.includes('clinton-connection'));
if (bc) {
  console.log('\n--- bill-clinton-connections ---');
  console.log('ID:', bc.id);
  console.log('Name:', bc.name);
  console.log('Individuals count:', (bc.individuals || []).length);
  console.log('Individuals:', JSON.stringify(bc.individuals, null, 2));
  console.log('Keys:', Object.keys(bc));
} else {
  console.log('No clinton-connections sub found');
  // List all sub-entry IDs
  console.log('\nAll sub-entry IDs:');
  subs.forEach(s => console.log(' ', s.id, '- individuals:', (s.individuals||[]).length));
}

// Find all sparse ones (1 individual)
const sparse = subs.filter(s => (s.individuals||[]).length === 1);
console.log('\n\nSparse sub-entries (1 individual):');
sparse.forEach(s => console.log(' ', s.id));
