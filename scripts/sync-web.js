const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const srcHtml = path.join(rootDir, 'ArrowPuzzle.html');
const rootIndex = path.join(rootDir, 'index.html');
const wwwDir = path.join(rootDir, 'www');
const destHtml = path.join(wwwDir, 'index.html');

fs.copyFileSync(srcHtml, rootIndex);
fs.mkdirSync(wwwDir, { recursive: true });
fs.copyFileSync(srcHtml, destHtml);

['manifest.json', 'sw.js', 'icon.svg'].forEach(file => {
  const rootFile = path.join(rootDir, file);
  const wwwFile = path.join(wwwDir, file);
  if (fs.existsSync(rootFile) && !fs.existsSync(wwwFile)) {
    fs.copyFileSync(rootFile, wwwFile);
  }
});

console.log(`Synced web assets to root index.html and www/index.html`);
