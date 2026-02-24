const axios = require('axios');
axios.get('https://restcountries.com/v3.1/all')
  .then(r => console.log('status', r.status, 'count', Array.isArray(r.data)?r.data.length:'?'))
  .catch(e => {
    if (e.response) console.error('status error', e.response.status, e.response.data);
    else console.error('error', e.message);
  });
