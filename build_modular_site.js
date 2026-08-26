const fs = require('fs');
const path = require('path');

const EPS_DIR = path.join(__dirname, 'eps');
const DIST_DIR = path.join(__dirname, 'dist');
const TEMPLATE_INDEX = path.join(__dirname, 'sunass-plus---sunassplus', 'web-pages', 'página-principal', 'content-pages', 'Página-principal.es-ES.webpage.copy.html');

if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

console.log('🚀 Iniciando compilación modular desde la carpeta eps/...');

const folders = fs.readdirSync(EPS_DIR).filter(f => fs.statSync(path.join(EPS_DIR, f)).isDirectory());
console.log(`📂 Carpetas de EPS detectadas: ${folders.length}`);

let epsList = [];

folders.forEach(folder => {
  const infoPath = path.join(EPS_DIR, folder, 'info.json');
  if (fs.existsSync(infoPath)) {
    const info = JSON.parse(fs.readFileSync(infoPath, 'utf-8'));
    epsList.push(info);
    
    // Copy the individual HTML to dist/
    const htmlFileName = info.html_archivo || `${info.slug}.html`;
    const srcHtml = path.join(EPS_DIR, folder, htmlFileName);
    const destHtml = path.join(DIST_DIR, htmlFileName);
    
    if (fs.existsSync(srcHtml)) {
      let content = fs.readFileSync(srcHtml, 'utf-8');
      // Ensure background and footer
      fs.writeFileSync(destHtml, content, 'utf-8');
    }
  }
});

console.log(`✅ ${epsList.length} EPS procesadas e individuales copiadas a dist/`);

// Now run the main build_static_site.js to ensure index.html is 100% synchronized
require('./build_static_site.js');

console.log('\n🎉 ¡Compilación modular completada con éxito!');
