
// keep_alive.js
const http = require('http');
const fetch = require('node-fetch');

const PORT = process.env.KEEP_ALIVE_PORT || 3001;
const SELF_URL = process.env.SELF_URL || (process.env.SELF_URL || `http://localhost:${process.env.PORT || 3000}`);

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end('Keep-alive OK');
  } else {
    res.writeHead(404).end();
  }
});

server.listen(PORT, () => console.log(`Keep-alive server running on ${PORT}`));

setInterval(async () => {
  try {
    const url = process.env.SELF_URL || SELF_URL;
    await fetch(url).then(r => console.log(`Pinged ${url} -> ${r.status}`)).catch(()=>{});
  } catch (e) {}
}, 5 * 60 * 1000);
