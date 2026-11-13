const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 3000;
const PUBLIC_DIR = path.resolve(__dirname, '..', 'www');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/manifest+json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const reqUrl = (req.url || '/').split('?')[0];
  let safePath = reqUrl === '/' ? 'index.html' : reqUrl.replace(/^\//, '');
  let filePath = path.join(PUBLIC_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      filePath = path.join(PUBLIC_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
        return;
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(content);
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push(iface.address);
      }
    }
  }

  console.log(`\n=================================================`);
  console.log(`🎮 Arrow Maze Mobile Server is LIVE!`);
  console.log(`=================================================`);
  console.log(`On your computer:  http://localhost:${PORT}`);
  addresses.forEach((ip) => {
    console.log(`On your Android phone (same Wi-Fi): http://${ip}:${PORT}`);
  });
  console.log(`\nOpen the link in Chrome on your phone, then tap:`);
  console.log(`"Install App" or Menu (⋮) -> "Add to Home screen"`);
  console.log(`=================================================\n`);
});

