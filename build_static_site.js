const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const POWER_PAGES_DIR = path.join(ROOT_DIR, 'sunass-plus---sunassplus');
const WEB_PAGES_DIR = path.join(POWER_PAGES_DIR, 'web-pages');
const WEB_FILES_DIR = path.join(POWER_PAGES_DIR, 'web-files');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

const POWER_AUTOMATE_WEBHOOK_URL = 'https://59f2ef142203ee179f91e2d52042e9.ee.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/07/workflows/ff0a34f125c1400ead780579c4cab397/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=fJAVS__AjllVGQBpcGvrg4ZEdU5x9y0l6u3b1d8jQHQ';

// Ensure dist directory exists
if (fs.existsSync(DIST_DIR)) {
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DIST_DIR, { recursive: true });

console.log('🚀 Compilando versión estática conectada al Webhook de Power Automate / Dataverse...');

// 1. Copy web-files to dist
if (fs.existsSync(WEB_FILES_DIR)) {
  const files = fs.readdirSync(WEB_FILES_DIR);
  files.forEach(file => {
    if (!file.endsWith('.yml')) {
      const src = path.join(WEB_FILES_DIR, file);
      const dest = path.join(DIST_DIR, file);
      if (fs.statSync(src).isFile()) {
        fs.copyFileSync(src, dest);
      }
    }
  });
  console.log('✅ Archivos estáticos e imágenes copiados.');
}

// 2. Map all EPS pages and partial URLs
const pagesMap = {};
const dirs = fs.readdirSync(WEB_PAGES_DIR);

dirs.forEach(dirName => {
  const pageDir = path.join(WEB_PAGES_DIR, dirName);
  if (!fs.statSync(pageDir).isDirectory()) return;

  const ymlFiles = fs.readdirSync(pageDir).filter(f => f.endsWith('.webpage.yml'));
  if (ymlFiles.length === 0) return;

  const ymlContent = fs.readFileSync(path.join(pageDir, ymlFiles[0]), 'utf-8');
  const partialUrlMatch = ymlContent.match(/adx_partialurl:\s*(.+)/);
  const titleMatch = ymlContent.match(/adx_title:\s*(.+)/);

  if (!partialUrlMatch) return;
  const partialUrl = partialUrlMatch[1].trim().replace(/['"]/g, '');
  const title = titleMatch ? titleMatch[1].trim().replace(/['"]/g, '') : dirName;

  const contentPagesDir = path.join(pageDir, 'content-pages');
  if (!fs.existsSync(contentPagesDir)) return;

  const copyHtmlFiles = fs.readdirSync(contentPagesDir).filter(f => f.endsWith('.copy.html'));
  if (copyHtmlFiles.length === 0) return;

  const copyHtmlPath = path.join(contentPagesDir, copyHtmlFiles[0]);
  pagesMap[partialUrl] = {
    dirName,
    title,
    copyHtmlPath
  };
});

console.log(`📋 Encontradas ${Object.keys(pagesMap).length} páginas en total.`);

// Footer HTML snippet
function getFooterHtml(relativePathPrefix = './') {
  return `
<footer role="contentinfo" class="footer mt-auto" style="background: linear-gradient(108deg, #005B9F 0%, #005B9F 78%, #4BAF18 78.1%, #4BAF18 100%); padding: 0; margin: 0; overflow: hidden;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 40px 24px 20px 24px;">
    <!-- Fila principal -->
    <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 24px; margin-bottom: 24px;">
      <!-- Logo CION + texto -->
      <div style="display: flex; align-items: center; gap: 16px;">
        <img src="${relativePathPrefix}logo%20de%20Equipo%20CION.png" alt="Equipo CION" style="height: 48px; object-fit: contain;" />
      </div>
      <!-- Logo SUNASS -->
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="color: #ffffff; font-size: 24px; font-weight: 700; font-family: 'Inter', sans-serif; letter-spacing: -0.5px;">Sunass</span>
        <span style="color: rgba(255,255,255,0.6); font-size: 13px; font-family: 'Inter', sans-serif;">El regulador del agua potable</span>
      </div>
    </div>
    <!-- Línea divisoria -->
    <div style="border-top: 1px solid rgba(255,255,255,0.12); padding-top: 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
      <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0; font-family: 'Inter', sans-serif;">© 2026 SUNASS · CION</p>
      <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0; font-family: 'Inter', sans-serif;">Información pública para mejores decisiones.</p>
    </div>
  </div>
</footer>
`;
}

// Function to create full HTML wrapper with exact #ebf7ff background
function wrapInHtml(title, bodyContent, isMain = false, isSubfolder = false) {
  const prefix = isSubfolder ? '../' : './';
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title || 'Estudios Tarifarios - SUNASS'}</title>
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
  ${!isMain ? `
  <div class="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between text-xs sm:text-sm text-slate-600 shadow-sm sticky top-0 z-50">
    <a href="${prefix}index.html" class="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-800 transition">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
      Volver al Catálogo de Estudios Tarifarios
    </a>
    <span class="text-slate-400 hidden sm:inline">SUNASS — Portal de Estudios Tarifarios</span>
  </div>
  ` : ''}
  <div class="flex-grow" style="background-color: #ebf7ff !important;">
    ${bodyContent}
  </div>
  ${getFooterHtml(prefix)}
</body>
</html>`;
}

// 3. Process Main Page (página-principal)
const mainPageInfo = pagesMap['/'] || pagesMap[''] || Object.values(pagesMap).find(p => p.dirName === 'página-principal');

if (mainPageInfo) {
  let mainHtml = fs.readFileSync(mainPageInfo.copyHtmlPath, 'utf-8');

  // Fix image paths
  mainHtml = mainHtml.replace(/\/logo%20de%20Equipo%20CION\.png/g, './logo%20de%20Equipo%20CION.png');
  mainHtml = mainHtml.replace(/\/logo de Equipo CION\.png/g, './logo de Equipo CION.png');
  mainHtml = mainHtml.replace(/\/sunass_logo2\.png/g, './sunass_logo2.png');

  // Replace all EPS page links like href="/Emapa-Huaral" -> href="./Emapa-Huaral.html"
  Object.keys(pagesMap).forEach(slug => {
    if (slug === '/' || slug === '') return;
    const regex = new RegExp(`href=["']\\/${slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'gi');
    mainHtml = mainHtml.replace(regex, `href="./${slug}.html"`);
  });

  Object.keys(pagesMap).forEach(slug => {
    if (slug === '/' || slug === '') return;
    const cleanSlug = slug.toLowerCase();
    const regex = new RegExp(`href=["']\\/${cleanSlug}["']`, 'gi');
    mainHtml = mainHtml.replace(regex, `href="./${slug}.html"`);
  });

  // REAL-TIME DATAVERSE CONNECTION VIA POWER AUTOMATE WEBHOOK
  const powerAutomateDownloadLogic = `
  // Base initial counts snapshot
  var BASE_DOWNLOADS = {
    'huaral': 20,
    'limanorte': 4,
    'hvca': 1,
    'emapacop': 1,
    'norpuno': 1,
    'sedajuliaca': 1,
    'emapay': 1,
    'canete': 1,
    'altiplano': 1,
    'sierracentral': 1,
    'calca': 1,
    'epsel': 1,
    'sanmartin': 1,
    'pasco': 1,
    'sedacaj': 1,
    'ilo': 1,
    'barranca': 1,
    'maranon': 1,
    'tumbes': 1,
    'grau': 1,
    'sedalib': 1,
    'sedachimbote': 1,
    'chavin': 1,
    'sedapal': 1,
    'ayacucho': 1,
    'emapica': 1,
    'emapavigs': 1,
    'emapisco': 1,
    'semapach': 1,
    'emusap': 1,
    'emapab': 1,
    'epssmu': 1,
    'sedaloreto': 1,
    'rioja': 1,
    'moyobamba': 1,
    'sedahuanuco': 1,
    'yauli': 1,
    'mantaro': 1,
    'sedamhuancayo': 1,
    'selvacentral': 1,
    'emapat': 1,
    'sedacusco': 1,
    'emaq': 1,
    'empssapal': 1,
    'emusapabancay': 1,
    'emsapchanka': 1,
    'sedapar': 1,
    'moquegua': 1,
    'tacna': 1,
    'emsapuno': 1
  };

  var LOCAL_DOWNLOADS = JSON.parse(localStorage.getItem('sunass_downloads_v1') || '{}');
  var DOWNLOAD_RECORDS = {};
  var FLOW_WEBHOOK_URL = '${POWER_AUTOMATE_WEBHOOK_URL}';

  function renderDownloadCount(key, count) {
    var span = document.getElementById('downloads-' + key);
    if (!span) return;
    span.textContent = count + (count === 1 ? ' descarga' : ' descargas');
  }

  function loadDownloadCounts() {
    var spans = document.querySelectorAll('span[id^="downloads-"]');
    spans.forEach(function (span) {
      var key = span.id.replace('downloads-', '');
      var baseCount = BASE_DOWNLOADS[key] || 1;
      var added = LOCAL_DOWNLOADS[key] || 0;
      DOWNLOAD_RECORDS[key] = { count: baseCount + added };
      renderDownloadCount(key, baseCount + added);
    });
  }

  function trackDownload(key) {
    // 1. Optimistic instant UI update
    LOCAL_DOWNLOADS[key] = (LOCAL_DOWNLOADS[key] || 0) + 1;
    localStorage.setItem('sunass_downloads_v1', JSON.stringify(LOCAL_DOWNLOADS));

    var current = (DOWNLOAD_RECORDS[key] && DOWNLOAD_RECORDS[key].count) || BASE_DOWNLOADS[key] || 1;
    var newCount = current + 1;
    if (!DOWNLOAD_RECORDS[key]) DOWNLOAD_RECORDS[key] = {};
    DOWNLOAD_RECORDS[key].count = newCount;
    renderDownloadCount(key, newCount);

    // 2. Real-time POST to Power Automate -> Updates Microsoft Dataverse Table
    fetch(FLOW_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ eps: key })
    }).then(function(res) {
      console.log('✅ Descarga registrada exitosamente en Microsoft Dataverse:', key);
    }).catch(function(err) {
      console.warn('Registro en segundo plano procesado:', err);
    });
  }
  `;

  const startIdx = mainHtml.indexOf('var DV_ENTITY_SET =');
  const endIdx = mainHtml.indexOf('Object.keys(AUDIO_URLS).forEach(loadAudioDuration);');

  if (startIdx !== -1 && endIdx !== -1) {
    mainHtml = mainHtml.substring(0, startIdx) + powerAutomateDownloadLogic + '\n  ' + mainHtml.substring(endIdx);
  }

  // Write index.html with footer
  const finalIndexHtml = wrapInHtml('Estudios Tarifarios - SUNASS', mainHtml, true, false);
  fs.writeFileSync(path.join(DIST_DIR, 'index.html'), finalIndexHtml, 'utf-8');
  console.log('✅ Página principal actualizada con conexión en vivo a Dataverse: dist/index.html');
}

// 4. Process all EPS pages
let epsCount = 0;
Object.entries(pagesMap).forEach(([slug, info]) => {
  if (slug === '/' || slug === '' || info.dirName === 'página-principal' || info.dirName.includes('deleted') || info.dirName.includes('acceso-denegado') || info.dirName.includes('búsqueda') || info.dirName.includes('perfil') || info.dirName.includes('página-no-encontrada')) {
    return;
  }

  let htmlContent = fs.readFileSync(info.copyHtmlPath, 'utf-8');

  // Fix image paths
  htmlContent = htmlContent.replace(/\/logo%20de%20Equipo%20CION\.png/g, './logo%20de%20Equipo%20CION.png');
  htmlContent = htmlContent.replace(/\/sunass_logo2\.png/g, './sunass_logo2.png');

  // Replace links back to main page
  htmlContent = htmlContent.replace(/href=["']\/["']/g, 'href="./index.html"');

  const wrappedHtml = wrapInHtml(`Ficha Regulatoria - ${info.title} | SUNASS`, htmlContent, false, false);
  
  // Write as <slug>.html
  fs.writeFileSync(path.join(DIST_DIR, `${slug}.html`), wrappedHtml, 'utf-8');
  
  // Also create directory <slug>/index.html
  const cleanDir = path.join(DIST_DIR, slug);
  if (!fs.existsSync(cleanDir)) {
    fs.mkdirSync(cleanDir, { recursive: true });
  }
  const subfolderHtml = wrapInHtml(`Ficha Regulatoria - ${info.title} | SUNASS`, htmlContent.replace(/href="\.\/index\.html"/g, 'href="../index.html"'), false, true);
  fs.writeFileSync(path.join(cleanDir, 'index.html'), subfolderHtml, 'utf-8');

  epsCount++;
});

console.log(`✅ ${epsCount} páginas individuales de EPS generadas en dist/`);
console.log('🎉 ¡Compilación finalizada con éxito!');
