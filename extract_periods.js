const fs = require('fs');
const path = require('path');

const webPagesDir = path.join(__dirname, 'sunass-plus---sunassplus', 'web-pages');
const mainPagePath = path.join(webPagesDir, 'página-principal', 'content-pages', 'Página-principal.es-ES.webpage.copy.html');

const mainHtml = fs.readFileSync(mainPagePath, 'utf-8');

// List of EPS slugs from main page
const epsRegex = /<h3 class="text-lg font-bold"[^>]*>(.*?)<\/h3>/g;
let m;
const epsList = [];
while ((m = epsRegex.exec(mainHtml)) !== null) {
  epsList.push(m[1].trim());
}

console.log(`Found ${epsList.length} EPS in main page.`);

// Map of slug to period
const periods = {};

const dirs = fs.readdirSync(webPagesDir);
dirs.forEach(dir => {
  if (['página-principal', 'acceso-denegado', 'búsqueda', 'perfil', 'página-no-encontrada', 'emapa-huaral-deleted'].includes(dir)) return;
  const contentDir = path.join(webPagesDir, dir, 'content-pages');
  if (!fs.existsSync(contentDir)) return;
  const htmlFiles = fs.readdirSync(contentDir).filter(f => f.endsWith('.copy.html'));
  if (htmlFiles.length === 0) return;
  
  const content = fs.readFileSync(path.join(contentDir, htmlFiles[0]), 'utf-8');
  
  // Try pattern 1: Periodo Regulatorio card
  let match = content.match(/Periodo Regulatorio<\/h3>[\s\S]*?<p[^>]*class="[^"]*text-xs[^"]*"[^>]*>([0-9]{4}\s*[-–]\s*[0-9]{4})<\/p>/i);
  if (!match) {
    // Try pattern 2: Title or subtitle
    match = content.match(/Ficha Regulatoria[^\d]*([0-9]{4}\s*[-–]\s*[0-9]{4})/i);
  }
  if (!match) {
    // Try pattern 3: periodo regulatorio in text
    match = content.match(/periodo regulatorio\s*([0-9]{4}\s*[-–]\s*[0-9]{4})/i);
  }
  if (!match) {
    // Try pattern 4: any 20XX - 20YY
    match = content.match(/([0-9]{4}\s*[-–]\s*[0-9]{4})/);
  }
  
  periods[dir] = match ? match[1].replace(/\s+/g, ' ').trim() : 'N/A';
});

console.log(JSON.stringify(periods, null, 2));
