const JD=JSON.parse(require('fs').readFileSync('data/jewish.json','utf8'));
let b={};
for(const c in JD.countries)
  for(const e of JD.countries[c])
    if((e.individuals||[]).length===3){
      if(!b[c])b[c]=[];
      b[c].push(e.id);
    }
let total=0;
for(const c of Object.keys(b).sort((a,x)=>b[x].length-b[a].length)){
  console.log(c+' ('+b[c].length+'):');
  b[c].forEach(id=>console.log('  '+id));
  total+=b[c].length;
}
console.log('Total:',total);
