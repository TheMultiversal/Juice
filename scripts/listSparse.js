const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./data/jewish.json', 'utf8'));
const sparse = [];
for (const [country, entries] of Object.entries(data.countries)) {
  for (const entry of entries) {
    if ((entry.individuals || []).length <= 1) {
      sparse.push({ id: entry.id, name: entry.name, country });
    }
  }
}
// Output in a compact format for sub-agent consumption
const batchSize = 50;
for (let i = 0; i < sparse.length; i += batchSize) {
  const batch = sparse.slice(i, i + batchSize);
  console.log(`\n=== BATCH ${Math.floor(i/batchSize)+1} (${batch.length} entries) ===`);
  batch.forEach((e, j) => console.log(`${j+1}. ${e.id} - ${e.name} (${e.country})`));
}
console.log('\nTotal sparse:', sparse.length, '| Batches:', Math.ceil(sparse.length/batchSize));
