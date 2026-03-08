const fs = require('fs');
const JD = JSON.parse(fs.readFileSync('./data/jewish.json','utf8'));
const entries4 = [];
for (const c in JD.countries) {
  for (const e of JD.countries[c]) {
    if (e.individuals && e.individuals.length === 4) {
      entries4.push({ id: e.id, cat: e.category, country: c, name: e.name });
    }
  }
}
entries4.sort((a,b) => a.cat.localeCompare(b.cat) || a.name.localeCompare(b.name));
for (const e of entries4) {
  console.log(`${e.id} | ${e.cat} | ${e.country}`);
}
console.log(`\nTotal: ${entries4.length}`);
