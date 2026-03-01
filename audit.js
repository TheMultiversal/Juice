const fs = require('fs');
const jd = JSON.parse(fs.readFileSync('data/jewish.json','utf8'));
const pd = JSON.parse(fs.readFileSync('data/people.json','utf8'));

let T=0, TI=0, TC=0, z0=0, z1=0, c0=0, c1=0;
let sparse = []; // entries with 0 or few individuals

for (const c in jd.countries) {
  for (const e of jd.countries[c]) {
    T++;
    const inds = (e.individuals || []).length;
    const conns = (e.connections || []).length;
    TI += inds;
    TC += conns;
    if (inds === 0) z0++;
    if (inds > 0 && inds <= 3) z1++;
    if (conns === 0) c0++;
    if (conns > 0 && conns <= 2) c1++;
    if (inds <= 2) sparse.push({ id: e.id, name: e.name, country: c, category: e.category, inds, conns });
  }
}

console.log('=== DATA AUDIT ===');
console.log('Total entries:', T);
console.log('Total individuals across entries:', TI);
console.log('Total connections across entries:', TC);
console.log('Entries with 0 individuals:', z0);
console.log('Entries with 1-3 individuals:', z1);
console.log('Entries with 0 connections:', c0);
console.log('Entries with 1-2 connections:', c1);
console.log('');

// People.json audit
console.log('=== PEOPLE.JSON ===');
console.log('Total people:', pd.length);
let noAge=0, noRole=0, noDesc=0, noConns=0, noBio=0;
pd.forEach(p => {
  if (!p.born && !p.birthYear) noAge++;
  if (!p.role && !p.title) noRole++;
  if (!p.description && !p.bio && !p.summary) noDesc++;
  if (!p.connections || p.connections.length === 0) noConns++;
  if (!p.bio && !p.description) noBio++;
});
console.log('No birth info:', noAge);
console.log('No role/title:', noRole);
console.log('No description/bio:', noBio);
console.log('No connections:', noConns);
console.log('');

// Sample a typical entry
console.log('=== SAMPLE ENTRIES ===');
for (const c in jd.countries) {
  for (const e of jd.countries[c]) {
    if (e.id === 'aipac') {
      console.log('AIPAC individuals:', (e.individuals||[]).length);
      console.log('AIPAC connections:', (e.connections||[]).length);
      console.log('Sample individual:', JSON.stringify((e.individuals||[])[0]));
      console.log('Fields:', Object.keys(e).join(', '));
      break;
    }
  }
}

// Sample person from people.json
const samplePerson = pd[0];
console.log('\nSample person:', JSON.stringify(samplePerson, null, 2).substring(0, 500));
console.log('Person fields:', Object.keys(samplePerson).join(', '));

// Show 10 sparse entries
console.log('\n=== 10 SPARSE ENTRIES (0-2 individuals) ===');
sparse.slice(0, 10).forEach(s => {
  console.log(s.name, '|', s.country, '|', s.category, '| inds:', s.inds, '| conns:', s.conns);
});
console.log('... total sparse:', sparse.length);
