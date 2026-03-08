const JD=JSON.parse(require('fs').readFileSync('data/jewish.json','utf8'));
const PD=JSON.parse(require('fs').readFileSync('data/people.json','utf8'));
let dist={};
for(const c in JD.countries)
  for(const e of JD.countries[c]){
    const n=(e.individuals||[]).length;
    dist[n]=(dist[n]||0)+1;
  }
for(const k of Object.keys(dist).sort((a,b)=>a-b))
  console.log(k+' ind: '+dist[k]+' entries');
let t=0;
for(const c in JD.countries) t+=JD.countries[c].length;
console.log('Total entries:',t);
console.log('Total people:',Object.keys(PD.people||PD).length);
