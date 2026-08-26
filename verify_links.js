const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

const regex = /href="\.\/([^"]+\.html)"/g;
let match;
let missing = [];
let found = [];

while ((match = regex.exec(indexHtml)) !== null) {
  const targetFile = match[1];
  const fullPath = path.join(distDir, targetFile);
  if (!fs.existsSync(fullPath)) {
    missing.push(targetFile);
  } else {
    found.push(targetFile);
  }
}

console.log(`Total links in index.html: ${found.length + missing.length}`);
console.log(`Found in dist/: ${found.length}`);
console.log(`Missing in dist/: ${missing.length}`);
if (missing.length > 0) {
  console.log('Missing files:', missing);
}
console.log('All linked files:');
console.log(found.join(', '));
