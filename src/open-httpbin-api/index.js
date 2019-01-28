const axios = require('axios');

const http = axios.create({
  // Kong admin API
  baseURL: 'http://localhost:8001'
});

async function commit() {
  await http.post('/services', {
    name: 'httpbin-api',
    url: 'https://httpbin.org/'
  });
  await http.post('/services/httpbin-api/routes', {
    name: 'bin',
    paths: ['/bin']
  });
}

async function revert() {
  await http.delete('/routes/bin');
  await http.delete('/services/httpbin-api');
}

module.exports = {
  commit,
  revert
};
