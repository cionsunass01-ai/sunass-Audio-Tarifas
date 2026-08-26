const fs = require('fs');
const path = require('path');

const MAIN_PAGE_PATH = path.join(__dirname, 'sunass-plus---sunassplus', 'web-pages', 'página-principal', 'content-pages', 'Página-principal.es-ES.webpage.copy.html');

console.log('🏷️ Añadiendo Periodo Regulatorio junto al nombre de cada EPS (Opción B)...');

let html = fs.readFileSync(MAIN_PAGE_PATH, 'utf-8');

// Map of EPS partial names or unique identifiers to periods
const EPS_PERIODS = {
  'EMAPA HUARAL': '2025 - 2027',
  'AGUAS DE LIMA NORTE': '2025 - 2029',
  'HVCA': '2025 - 2028',
  'EMAPACOP': '2025 - 2029',
  'NORPUNO': '2025 - 2029',
  'SEDAJULIACA': '2025 - 2029',
  'EMAPA-Y': '2025 - 2029',
  'EMAPA CAÑETE': '2025 - 2027',
  'AGUAS DEL ALTIPLANO': '2025 - 2029',
  'SIERRA CENTRAL': '2025 - 2029',
  'EMSAPA CALCA': '2025 - 2027',
  'EPSEL': '2025 - 2028',
  'EMAPA SAN MARTÍN': '2025 - 2029',
  'EMAPA PASCO': '2025 - 2027',
  'SEDACAJ': '2025 - 2029',
  'EPS ILO': '2025 - 2028',
  'EPS BARRANCA': '2025 - 2028',
  'EPS MARAÑÓN': '2025 - 2027',
  'UNIDAD EJECUTORA 002': '2025 - 2027',
  'EPS GRAU': '2025 - 2027',
  'SEDALIB': '2025 - 2027',
  'SEDACHIMBOTE': '2025 - 2027',
  'EPS CHAVÍN': '2025 - 2027',
  'SEDAPAL': '2025 - 2027',
  'SEDA AYACUCHO': '2025 - 2027',
  'EMAPICA': '2025 - 2027',
  'EMAPAVIGS': '2025 - 2027',
  'EMAPISCO': '2025 - 2027',
  'SEMAPACH': '2025 - 2027',
  'EMUSAP S.A.': '2025 - 2027',
  'EMAPAB': '2025 - 2027',
  'EPSSMU': '2025 - 2027',
  'SEDALORETO': '2025 - 2027',
  'EPS RIOJA': '2025 - 2027',
  'EPS MOYOBAMBA': '2025 - 2027',
  'SEDA HUÁNUCO': '2025 - 2027',
  'EMSAPA YAULI': '2025 - 2027',
  'EPS MANTARO': '2025 - 2027',
  'SEDAM HUANCAYO': '2025 - 2027',
  'SELVA CENTRAL': '2025 - 2027',
  'EMAPAT': '2025 - 2027',
  'SEDACUSCO': '2025 - 2027',
  'EMAQ': '2025 - 2027',
  'EMPSSAPAL': '2025 - 2027',
  'EMUSAP ABANCAY': '2025 - 2027',
  'EMSAP CHANKA': '2025 - 2027',
  'SEDAPAR': '2025 - 2027',
  'EPS MOQUEGUA': '2025 - 2027',
  'EPS TACNA': '2025 - 2027',
  'EMSAPUNO': '2025 - 2027'
};

function getPeriodForEps(title) {
  const norm = title.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  for (const [key, period] of Object.entries(EPS_PERIODS)) {
    const keyNorm = key.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (norm.includes(keyNorm)) {
      return period;
    }
  }
  return '2025 - 2027'; // fallback
}

// Regex to replace <h3 class="text-lg font-bold" style="color: var(--navy);">TITLE</h3>
// with the title + period badge wrapper
let count = 0;
html = html.replace(/<h3 class="text-lg font-bold" style="color: var\(--navy\);">(.*?)<\/h3>/g, (match, title) => {
  // If already has period badge, don't duplicate
  if (title.includes('Periodo')) return match;
  
  const period = getPeriodForEps(title);
  count++;
  return `<div class="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <h3 class="text-lg font-bold" style="color: var(--navy); margin-bottom: 0;">${title}</h3>
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap" style="background-color: #E0F2FE; color: #0369A1; border: 1px solid #BAE6FD;"><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>Periodo ${period}</span>
              </div>`;
});

console.log(`✅ Se añadieron ${count} badges de Periodo Regulatorio.`);
fs.writeFileSync(MAIN_PAGE_PATH, html, 'utf-8');
