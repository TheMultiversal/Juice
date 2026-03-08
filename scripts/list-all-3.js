const fs = require('fs');
const JD = JSON.parse(fs.readFileSync('./data/jewish.json','utf8'));
const entries3 = [];
for (const c in JD.countries) {
  for (const e of JD.countries[c]) {
    if (e.individuals && e.individuals.length === 3) {
      entries3.push({ id: e.id, name: e.name, cat: e.category, country: c, inds: e.individuals.map(i=>i.name+' ('+i.role+')') });
    }
  }
}
// Sort by category
entries3.sort((a,b) => a.cat.localeCompare(b.cat) || a.name.localeCompare(b.name));
for (const e of entries3) {
  console.log(`${e.id} | ${e.cat} | ${e.country} | ${e.name}`);
  console.log(`  ${e.inds.join(', ')}`);
}
console.log(`\nTotal: ${entries3.length}`);
