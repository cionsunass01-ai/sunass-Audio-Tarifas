const fs = require('fs');
const path = require('path');

const MAIN_PAGE_PATH = path.join(__dirname, 'sunass-plus---sunassplus', 'web-pages', 'página-principal', 'content-pages', 'Página-principal.es-ES.webpage.copy.html');
const content = fs.readFileSync(MAIN_PAGE_PATH, 'utf-8');

// Match each glass-card
const cardRegex = /<div class="glass-card[^"]*"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g;

// Let's parse all cards and their summary text to get the 100% exact period
const cards = [];
const cardBlocks = content.split('<!-- Tarjeta ');

cardBlocks.slice(1).forEach((block, idx) => {
  const titleMatch = block.match(/<h3[^>]*>(.*?)<\/h3>/i);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : `Tarjeta ${idx + 1}`;
  
  const summaryMatch = block.match(/<div id="summary-[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  const summaryText = summaryMatch ? summaryMatch[1].replace(/<[^>]+>/g, '').trim() : '';
  
  // Extract period from summary text: e.g. "estudio tarifario 2023-2027", "periodo regulatorio 2020-2025", "2025-2027"
  let periodMatch = summaryText.match(/(?:estudio tarifario|periodo regulatorio|plan tarifario|periodo|quinquenio)\s*(?:para\s*(?:el\s*)?)?([0-9]{4}\s*[-–]\s*[0-9]{4})/i) ||
                    summaryText.match(/([0-9]{4}\s*[-–]\s*[0-9]{4})/);
  
  const period = periodMatch ? periodMatch[1].replace(/\s+/g, ' ').replace('–', '-').trim() : 'N/D';
  
  // Also find EPS key from trackDownload('key') or id="summary-key"
  const keyMatch = block.match(/trackDownload\('([^']+)'\)/i) || block.match(/id="summary-([^"]+)"/i);
  const key = keyMatch ? keyMatch[1] : `key_${idx + 1}`;

  cards.push({
    index: idx + 1,
    key,
    title,
    period,
    summarySnippet: summaryText.substring(0, 100) + '...'
  });
});

console.log(`Extracted ${cards.length} cards.\n`);
console.table(cards.map(c => ({ Index: c.Index, Key: c.key, Title: c.title, Period: c.period })));
console.log(JSON.stringify(cards, null, 2));
