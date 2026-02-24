const axios=require('axios');
(async()=>{
 try{
 // try searching for categories via search list
 const resp=await axios.get('https://en.wikipedia.org/w/api.php',{
   params:{action:'query',list:'search',srsearch:'"Category:Jewish organizations"',srlimit:20,format:'json'},
   headers:{'User-Agent':'religion-directory-test/1.0'}
 });
 console.log(JSON.stringify(resp.data,null,2));
 }catch(e){
   console.error('err',e.response?e.response.status:e.message);
 }
})();
