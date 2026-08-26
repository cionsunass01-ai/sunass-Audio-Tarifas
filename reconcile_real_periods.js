const fs = require('fs');
const path = require('path');

const REAL_EPS_PERIODS = {
  'aguas-de-lima-norte': { name: 'EPS AGUAS DE LIMA NORTE SA', period: '2025 - 2029', region: 'Lima' },
  'aguas-del-altiplano': { name: 'AGUAS DEL ALTIPLANO', period: '2025 - 2029', region: 'Puno' },
  'emapa-canete': { name: 'EMAPA CAÑETE S.A.', period: '2025 - 2027', region: 'Lima' },
  'emapa-huaral': { name: 'EMAPA HUARAL S.A.', period: '2025 - 2027', region: 'Lima' },
  'emapa-pasco': { name: 'EMAPA PASCO', period: '2025 - 2027', region: 'Pasco' },
  'emapa-san-martin': { name: 'EMAPA SAN MARTÍN', period: '2025 - 2029', region: 'San Martín' },
  'emapa-y': { name: 'EMAPA-Y', period: '2025 - 2029', region: 'Puno' },
  'emapab': { name: 'EMAPAB', period: '2023 - 2027', region: 'Amazonas' },
  'emapacop': { name: 'EMAPACOP S.A.', period: '2025 - 2029', region: 'Ucayali' },
  'emapat': { name: 'EMAPAT', period: '2023 - 2027', region: 'Madre de Dios' },
  'emapavigs': { name: 'EMAPAVIGS', period: '2024 - 2027', region: 'Ica' },
  'emapica': { name: 'EMAPICA', period: '2023 - 2028', region: 'Ica' },
  'emapisco': { name: 'EMAPISCO', period: '2024 - 2026', region: 'Ica' },
  'emaq': { name: 'EMAQ', period: '2024 - 2027', region: 'Cusco' },
  'empssapal': { name: 'EMPSSAPAL', period: '2023 - 2028', region: 'Cusco' },
  'emsapa-calca': { name: 'EMSAPA CALCA', period: '2025 - 2027', region: 'Cusco' },
  'emsapchanka': { name: 'EMSAP CHANKA', period: '2023 - 2027', region: 'Apurímac' },
  'emsapuno': { name: 'EMSAPUNO', period: '2023 - 2027', region: 'Puno' },
  'emusap': { name: 'EMUSAP S.A.', period: '2021 - 2026', region: 'Amazonas' },
  'emusap-abancay': { name: 'EMUSAP ABANCAY', period: '2019 - 2024', region: 'Apurímac' },
  'eps-barranca': { name: 'EPS BARRANCA S.A.', period: '2025 - 2028', region: 'Lima' },
  'eps-chavin': { name: 'EPS CHAVÍN', period: '2015 - 2020', region: 'Áncash' },
  'eps-grau': { name: 'EPS GRAU', period: '2022 - 2027', region: 'Piura' },
  'eps-ilo': { name: 'EPS ILO S.A.', period: '2025 - 2028', region: 'Moquegua' },
  'eps-maranon': { name: 'EPS MARAÑÓN', period: '2023 - 2028', region: 'Cajamarca' },
  'epsel': { name: 'EPSEL S.A.', period: '2025 - 2028', region: 'Lambayeque' },
  'epssmu': { name: 'EPSSMU', period: '2023 - 2028', region: 'Amazonas' },
  'hvca': { name: 'HVCA', period: '2025 - 2028', region: 'Huancavelica' },
  'mantaro': { name: 'MANTARO', period: '2023 - 2028', region: 'Junín' },
  'moquegua': { name: 'MOQUEGUA', period: '2023 - 2027', region: 'Moquegua' },
  'moyobamba': { name: 'MOYOBAMBA', period: '2021 - 2026', region: 'San Martín' },
  'norpuno': { name: 'NORPUNO', period: '2025 - 2029', region: 'Puno' },
  'rioja': { name: 'RIOJA', period: '2022 - 2027', region: 'San Martín' },
  'seda-ayacucho': { name: 'SEDA AYACUCHO', period: '2022 - 2027', region: 'Ayacucho' },
  'sedacaj': { name: 'SEDACAJ S.A.', period: '2025 - 2029', region: 'Cajamarca' },
  'sedachimbote': { name: 'SEDACHIMBOTE', period: '2023 - 2028', region: 'Áncash' },
  'sedacusco': { name: 'SEDACUSCO S.A.', period: '2020 - 2025', region: 'Cusco' },
  'sedahuanuco': { name: 'SEDA HUÁNUCO', period: '2023 - 2028', region: 'Huánuco' },
  'sedajuliaca': { name: 'SEDAJULIACA S.A.', period: '2025 - 2029', region: 'Puno' },
  'sedalib': { name: 'SEDALIB', period: '2021 - 2026', region: 'La Libertad' },
  'sedaloreto': { name: 'SEDALORETO', period: '2022 - 2027', region: 'Loreto' },
  'sedam-huancayo': { name: 'SEDAM HUANCAYO', period: '2023 - 2028', region: 'Junín' },
  'sedapal': { name: 'SEDAPAL', period: '2022 - 2027', region: 'Lima' },
  'sedapar': { name: 'SEDAPAR', period: '2021 - 2026', region: 'Arequipa' },
  'selva-central': { name: 'SELVA CENTRAL', period: '2023 - 2027', region: 'Junín' },
  'semapach': { name: 'SEMAPACH', period: '2024 - 2028', region: 'Ica' },
  'sierra-central': { name: 'SIERRA CENTRAL', period: '2025 - 2029', region: 'Junín' },
  'tacna': { name: 'TACNA', period: '2024 - 2028', region: 'Tacna' },
  'unidad-002-tumbes': { name: 'UNIDAD 002 TUMBES', period: '2023 - 2027', region: 'Tumbes' },
  'yauli': { name: 'YAULI', period: '2022 - 2027', region: 'Junín' }
};

const webPagesDir = path.join(__dirname, 'sunass-plus---sunassplus', 'web-pages');
const mainPagePath = path.join(webPagesDir, 'página-principal', 'content-pages', 'Página-principal.es-ES.webpage.copy.html');

console.log('🔄 Sincronizando periodos 100% reales de cada estudio tarifario...');

// 1. Update individual EPS pages
Object.entries(REAL_EPS_PERIODS).forEach(([slug, data]) => {
  const contentDir = path.join(webPagesDir, slug, 'content-pages');
  if (!fs.existsSync(contentDir)) return;
  const htmlFiles = fs.readdirSync(contentDir).filter(f => f.endsWith('.copy.html'));
  if (htmlFiles.length === 0) return;
  
  const filePath = path.join(contentDir, htmlFiles[0]);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  const cleanPeriod = data.period.replace(/\s+/g, '');
  const [startYear, endYear] = cleanPeriod.split('-').map(Number);
  const yearsCount = (endYear - startYear) || 5;

  // Fix H2
  content = content.replace(/<h2[^>]*>Ficha Regulatoria\s*[0-9]{4}\s*[-–]\s*[0-9]{4}<\/h2>/gi, 
    `<h2 class="text-3xl font-bold text-slate-900 mb-2" style="color: var(--portalThemeColor7);">Ficha Regulatoria ${cleanPeriod}</h2>`);

  // Fix Subtitle
  content = content.replace(/periodo regulatorio\s*[0-9]{4}\s*[-–]\s*[0-9]{4}/gi, 
    `periodo regulatorio ${cleanPeriod}`);

  // Fix Title tag
  content = content.replace(/<title>Panel Interactivo:\s*Ficha Regulatoria\s*(.*?)\s*[0-9]{4}\s*[-–]\s*[0-9]{4}<\/title>/gi,
    `<title>Panel Interactivo: Ficha Regulatoria $1 ${cleanPeriod}</title>`);

  // Fix Period Stat Card
  content = content.replace(/(<h3[^>]*>Periodo Regulatorio<\/h3>\s*<p class="text-3xl font-bold mt-2">)[^<]*(<\/p>\s*<p class="text-xs text-slate-400 mt-1">)[^<]*(<\/p>)/gi,
    `$1${yearsCount} años$2${data.period}$3`);

  // Fix Region
  content = content.replace(/<p class="text-xs text-slate-400 mt-1">Región\s*[^<]*<\/p>/gi,
    `<p class="text-xs text-slate-400 mt-1">Región ${data.region}</p>`);

  fs.writeFileSync(filePath, content, 'utf-8');
});

// 2. Update Main Page (página principal) badges
let mainHtml = fs.readFileSync(mainPagePath, 'utf-8');

Object.entries(REAL_EPS_PERIODS).forEach(([slug, data]) => {
  // Replace badges for this EPS
  // Normalize match
  const searchPattern = new RegExp(`(<h3[^>]*>[^<]*${data.name.split(' ')[0]}[^<]*<\\/h3>\\s*<span[^>]*>)[^<]*(<\\/span>)`, 'gi');
  
  mainHtml = mainHtml.replace(
    new RegExp(`(<h3 class="text-lg font-bold"[^>]*>\\s*${data.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^<]*<\\/h3>\\s*<span[^>]*>[^<]*<\\/span>)`, 'gi'),
    `<h3 class="text-lg font-bold" style="color: var(--navy); margin-bottom: 0;">${data.name}</h3>\n                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap" style="background-color: #E0F2FE; color: #0369A1; border: 1px solid #BAE6FD;"><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>Periodo ${data.period}</span>`
  );
});

// Also replace specific SEDACUSCO badge directly to be 100% certain
mainHtml = mainHtml.replace(
  /<h3 class="text-lg font-bold" style="color: var\(--navy\); margin-bottom: 0;">SEDACUSCO S\.A\.<\/h3>\s*<span[^>]*>[\s\S]*?<\/span>/g,
  `<h3 class="text-lg font-bold" style="color: var(--navy); margin-bottom: 0;">SEDACUSCO S.A.</h3>\n                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap" style="background-color: #E0F2FE; color: #0369A1; border: 1px solid #BAE6FD;"><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>Periodo 2020 - 2025</span>`
);

fs.writeFileSync(mainPagePath, mainHtml, 'utf-8');
console.log('✅ Sincronización finalizada con éxito.');
