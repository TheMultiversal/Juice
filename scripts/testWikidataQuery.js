const axios=require('axios');
(async()=>{
  try {
    const q=`
SELECT ?org ?orgLabel WHERE {
  ?org wdt:P31/wdt:P279* wd:Q43229.
  ?org rdfs:label ?orgLabel.
  FILTER(LANG(?orgLabel) = "en").
  FILTER(CONTAINS(LCASE(?orgLabel), "jewish")).
  ?org wdt:P17 ?country.
  ?country rdfs:label "Afghanistan"@en.
}
LIMIT 100
`;
    console.log('query built');
    const resp=await axios.get('https://query.wikidata.org/sparql',{
      params:{query:q,format:'json'},
      headers:{'User-Agent':'religion-directory-test/1.0'}
    });
    console.log('status',resp.status,'count',resp.data.results.bindings.length);
  } catch(e){
    if(e.response) console.error('error status',e.response.status,e.response.data);
    else console.error('error',e.message);
  }
})();
