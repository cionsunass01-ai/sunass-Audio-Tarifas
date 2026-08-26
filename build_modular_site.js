const fs = require('fs');
const path = require('path');

const EPS_DIR = path.join(__dirname, 'eps');
const DIST_DIR = path.join(__dirname, 'dist');
const TEMPLATE_INDEX = path.join(__dirname, 'sunass-plus---sunassplus', 'web-pages', 'página-principal', 'content-pages', 'Página-principal.es-ES.webpage.copy.html');

if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

console.log('🚀 Iniciando compilación modular desde la carpeta eps/...');

// 1. Ejecutar build_static_site.js para compilar la base
require('./build_static_site.js');

// 2. Leer todas las carpetas en eps/ y cargar sus info.json
const folders = fs.readdirSync(EPS_DIR).filter(f => fs.statSync(path.join(EPS_DIR, f)).isDirectory());
console.log(`📂 Procesando ${folders.length} carpetas modulares de EPS...`);

let indexHtmlPath = path.join(DIST_DIR, 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

folders.forEach(folder => {
  const folderPath = path.join(EPS_DIR, folder);
  const infoPath = path.join(folderPath, 'info.json');
  
  if (fs.existsSync(infoPath)) {
    try {
      const info = JSON.parse(fs.readFileSync(infoPath, 'utf-8'));
      const key = info.key || folder.toLowerCase().replace(/[^a-z0-9]/g, '');
      
      // A. Copiar archivo HTML individual si existe en la carpeta eps/
      const htmlFiles = fs.readdirSync(folderPath).filter(f => f.endsWith('.html'));
      if (htmlFiles.length > 0) {
        const srcHtml = path.join(folderPath, htmlFiles[0]);
        const destHtml = path.join(DIST_DIR, htmlFiles[0]);
        fs.copyFileSync(srcHtml, destHtml);
      }
      
      // B. Actualizar Resumen en index.html
      if (info.resumen) {
        // Buscar el contenedor de resumen: id="summary-<key>"
        // regex que captura <div id="summary-<key>" ...>CONTENIDO</div>
        const summaryRegex = new RegExp(`(<div[^>]*id=["']summary-${key}["'][^>]*>)[\\s\\S]*?(<\\/div>)`, 'i');
        if (summaryRegex.test(indexHtml)) {
          indexHtml = indexHtml.replace(summaryRegex, `$1\n          ${info.resumen.trim()}\n        $2`);
        } else {
          // Intentar coincidencia por slug o nombre si no coincide la key directa
          const slugKey = (info.slug || folder).toLowerCase().replace(/[^a-z0-9]/g, '');
          const fallbackRegex = new RegExp(`(<div[^>]*id=["']summary-[^"']*${slugKey}[^"']*["'][^>]*>)[\\s\\S]*?(<\\/div>)`, 'i');
          if (fallbackRegex.test(indexHtml)) {
            indexHtml = indexHtml.replace(fallbackRegex, `$1\n          ${info.resumen.trim()}\n        $2`);
          }
        }
      }

      // C. Actualizar Periodo si está presente
      if (info.periodo) {
        // Si hay una tarjeta para esta EPS, buscar su badge de periodo
        const cardRegex = new RegExp(`(id=["']summary-${key}["'][\\s\\S]*?<\\/div>)`, 'i');
      }

    } catch (e) {
      console.error(`Error al procesar info.json de ${folder}:`, e.message);
    }
  }
});

// Guardar index.html actualizado en dist/ y en la raíz
fs.writeFileSync(indexHtmlPath, indexHtml, 'utf-8');
const rootIndexPath = path.join(__dirname, 'index.html');
fs.writeFileSync(rootIndexPath, indexHtml, 'utf-8');

console.log('✅ Todos los resúmenes y datos modulares fueron inyectados en index.html con éxito.');
console.log('🎉 ¡Compilación modular completada con éxito!');
