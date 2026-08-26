const fs = require('fs');
const path = require('path');

const webPagesDir = path.join(__dirname, 'sunass-plus---sunassplus', 'web-pages');
const dirs = fs.readdirSync(webPagesDir);

const discrepancies = [];

dirs.forEach(dir => {
  if (['página-principal', 'acceso-denegado', 'búsqueda', 'perfil', 'página-no-encontrada', 'emapa-huaral-deleted'].includes(dir)) return;
  const contentDir = path.join(webPagesDir, dir, 'content-pages');
  if (!fs.existsSync(contentDir)) return;
  const htmlFiles = fs.readdirSync(contentDir).filter(f => f.endsWith('.copy.html'));
  if (htmlFiles.length === 0) return;
  
  const filePath = path.join(contentDir, htmlFiles[0]);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Check H2 Ficha Regulatoria
  const h2Match = content.match(/<h2[^>]*>Ficha Regulatoria\s*([^<]*)<\/h2>/i);
  const h2Period = h2Match ? h2Match[1].trim() : 'No H2';
  
  // Check stat card
  const statMatch = content.match(/Periodo Regulatorio<\/h3>[\s\S]*?<p[^>]*class="[^"]*text-xs[^"]*"[^>]*>([0-9]{4}\s*[-–]\s*[0-9]{4})<\/p>/i);
  const statPeriod = statMatch ? statMatch[1].trim() : 'No Stat';
  
  // Check Region in Localidad card
  const regMatch = content.match(/<p[^>]*class="[^"]*text-xs[^"]*"[^>]*>Región\s*([^<]*)<\/p>/i);
  const region = regMatch ? regMatch[1].trim() : 'No Region';
  
  discrepancies.push({
    slug: dir,
    file: htmlFiles[0],
    h2Period,
    statPeriod,
    region
  });
});

console.log(JSON.stringify(discrepancies, null, 2));
