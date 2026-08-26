const fs = require('fs');
const path = require('path');

const webPagesDir = path.join(__dirname, 'sunass-plus---sunassplus', 'web-pages');

// Correct Region and Period mapping for each EPS
const EPS_DATA = {
  'aguas-de-lima-norte': { region: 'Lima', period: '2025 - 2029' },
  'aguas-del-altiplano': { region: 'Puno', period: '2025 - 2029' },
  'emapa-canete': { region: 'Lima', period: '2025 - 2027' },
  'emapa-huaral': { region: 'Lima', period: '2025 - 2027' },
  'emapa-pasco': { region: 'Pasco', period: '2025 - 2027' },
  'emapa-san-martin': { region: 'San Martín', period: '2025 - 2029' },
  'emapa-y': { region: 'Puno', period: '2025 - 2029' },
  'emapab': { region: 'Amazonas', period: '2025 - 2027' },
  'emapacop': { region: 'Ucayali', period: '2025 - 2029' },
  'emapat': { region: 'Madre de Dios', period: '2025 - 2027' },
  'emapavigs': { region: 'Ica', period: '2025 - 2027' },
  'emapica': { region: 'Ica', period: '2025 - 2027' },
  'emapisco': { region: 'Ica', period: '2025 - 2027' },
  'emaq': { region: 'Cusco', period: '2025 - 2027' },
  'empssapal': { region: 'Cusco', period: '2025 - 2027' },
  'emsapa-calca': { region: 'Cusco', period: '2025 - 2027' },
  'emsapchanka': { region: 'Apurímac', period: '2025 - 2027' },
  'emsapuno': { region: 'Puno', period: '2025 - 2027' },
  'emusap': { region: 'Amazonas', period: '2025 - 2027' },
  'emusap-abancay': { region: 'Apurímac', period: '2025 - 2027' },
  'eps-barranca': { region: 'Lima', period: '2025 - 2028' },
  'eps-chavin': { region: 'Áncash', period: '2025 - 2027' },
  'eps-grau': { region: 'Piura', period: '2025 - 2027' },
  'eps-ilo': { region: 'Moquegua', period: '2025 - 2028' },
  'eps-maranon': { region: 'Cajamarca', period: '2025 - 2027' },
  'epsel': { region: 'Lambayeque', period: '2025 - 2028' },
  'epssmu': { region: 'Amazonas', period: '2025 - 2027' },
  'hvca': { region: 'Huancavelica', period: '2025 - 2028' },
  'mantaro': { region: 'Junín', period: '2025 - 2027' },
  'moquegua': { region: 'Moquegua', period: '2025 - 2027' },
  'moyobamba': { region: 'San Martín', period: '2025 - 2027' },
  'norpuno': { region: 'Puno', period: '2025 - 2029' },
  'rioja': { region: 'San Martín', period: '2025 - 2027' },
  'seda-ayacucho': { region: 'Ayacucho', period: '2025 - 2027' },
  'sedacaj': { region: 'Cajamarca', period: '2025 - 2029' },
  'sedachimbote': { region: 'Áncash', period: '2025 - 2027' },
  'sedacusco': { region: 'Cusco', period: '2025 - 2027' },
  'sedahuanuco': { region: 'Huánuco', period: '2025 - 2027' },
  'sedajuliaca': { region: 'Puno', period: '2025 - 2029' },
  'sedalib': { region: 'La Libertad', period: '2025 - 2027' },
  'sedaloreto': { region: 'Loreto', period: '2025 - 2027' },
  'sedam-huancayo': { region: 'Junín', period: '2025 - 2027' },
  'sedapal': { region: 'Lima', period: '2025 - 2027' },
  'sedapar': { region: 'Arequipa', period: '2025 - 2027' },
  'selva-central': { region: 'Junín', period: '2025 - 2027' },
  'semapach': { region: 'Ica', period: '2025 - 2027' },
  'sierra-central': { region: 'Junín', period: '2025 - 2029' },
  'tacna': { region: 'Tacna', period: '2025 - 2027' },
  'unidad-002-tumbes': { region: 'Tumbes', period: '2025 - 2027' },
  'yauli': { region: 'Junín', period: '2025 - 2027' }
};

let fixedCount = 0;

Object.entries(EPS_DATA).forEach(([slug, data]) => {
  const contentDir = path.join(webPagesDir, slug, 'content-pages');
  if (!fs.existsSync(contentDir)) return;
  const htmlFiles = fs.readdirSync(contentDir).filter(f => f.endsWith('.copy.html'));
  if (htmlFiles.length === 0) return;
  
  const filePath = path.join(contentDir, htmlFiles[0]);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  const cleanPeriod = data.period.replace(/\s+/g, '');
  const spacedPeriod = data.period;

  // 1. Fix H2 heading: Ficha Regulatoria 20XX-20YY -> Ficha Regulatoria 2025-2027
  content = content.replace(/<h2[^>]*>Ficha Regulatoria\s*[0-9]{4}\s*[-–]\s*[0-9]{4}<\/h2>/gi, 
    `<h2 class="text-3xl font-bold text-slate-900 mb-2" style="color: var(--portalThemeColor7);">Ficha Regulatoria ${cleanPeriod}</h2>`);

  // 2. Fix subtitle paragraph: periodo regulatorio 20XX-20YY -> periodo regulatorio 2025-2027
  content = content.replace(/periodo regulatorio\s*[0-9]{4}\s*[-–]\s*[0-9]{4}/gi, 
    `periodo regulatorio ${cleanPeriod}`);

  // 3. Fix Title tag
  content = content.replace(/<title>Panel Interactivo:\s*Ficha Regulatoria\s*(.*?)\s*[0-9]{4}\s*[-–]\s*[0-9]{4}<\/title>/gi,
    `<title>Panel Interactivo: Ficha Regulatoria $1 ${cleanPeriod}</title>`);

  // 4. Fix Region in Localidad card: Región Lima -> Región [Actual]
  content = content.replace(/<p class="text-xs text-slate-400 mt-1">Región\s*[^<]*<\/p>/gi,
    `<p class="text-xs text-slate-400 mt-1">Región ${data.region}</p>`);

  fs.writeFileSync(filePath, content, 'utf-8');
  fixedCount++;
});

console.log(`✅ Corregidos los encabezados de periodos y regiones en ${fixedCount} fichas de EPS.`);
