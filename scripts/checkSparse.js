const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./data/jewish.json', 'utf8'));
const allEntries = Object.values(data.countries).flat();

// Find all Epstein sub-entries that still have only 1 individual
let sparse = [];
for (const entry of allEntries) {
  // Check if this entry is an Epstein sub-entry (has connection to epstein-network)
  const conns = entry.connections || [];
  const isEpsteinSub = conns.some(c => c.entryId === 'epstein-network');
  const indCount = (entry.individuals || []).length;
  if (isEpsteinSub && indCount <= 1) {
    sparse.push({ id: entry.id, name: entry.name, individuals: indCount, descLen: (entry.description||'').length });
  }
}

console.log(`Still-sparse Epstein sub-entries (<=1 individual): ${sparse.length}\n`);
sparse.forEach(s => console.log(`  ${s.id} (${s.name}) - ${s.individuals} ind, desc: ${s.descLen} chars`));
