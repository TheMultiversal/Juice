const fs = require('fs');
const JD = JSON.parse(fs.readFileSync('data/jewish.json','utf8'));
const PD = JSON.parse(fs.readFileSync('data/people.json','utf8'));
const people = PD.people || PD;

let totalInds = 0, totalEntries = 0;
let dist = {'1-2':0,'3':0,'4':0,'5':0,'6-10':0,'11+':0};
let byCategory = {};
let smallByCategory = {};
let entries3 = [], entries4 = [], entries5 = [];

for (const c in JD.countries) {
  for (const e of JD.countries[c]) {
    totalEntries++;
    const n = (e.individuals || []).length;
    totalInds += n;
    const cat = e.category || 'Unknown';
    byCategory[cat] = (byCategory[cat]||0) + 1;
    
    if (n<=2) dist['1-2']++;
    else if (n===3) { dist['3']++; entries3.push({id:e.id,name:e.name,cat,n,country:c}); }
    else if (n===4) { dist['4']++; entries4.push({id:e.id,name:e.name,cat,n,country:c}); }
    else if (n===5) { dist['5']++; entries5.push({id:e.id,name:e.name,cat,n,country:c}); }
    else if (n<=10) dist['6-10']++;
    else dist['11+']++;
    
    if (n <= 5) {
      smallByCategory[cat] = (smallByCategory[cat]||0) + 1;
    }
  }
}

// People with only 1 affiliation
let singleAff = 0, multiAff = 0;
for (const id in people) {
  const p = people[id];
  if ((p.affiliations||[]).length <= 1) singleAff++;
  else multiAff++;
}

// People with short/empty bios
let shortBio = 0, noBio = 0;
for (const id in people) {
  const bio = people[id].bio || '';
  if (!bio) noBio++;
  else if (bio.length < 100) shortBio++;
}

console.log('=== CURRENT STATS ===');
console.log('Total entries:', totalEntries);
console.log('Total individuals across entries:', totalInds);
console.log('Total people:', Object.keys(people).length);
console.log('\nDistribution:', JSON.stringify(dist));
console.log('Sparse (<=2):', dist['1-2']);
console.log('Medium 3:', dist['3']);
console.log('Medium 4:', dist['4']);
console.log('Medium 5:', dist['5']);
console.log('Rich 6-10:', dist['6-10']);
console.log('Rich 11+:', dist['11+']);

console.log('\n=== CATEGORIES WITH MOST SMALL ENTRIES (<=5) ===');
Object.entries(smallByCategory).sort((a,b)=>b[1]-a[1]).forEach(([cat,cnt]) => {
  console.log(`  ${cat}: ${cnt} small of ${byCategory[cat]} total`);
});

console.log('\n=== PEOPLE STATS ===');
console.log('Single affiliation:', singleAff);
console.log('Multi affiliation:', multiAff);
console.log('No bio:', noBio);
console.log('Short bio (<100 chars):', shortBio);

console.log('\n=== SAMPLE ENTRIES WITH 3 INDIVIDUALS (first 30) ===');
entries3.slice(0,30).forEach(e => console.log(`  ${e.id} [${e.cat}] (${e.country})`));

console.log('\n=== SAMPLE ENTRIES WITH 4 INDIVIDUALS (first 30) ===');
entries4.slice(0,30).forEach(e => console.log(`  ${e.id} [${e.cat}] (${e.country})`));

console.log('\n=== SAMPLE ENTRIES WITH 5 INDIVIDUALS (first 30) ===');
entries5.slice(0,30).forEach(e => console.log(`  ${e.id} [${e.cat}] (${e.country})`));
