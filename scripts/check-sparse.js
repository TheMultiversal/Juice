const JD = JSON.parse(require('fs').readFileSync('data/jewish.json','utf8'));
const ids = ['jean-luc-brunel-mc2','essilor-dassault-connection','azrieli-foundation',
  'elie-wiesel-national-institute-for-the-study-of-the-holocaust-in-romania',
  'jewish-community-of-south-korea','centro-israelita-sionista-de-costa-rica'];
ids.forEach(id => {
  for (const c in JD.countries) {
    const e = JD.countries[c].find(x => x.id === id);
    if (e) {
      console.log(id + ': ' + JSON.stringify((e.individuals||[]).map(i => i.id)));
      break;
    }
  }
});
