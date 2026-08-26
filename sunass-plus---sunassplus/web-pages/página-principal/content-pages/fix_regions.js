const fs = require('fs');
const path = 'Página-principal.es-ES.webpage.copy.html';
let html = fs.readFileSync(path, 'utf8');

const regionsMap = {
  'amazonas': ['emusap', 'emapab', 'epssmu'],
  'áncash': ['sedachimbote', 'chavin'],
  'apurímac': ['abancay', 'chanka'],
  'arequipa': ['sedapar'],
  'ayacucho': ['ayacucho'],
  'cajamarca': ['marañón', 'maranon', 'sedacaj'],
  'cusco': ['sedacusco', 'emaq', 'empssapal', 'calca'],
  'huancavelica': ['hvca'],
  'huánuco': ['huánuco', 'huanuco'],
  'ica': ['emapica', 'emapavigs', 'emapisco', 'semapach'],
  'junín': ['oroya', 'mantaro', 'huancayo', 'selva central', 'sierra central'],
  'la libertad': ['sedalib'],
  'lambayeque': ['epsel'],
  'lima': ['lima norte', 'barranca', 'huaral', 'cañete', 'canete', 'sedapal'],
  'loreto': ['sedaloreto'],
  'madre de dios': ['emapat'],
  'moquegua': ['moquegua', 'ilo'],
  'pasco': ['pasco'],
  'piura': ['grau'],
  'puno': ['emsapuno', 'sedajuliaca', 'emapa y', 'nor puno', 'altiplano'],
  'san martín': ['rioja', 'san martín', 'san martin', 'moyobamba'],
  'tacna': ['tacna'],
  'tumbes': ['tumbes'],
  'ucayali': ['emapacop']
};

let updated = 0;

html = html.replace(/<div class="glass-card[^>]+data-search="([^"]+)"[^>]*>[\s\S]*?<h3[^>]*>(.*?)<\/h3>/gi, (match, dataSearch, h3Text) => {
  const nameLower = h3Text.toLowerCase();
  let foundRegion = null;
  
  for (const [region, keywords] of Object.entries(regionsMap)) {
    if (keywords.some(k => nameLower.includes(k))) {
      foundRegion = region;
      break;
    }
  }

  if (foundRegion) {
    const normalizedRegion = foundRegion.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const currentDataSearch = dataSearch.toLowerCase();
    
    if (!currentDataSearch.includes(normalizedRegion)) {
      const newDataSearch = dataSearch + ' ' + normalizedRegion;
      match = match.replace(`data-search="${dataSearch}"`, `data-search="${newDataSearch}"`);
      updated++;
    }
  } else {
    console.log('No region found for:', h3Text);
  }
  
  return match;
});

console.log('Updated cards:', updated);
fs.writeFileSync('Página-principal.es-ES.webpage.copy.html', html, 'utf8');
