const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const rootDir = __dirname;

const files = fs.readdirSync(distDir);
console.log(`Copiando ${files.length} archivos de dist/ a la raíz para despliegue instantáneo...`);

files.forEach(file => {
  const src = path.join(distDir, file);
  const dest = path.join(rootDir, file);
  if (fs.statSync(src).isFile()) {
    fs.copyFileSync(src, dest);
  }
});

console.log('✅ Archivos copiados a la raíz con éxito.');
