const fs = require('fs');
let html = fs.readFileSync('Página-principal.es-ES.webpage.copy.html', 'utf8');
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
  'puno': ['emsapuno', 'sedajuliaca', 'emapa y', 'nor puno', 'altiplano', 'norpuno'],
  'san martín': ['rioja', 'san martín', 'san martin', 'moyobamba'],
  'tacna': ['tacna'],
  'tumbes': ['tumbes'],
  'ucayali': ['emapacop']
};
let missing = 0;
const matches = [...html.matchAll(/<div class="glass-card[^>]+data-search="([^"]+)"[^>]*>[\s\S]*?<h3[^>]*>(.*?)<\/h3>/gi)];
matches.forEach(match => {
  const dataSearch = match[1];
  const h3Text = match[2];
  let foundRegion = null;
  for (const [region, keywords] of Object.entries(regionsMap)) {
    if (keywords.some(k => h3Text.toLowerCase().includes(k))) {
      foundRegion = region;
      break;
    }
  }
  if(foundRegion) {
     const normalizedRegion = foundRegion.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
     if(!dataSearch.includes(normalizedRegion)) {
         console.log('Missing region in data-search for:', h3Text, 'Expected:', normalizedRegion);
         missing++;
     }
  } else {
     console.log('No region defined in map for:', h3Text);
  }
});
console.log('Total missing:', missing);
