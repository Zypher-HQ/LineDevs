// keep_alive.js
// Simple keep-alive pinger. Keeps the Render instance awake by pinging SELF_URL periodically.
const http = require('http');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const PORT = process.env.PORT || 3000;
const SELF_URL = process.env.SELF_URL || `http://localhost:${PORT}`;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end('LineDevs Keep-Alive OK');
  } else {
    res.writeHead(404).end();
  }
});

server.listen(PORT, () => {
  console.log(`Keep-alive server listening on port ${PORT}`);
});

setInterval(async () => {
  try {
    const url = process.env.SELF_URL || SELF_URL;
    await fetch(url).then(r => console.log(`Keep-alive ping to ${url} -> ${r.status}`)).catch(e => console.log('Keep-alive ping failed', e.message || e));
  } catch (e) {
    console.log('Keep-alive error', e.message || e);
  }
}, 5 * 60 * 1000);
