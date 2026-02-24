const axios=require('axios');
(async()=>{
 try{
  const q=`
SELECT ?org ?orgLabel WHERE {
  ?org wdt:P31/wdt:P279* wd:Q43229.
  ?org wdt:P140 wd:Q747.
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
LIMIT 10
`;
  const resp=await axios.get('https://query.wikidata.org/sparql',{params:{query:q,format:'json'},headers:{'User-Agent':'religion-directory-scraper/1.0 (contact@example.com)'}});
  console.log('status',resp.status,'count',resp.data.results.bindings.length);
  console.log(JSON.stringify(resp.data.results.bindings,null,2));
 }catch(e){console.error(e.response?e.response.status:e.message);}
})();