const axios=require('axios');
(async()=>{
 const q=`
SELECT ?org ?orgLabel ?countryLabel WHERE {
  ?org wdt:P31/wdt:P279* wd:Q43229.
  ?org rdfs:label ?orgLabel.
  FILTER(LANG(?orgLabel)="en").
  FILTER(CONTAINS(LCASE(?orgLabel),"jewish")).
  OPTIONAL { ?org wdt:P17 ?country. }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
LIMIT 10
`;
 try{
  const resp=await axios.get('https://query.wikidata.org/sparql',{params:{query:q,format:'json'},headers:{'User-Agent':'religion-directory-scraper/1.0 (contact@example.com)'}});
  console.log('status',resp.status,'count',resp.data.results.bindings.length);
  console.log(resp.data.results.bindings.map(r=>({label:r.orgLabel.value,country:r.countryLabel? r.countryLabel.value:'?'})));
 }catch(e){console.error('error',e.response?e.response.status:e.message);}
})();