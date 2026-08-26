const fs = require('fs');
const path = require('path');

const srcHtml = path.join(__dirname, 'sunass-plus---sunassplus', 'web-pages', 'eps-grau', 'content-pages', 'EPS-Grau.es-ES.webpage.copy.html');
const destDir = path.join(__dirname, 'eps', 'eps-grau');
const destHtml = path.join(destDir, 'eps-grau.html');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

if (fs.existsSync(srcHtml)) {
  fs.copyFileSync(srcHtml, destHtml);
  console.log('✅ Archivo eps-grau.html copiado a la carpeta modular eps/eps-grau/');
}
