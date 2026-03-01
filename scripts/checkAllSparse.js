const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./data/jewish.json', 'utf8'));
let total = 0, sparse = 0;
const byCountry = {};
for (const [country, entries] of Object.entries(data.countries)) {
  for (const entry of entries) {
    total++;
    const n = (entry.individuals || []).length;
    if (n <= 1) {
      sparse++;
      byCountry[country] = (byCountry[country] || 0) + 1;
    }
  }
}
console.log('Total entries:', total, '| Sparse (<=1 ind):', sparse);
Object.entries(byCountry).sort((a,b) => b[1] - a[1]).forEach(([c, n]) => console.log('  ' + c + ': ' + n));
