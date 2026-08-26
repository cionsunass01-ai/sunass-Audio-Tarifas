const fs = require('fs');
const path = require('path');

const distIndexPath = path.join(__dirname, 'dist', 'index.html');
const htmlSource = fs.readFileSync(distIndexPath, 'utf-8');

const epsDir = path.join(__dirname, 'eps');
if (!fs.existsSync(epsDir)) {
  fs.mkdirSync(epsDir, { recursive: true });
}

// Split by <!-- Tarjeta
const cardChunks = htmlSource.split(/<!-- Tarjeta \d+ -->/);

console.log(`Encontrados ${cardChunks.length - 1} bloques de tarjetas.`);

let count = 0;

for (let i = 1; i < cardChunks.length; i++) {
  const cardContent = cardChunks[i];

  // Extract search and macro
  const macroMatch = cardContent.match(/data-macro="([^"]+)"/);
  const macro = macroMatch ? macroMatch[1] : '';

  // Extract name
  const nameMatch = cardContent.match(/<h3 class="text-lg font-bold"[^>]*>([\s\S]*?)<\/h3>/);
  let name = nameMatch ? nameMatch[1].trim() : '';

  // Extract period badge
  const periodMatch = cardContent.match(/Periodo\s+(\d{4}\s*-\s*\d{4})/i);
  const period = periodMatch ? periodMatch[1].replace(/\s+/g, ' ') : '';

  // Extract logo url
  const imgMatch = cardContent.match(/<img\s+src="([^"]+)"/);
  const logoUrl = imgMatch ? imgMatch[1] : '';

  // Extract summary
  const summaryMatch = cardContent.match(/<div id="summary-[^"]*" class="[^"]*">\s*<p class="[^"]*">([\s\S]*?)<\/p>/);
  const resumen = summaryMatch ? summaryMatch[1].trim() : '';

  // Extract audio url
  const audioMatch = cardContent.match(/playAudio\('([^']+)'/);
  const audioUrl = audioMatch ? audioMatch[1] : '';

  // Extract report link & slug
  const reportMatch = cardContent.match(/href="\.\/([^"]+\.html)"/);
  const htmlFile = reportMatch ? reportMatch[1] : '';
  const slug = htmlFile ? htmlFile.replace(/\.html$/, '') : `eps-${i}`;

  // Extract PDF download link and key
  const pdfMatch = cardContent.match(/href="([^"]+)"[^>]*download[^>]*trackDownload\('([^']+)'\)/) || cardContent.match(/href="([^"]+)"[^>]*trackDownload\('([^']+)'\)/);
  const pdfUrl = pdfMatch ? pdfMatch[1] : '';
  const key = pdfMatch ? pdfMatch[2] : slug.toLowerCase();

  // Determine Region from slug/name mapping or HTML
  let region = '';
  if (/Huaral/i.test(name) || /Barranca/i.test(name) || /SEDAPAL/i.test(name) || /Cañete/i.test(name) || /Lima Norte/i.test(name)) region = 'Lima';
  else if (/HVCA|Huancavelica/i.test(name)) region = 'Huancavelica';
  else if (/EMAPACOP|Ucayali/i.test(name)) region = 'Ucayali';
  else if (/Puno|SEDAJULIACA|EMAPA-Y|Altiplano|EMSAPUNO|NOR PUNO/i.test(name)) region = 'Puno';
  else if (/Junín|Sierra Central|Yauli|Mantaro|SEDAM|Selva Central/i.test(name)) region = 'Junín';
  else if (/Cusco|Calca|SEDACUSCO|EMAQ|EMPSSAPAL/i.test(name)) region = 'Cusco';
  else if (/Lambayeque|EPSEL/i.test(name)) region = 'Lambayeque';
  else if (/San Martín|Rioja|Moyobamba/i.test(name)) region = 'San Martín';
  else if (/Pasco/i.test(name)) region = 'Pasco';
  else if (/Cajamarca|SEDACAJ|Marañón/i.test(name)) region = 'Cajamarca';
  else if (/Moquegua|Ilo/i.test(name)) region = 'Moquegua';
  else if (/Tumbes/i.test(name)) region = 'Tumbes';
  else if (/Piura|GRAU/i.test(name)) region = 'Piura';
  else if (/La Libertad|SEDALIB/i.test(name)) region = 'La Libertad';
  else if (/Áncash|Chimbote|Chavin/i.test(name)) region = 'Áncash';
  else if (/Ayacucho/i.test(name)) region = 'Ayacucho';
  else if (/Ica|EMAPICA|EMAPAVIGS|EMAPISCO|SEMAPACH/i.test(name)) region = 'Ica';
  else if (/Amazonas|EMUSAP|EMAPAB|EPSSMU/i.test(name)) region = 'Amazonas';
  else if (/Loreto|SEDALORETO/i.test(name)) region = 'Loreto';
  else if (/Huánuco/i.test(name)) region = 'Huánuco';
  else if (/Madre de Dios|EMAPAT/i.test(name)) region = 'Madre de Dios';
  else if (/Apurímac|Abancay|Chanka/i.test(name)) region = 'Apurímac';
  else if (/Arequipa|SEDAPAR/i.test(name)) region = 'Arequipa';
  else if (/Tacna/i.test(name)) region = 'Tacna';

  count++;
  const folderPath = path.join(epsDir, slug);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const info = {
    key: key,
    slug: slug,
    nombre: name,
    region: region,
    macroregion: macro,
    periodo: period,
    resumen: resumen,
    html_archivo: `${slug}.html`,
    audio_url: audioUrl,
    pdf_url: pdfUrl,
    logo_url: logoUrl
  };

  fs.writeFileSync(path.join(folderPath, 'info.json'), JSON.stringify(info, null, 2), 'utf-8');

  // Copy HTML file if exists
  const srcDistHtml = path.join(__dirname, 'dist', `${slug}.html`);
  const destHtml = path.join(folderPath, `${slug}.html`);
  if (fs.existsSync(srcDistHtml)) {
    fs.copyFileSync(srcDistHtml, destHtml);
  }

  console.log(`[${count}] Generada: eps/${slug} (${name} | Periodo: ${period} | Región: ${region})`);
}

console.log(`\n🎉 Total de carpetas generadas con info.json y HTML: ${count}`);
