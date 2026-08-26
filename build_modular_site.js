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

function wrapHtmlIfFragment(title, content) {
  if (content.includes('<!DOCTYPE') || content.includes('<html')) {
    return content;
  }
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title || 'Estudio Tarifario - SUNASS'}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    :root {
      --bg-page: #ebf7ff;
      --navy: #0B2341;
      --cyan-accent: #00BCD4;
      --cyan-light: #E0F7FA;
      --sunass-blue: #0071CE;
    }
    body {
      font-family: 'Inter', sans-serif;
      background-color: #ebf7ff !important;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      margin: 0;
      padding: 0;
    }
  </style>
</head>
<body class="text-slate-800 antialiased flex flex-col min-h-screen" style="background-color: #ebf7ff !important;">
  <div class="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between text-xs sm:text-sm text-slate-600 shadow-sm sticky top-0 z-50">
    <a href="./index.html" class="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-800 transition">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
      Volver al Catálogo de Estudios Tarifarios
    </a>
    <span class="text-slate-400 hidden sm:inline">SUNASS — Portal de Estudios Tarifarios</span>
  </div>
  <div class="flex-grow" style="background-color: #ebf7ff !important;">
    ${content}
  </div>
  <footer role="contentinfo" class="footer mt-auto" style="background: linear-gradient(108deg, #005B9F 0%, #005B9F 78%, #4BAF18 78.1%, #4BAF18 100%); padding: 0; margin: 0; overflow: hidden;">
    <div style="max-width: 1200px; margin: 0 auto; padding: 40px 24px 20px 24px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 24px; margin-bottom: 24px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <img src="./logo%20de%20Equipo%20CION.png" alt="Equipo CION" style="height: 48px; object-fit: contain;" />
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="color: #ffffff; font-size: 24px; font-weight: 700; font-family: 'Inter', sans-serif; letter-spacing: -0.5px;">Sunass</span>
          <span style="color: rgba(255,255,255,0.6); font-size: 13px; font-family: 'Inter', sans-serif;">El regulador del agua potable</span>
        </div>
      </div>
      <div style="border-top: 1px solid rgba(255,255,255,0.12); padding-top: 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0; font-family: 'Inter', sans-serif;">© 2026 SUNASS · CION</p>
        <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0; font-family: 'Inter', sans-serif;">Información pública para mejores decisiones.</p>
      </div>
    </div>
  </footer>
</body>
</html>`;
}

folders.forEach(folder => {
  const folderPath = path.join(EPS_DIR, folder);
  const infoPath = path.join(folderPath, 'info.json');
  let info = {};
  if (fs.existsSync(infoPath)) {
    try { info = JSON.parse(fs.readFileSync(infoPath, 'utf-8')); } catch(e) {}
  }
  const epsName = info.nombre || folder;
  const cleanEpsName = normalize(epsName);

  // A. Copiar y publicar archivos HTML individuales de la EPS
  const htmlFiles = fs.readdirSync(folderPath).filter(f => f.endsWith('.html'));
  htmlFiles.forEach(htmlFile => {
    const srcHtml = path.join(folderPath, htmlFile);
    let rawContent = fs.readFileSync(srcHtml, 'utf-8');
    const finalHtml = wrapHtmlIfFragment(epsName, rawContent);
    
    // Guardar en dist/ y en la raíz del repositorio
    fs.writeFileSync(path.join(DIST_DIR, htmlFile), finalHtml, 'utf-8');
    fs.writeFileSync(path.join(__dirname, htmlFile), finalHtml, 'utf-8');
  });

  // A2. Copiar imágenes y logos de la EPS
  const mediaFiles = fs.readdirSync(folderPath).filter(f => /\.(png|jpe?g|webp|svg|gif|ico)$/i.test(f));
  mediaFiles.forEach(mediaFile => {
    const srcMedia = path.join(folderPath, mediaFile);
    fs.copyFileSync(srcMedia, path.join(DIST_DIR, mediaFile));
    fs.copyFileSync(srcMedia, path.join(__dirname, mediaFile));
  });

  // B. Actualizar Resumen en la tarjeta correspondiente de index.html
  if (info.resumen && info.resumen.trim() !== '') {
    const cardBlocks = indexHtml.split('<div class="glass-card');
    for (let i = 1; i < cardBlocks.length; i++) {
      const cardContent = cardBlocks[i];
      const normCard = normalize(cardContent.substring(0, 1200));
      if (normCard.includes(cleanEpsName) || (info.key && normCard.includes(normalize(info.key)))) {
        const updatedCard = cardContent.replace(
          /(<div[^>]*id=["']summary-[^"']*["'][^>]*>)([\s\S]*?)(<\/div>)/i,
          `$1\n          ${info.resumen.trim()}\n        $3`
        );
        cardBlocks[i] = updatedCard;
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

  // D. Actualizar URLs compartidas de SharePoint para Audio, PDF y Logo
  if (info.audio_url || info.pdf_url || info.logo_url) {
    const cardBlocks = indexHtml.split('<div class="glass-card');
    for (let i = 1; i < cardBlocks.length; i++) {
      const normCard = normalize(cardBlocks[i].substring(0, 1200));
      if (normCard.includes(cleanEpsName) || (info.key && normCard.includes(normalize(info.key)))) {
        let updatedCard = cardBlocks[i];
        
        if (info.audio_url) {
          updatedCard = updatedCard.replace(
            /(onclick=["'](?:event\.stopPropagation\(\);\s*)?playAudio\(['"])([^'"]+)(['"])/i,
            `$1${info.audio_url}$3`
          );
        }
        
        if (info.pdf_url) {
          updatedCard = updatedCard.replace(
            /(<a[^>]*href=["'])([^'"]+)(["'][^>]*onclick=["'](?:event\.stopPropagation\(\);\s*)?trackDownload)/i,
            `$1${info.pdf_url}$3`
          );
        }
        
        if (info.logo_url) {
          updatedCard = updatedCard.replace(
            /(<img[^>]*src=["'])([^'"]+)(["'][^>]*alt=)/i,
            `$1${info.logo_url}$3`
          );
        }

        cardBlocks[i] = updatedCard;
        break;
      }
    }
    indexHtml = cardBlocks.join('<div class="glass-card');
  }
});

// Guardar index.html actualizado en dist/ y en la raíz
fs.writeFileSync(indexHtmlPath, indexHtml, 'utf-8');
const rootIndexPath = path.join(__dirname, 'index.html');
fs.writeFileSync(rootIndexPath, indexHtml, 'utf-8');

console.log('✅ Inyección modular y sincronización de HTMLs completada.');
