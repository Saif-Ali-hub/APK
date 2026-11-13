const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const srcHtml = path.join(rootDir, 'ArrowPuzzle.html');
const wwwDir = path.join(rootDir, 'www');
const destHtml = path.join(wwwDir, 'index.html');

fs.mkdirSync(wwwDir, { recursive: true });
fs.copyFileSync(srcHtml, destHtml);
console.log(`Synced ArrowPuzzle.html -> ${path.relative(rootDir, destHtml)}`);

