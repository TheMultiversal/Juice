const axios=require('axios');
(async()=>{
 const resp=await axios.get('https://www.wikidata.org/w/api.php',{params:{action:'wbsearchentities',search:'American Jewish Committee',language:'en',format:'json'}});
 console.log('search results:', resp.data.search.map(r=>({id:r.id,label:r.label})));
})();