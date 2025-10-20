
// keep_alive.js - simple pinger to keep render instance awake
const http = require('http');
const fetch = require('node-fetch');
const PORT = process.env.KEEP_ALIVE_PORT || 3001;
const SELF_URL = process.env.SELF_URL || `http://localhost:${process.env.PORT || 3000}`;
http.createServer((req, res) => { res.writeHead(200); res.end('OK'); }).listen(PORT);
setInterval(()=>{ fetch(SELF_URL).catch(()=>{}); }, 180000);
console.log('Keep-alive server running on', PORT);
