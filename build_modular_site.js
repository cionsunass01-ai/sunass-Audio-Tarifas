const fs = require('fs');
const path = require('path');

const EPS_DIR = path.join(__dirname, 'eps');
const DIST_DIR = path.join(__dirname, 'dist');

if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

console.log('🚀 Iniciando compilación modular desde la carpeta eps/...');

// 1. Ejecutar build_static_site.js para compilar la base
require('./build_static_site.js');

// 2. Leer todas las carpetas en eps/
const folders = fs.readdirSync(EPS_DIR).filter(f => fs.statSync(path.join(EPS_DIR, f)).isDirectory());
console.log(`📂 Procesando ${folders.length} carpetas modulares de EPS...`);

let indexHtmlPath = path.join(DIST_DIR, 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

function normalize(str) {
  return (str || '').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

folders.forEach(folder => {
  const folderPath = path.join(EPS_DIR, folder);
  const infoPath = path.join(folderPath, 'info.json');
  
  if (fs.existsSync(infoPath)) {
    try {
      const info = JSON.parse(fs.readFileSync(infoPath, 'utf-8'));
      const epsName = info.nombre || folder;
      const cleanEpsName = normalize(epsName);
      
      // A. Copiar archivo HTML individual si existe
      const htmlFiles = fs.readdirSync(folderPath).filter(f => f.endsWith('.html'));
      if (htmlFiles.length > 0) {
        const srcHtml = path.join(folderPath, htmlFiles[0]);
        const destHtml = path.join(DIST_DIR, htmlFiles[0]);
        fs.copyFileSync(srcHtml, destHtml);
      }
      
      // B. Actualizar Resumen en la tarjeta correspondiente de index.html
      if (info.resumen && info.resumen.trim() !== '') {
        // Encontrar la tarjeta que contiene este nombre de EPS
        // Cada tarjeta es: <div class="glass-card ..."> ... <h3 ...>NOMBRE</h3> ... <div id="summary-..." ...>RESUMEN</div> ... </div>
        const cardBlocks = indexHtml.split('<div class="glass-card');
        
        for (let i = 1; i < cardBlocks.length; i++) {
          const cardContent = cardBlocks[i];
          const normCard = normalize(cardContent.substring(0, 1200));
          
          // Verificar si esta tarjeta pertenece a esta EPS
          if (normCard.includes(cleanEpsName) || (info.key && normCard.includes(normalize(info.key)))) {
            // Reemplazar el resumen dentro del <div id="summary-..." ...>
            const updatedCard = cardContent.replace(
              /(<div[^>]*id=["']summary-[^"']*["'][^>]*>)([\s\S]*?)(<\/div>)/i,
              `$1\n          ${info.resumen.trim()}\n        $3`
            );
            cardBlocks[i] = updatedCard;
            console.log(`✅ Resumen actualizado en tarjeta index.html para: ${epsName}`);
            break;
          }
        }
        indexHtml = cardBlocks.join('<div class="glass-card');
      }

      // C. Actualizar Periodo en la tarjeta si está presente
      if (info.periodo && info.periodo.trim() !== '') {
        const cardBlocks = indexHtml.split('<div class="glass-card');
        for (let i = 1; i < cardBlocks.length; i++) {
          const normCard = normalize(cardBlocks[i].substring(0, 1200));
          if (normCard.includes(cleanEpsName)) {
            // Reemplazar badge de periodo
            const updatedCard = cardBlocks[i].replace(
              /(<span[^>]*><svg[^>]*><\/svg>)Periodo[^<]*(<\/span>)/i,
              `$1Periodo ${info.periodo.replace(/Periodo\s*/i, '').trim()}$2`
            );
            cardBlocks[i] = updatedCard;
            break;
          }
        }
        indexHtml = cardBlocks.join('<div class="glass-card');
      }

    } catch (e) {
      console.error(`Error al procesar ${folder}:`, e.message);
    }
  }
});

// Guardar index.html actualizado en dist/ y en la raíz
fs.writeFileSync(indexHtmlPath, indexHtml, 'utf-8');
const rootIndexPath = path.join(__dirname, 'index.html');
fs.writeFileSync(rootIndexPath, indexHtml, 'utf-8');

console.log('✅ Inyección modular en index.html completada con éxito.');
