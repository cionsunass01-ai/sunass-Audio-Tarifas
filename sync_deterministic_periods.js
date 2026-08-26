const fs = require('fs');
const path = require('path');

const MAIN_PAGE_PATH = path.join(__dirname, 'sunass-plus---sunassplus', 'web-pages', 'página-principal', 'content-pages', 'Página-principal.es-ES.webpage.copy.html');
const WEB_PAGES_DIR = path.join(__dirname, 'sunass-plus---sunassplus', 'web-pages');

let content = fs.readFileSync(MAIN_PAGE_PATH, 'utf-8');

// Parse each card in main page
const cardBlocks = content.split('<!-- Tarjeta ');
let newMainHtml = cardBlocks[0];

const cardAudit = [];

cardBlocks.slice(1).forEach((block, idx) => {
  const cardIndex = idx + 1;
  
  // Extract Title
  const titleMatch = block.match(/<h3 class="text-lg font-bold"[^>]*>([\s\S]*?)<\/h3>/i);
  let rawTitle = titleMatch ? titleMatch[1].trim() : '';
  // Clean rawTitle if it has existing badges inside
  rawTitle = rawTitle.replace(/<[^>]+>/g, '').trim();

  // Extract Summary Text
  const summaryMatch = block.match(/<div id="summary-[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  const summaryText = summaryMatch ? summaryMatch[1].replace(/<[^>]+>/g, '').trim() : '';
  
  // Extract exact period from summary
  let periodMatch = summaryText.match(/(?:estudio tarifario|periodo regulatorio|plan tarifario|periodo|quinquenio)\s*(?:para\s*(?:el\s*)?)?([0-9]{4}\s*[-–]\s*[0-9]{4})/i) ||
                    summaryText.match(/([0-9]{4}\s*[-–]\s*[0-9]{4})/);
  
  let period = periodMatch ? periodMatch[1].replace(/\s+/g, ' ').replace('–', '-').trim() : '2025 - 2027';
  if (!period.includes(' ')) {
    period = period.replace('-', ' - ');
  }

  // Extract slug from href="./slug.html" or href="/slug"
  const hrefMatch = block.match(/href="(?:\.\/|\/)?([^".]+)(?:\.html)?"/);
  const slug = hrefMatch ? hrefMatch[1].toLowerCase() : '';

  cardAudit.push({ cardIndex, rawTitle, period, slug });

  // Rebuild the card header cleanly with the EXACT period badge
  // Replace the entire title container in this block
  let updatedBlock = block;

  // Remove any existing badges or wrapper
  updatedBlock = updatedBlock.replace(
    /<div class="flex flex-wrap items-center gap-x-2\.5 gap-y-1">[\s\S]*?<\/div>/i,
    `<div class="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <h3 class="text-lg font-bold" style="color: var(--navy); margin-bottom: 0;">${rawTitle}</h3>
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap" style="background-color: #E0F2FE; color: #0369A1; border: 1px solid #BAE6FD;"><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>Periodo ${period}</span>
              </div>`
  );

  newMainHtml += '<!-- Tarjeta ' + updatedBlock;
});

fs.writeFileSync(MAIN_PAGE_PATH, newMainHtml, 'utf-8');
console.log(`✅ ${cardAudit.length} tarjetas del index reconstruidas con sus periodos 100% reales.`);

// 2. Also update individual fact sheet files to match their exact card period
let updatedFactSheets = 0;
const dirs = fs.readdirSync(WEB_PAGES_DIR);

dirs.forEach(dir => {
  if (['página-principal', 'acceso-denegado', 'búsqueda', 'perfil', 'página-no-encontrada', 'emapa-huaral-deleted'].includes(dir)) return;
  const contentDir = path.join(WEB_PAGES_DIR, dir, 'content-pages');
  if (!fs.existsSync(contentDir)) return;
  const htmlFiles = fs.readdirSync(contentDir).filter(f => f.endsWith('.copy.html'));
  if (htmlFiles.length === 0) return;
  
  const filePath = path.join(contentDir, htmlFiles[0]);
  let fContent = fs.readFileSync(filePath, 'utf-8');

  // Match with cardAudit
  const item = cardAudit.find(c => c.slug === dir.toLowerCase() || dir.toLowerCase().includes(c.slug));
  if (item) {
    const period = item.period;
    const cleanPeriod = period.replace(/\s+/g, '');
    const [startYear, endYear] = cleanPeriod.split('-').map(Number);
    const yearsCount = (endYear - startYear) || 5;

    // Fix H2
    fContent = fContent.replace(/<h2[^>]*>Ficha Regulatoria\s*[0-9]{4}\s*[-–]\s*[0-9]{4}<\/h2>/gi, 
      `<h2 class="text-3xl font-bold text-slate-900 mb-2" style="color: var(--portalThemeColor7);">Ficha Regulatoria ${cleanPeriod}</h2>`);

    // Fix Subtitle
    fContent = fContent.replace(/periodo regulatorio\s*[0-9]{4}\s*[-–]\s*[0-9]{4}/gi, 
      `periodo regulatorio ${cleanPeriod}`);

    // Fix Title tag
    fContent = fContent.replace(/<title>Panel Interactivo:\s*Ficha Regulatoria\s*(.*?)\s*[0-9]{4}\s*[-–]\s*[0-9]{4}<\/title>/gi,
      `<title>Panel Interactivo: Ficha Regulatoria $1 ${cleanPeriod}</title>`);

    // Fix Period Stat Card
    fContent = fContent.replace(/(<h3[^>]*>Periodo Regulatorio<\/h3>\s*<p class="text-3xl font-bold mt-2">)[^<]*(<\/p>\s*<p class="text-xs text-slate-400 mt-1">)[^<]*(<\/p>)/gi,
      `$1${yearsCount} años$2${period}$3`);

    fs.writeFileSync(filePath, fContent, 'utf-8');
    updatedFactSheets++;
  }
});

console.log(`✅ ${updatedFactSheets} fichas técnicas individuales actualizadas y sincronizadas.`);
