const JD=JSON.parse(require('fs').readFileSync('data/jewish.json','utf8'));
let b={};
for(const c in JD.countries){
  for(const e of JD.countries[c]){
    const n=(e.individuals||[]).length;
    if(n===3){
      if(!b[c])b[c]=[];
      b[c].push(e.id);
    }
  }
}
let total=0;
for(const c of Object.keys(b).sort((a,x)=>b[x].length-b[a].length)){
  console.log(c+' ('+b[c].length+'):');
  for(const id of b[c]) console.log('  '+id);
  total+=b[c].length;
}
console.log('\nTotal remaining 3-ind entries:',total);
