const fs = require('fs');
const path = require('path');

const webPagesDir = path.join(__dirname, 'sunass-plus---sunassplus', 'web-pages');
const dirs = fs.readdirSync(webPagesDir);

const auditResults = [];

dirs.forEach(dir => {
  if (['página-principal', 'acceso-denegado', 'búsqueda', 'perfil', 'página-no-encontrada', 'emapa-huaral-deleted'].includes(dir)) return;
  const contentDir = path.join(webPagesDir, dir, 'content-pages');
  if (!fs.existsSync(contentDir)) return;
  const htmlFiles = fs.readdirSync(contentDir).filter(f => f.endsWith('.copy.html'));
  if (htmlFiles.length === 0) return;
  
  const content = fs.readFileSync(path.join(contentDir, htmlFiles[0]), 'utf-8');
  
  // Extract Title
  let titleMatch = content.match(/<h1[^>]*style="color:\s*var\(--navy\)[^"]*"[^>]*>(.*?)<\/h1>/i) ||
                   content.match(/<h1[^>]*>(.*?)<\/h1>/i) ||
                   content.match(/<title>Panel Interactivo:\s*Ficha Regulatoria\s*(.*?)\s*[0-9]{4}/i);
  let title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : dir;
  
  // Extract Period from Stat Card
  let periodCardMatch = content.match(/Periodo Regulatorio<\/h3>[\s\S]*?<p[^>]*class="[^"]*text-3xl[^"]*"[^>]*>(.*?)<\/p>[\s\S]*?<p[^>]*class="[^"]*text-xs[^"]*"[^>]*>(.*?)<\/p>/i);
  let yearsCount = periodCardMatch ? periodCardMatch[1].trim() : '';
  let periodYears = periodCardMatch ? periodCardMatch[2].trim() : '';
  
  // Extract Resolution
  let resMatch = content.match(/(Resolución de Consejo Directivo Nº\s*[^\n\.<]+|Resolución de Consejo Directivo N°\s*[^\n\.<]+)/i);
  let resolution = resMatch ? resMatch[1].trim() : 'N/D';

  auditResults.push({
    slug: dir,
    title,
    yearsCount,
    periodYears,
    resolution
  });
});

auditResults.sort((a, b) => a.title.localeCompare(b.title));

console.log(`Audited ${auditResults.length} EPS fact sheets.\n`);
console.log(JSON.stringify(auditResults, null, 2));
