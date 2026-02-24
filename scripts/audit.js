const fs = require('fs');
const d = JSON.parse(fs.readFileSync('data/jewish.json','utf8'));
const p = JSON.parse(fs.readFileSync('data/people.json','utf8'));
let tc=0, wc=0, noInd=0, shortDesc=0, fewConn=0, totalConn=0, totalInd=0;
for (const c in d.countries) {
  for (const e of d.countries[c]) {
    tc++;
    if (e.connections && e.connections.length) wc++;
    totalConn += (e.connections || []).length;
    if (!e.individuals || e.individuals.length === 0) noInd++;
    else totalInd += e.individuals.length;
    if (e.description && e.description.length < 100) shortDesc++;
    if ((e.connections || []).length <= 2) fewConn++;
  }
}
console.log('Entries:', tc);
console.log('With connections:', wc);
console.log('Total connections:', totalConn);
console.log('Few conn (<=2):', fewConn);
console.log('No individuals:', noInd);
console.log('Total indiv across entries:', totalInd);
console.log('People in people.json:', Object.keys(p.people).length);
console.log('Short descriptions (<100):', shortDesc);

// List entries with short descriptions by country
console.log('\n=== ENTRIES WITH SHORT DESCRIPTIONS (<100 chars) ===');
for (const c in d.countries) {
  const short = d.countries[c].filter(e => e.description && e.description.length < 100);
  if (short.length > 0) {
    console.log(`\n${c} (${short.length}):`);
    short.forEach(e => console.log(`  ${e.id} [${e.description.length}] - ${e.description.substring(0,60)}...`));
  }
}
