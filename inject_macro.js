const fs = require('fs');
const path = require('path');

// Mapeo exacto: nombre de EPS en el sistema → Macroregión
const epsMacroMap = {
  // Norte (9)
  "Unidad 002 Tumbes": "Norte",
  "EPS GRAU S.A.": "Norte",
  "EPSEL S.A.": "Norte",
  "SEDALIB S.A.": "Norte",
  "SEDACAJ S.A.": "Norte",
  "EPS MARAÑÓN S.A.": "Norte",
  "SEDACHIMBOTE S.A.": "Norte",
  "EPS CHAVIN S.A.": "Norte",
  "EPS AGUAS DE LIMA NORTE SA": "Norte",

  // Centro (11)
  "EPS SEDAM HUANCAYO S.A.": "Centro",
  "EPS MANTARO S.A.": "Centro",
  "EPS SELVA CENTRAL S.A.": "Centro",
  "EPS SIERRA CENTRAL S.R.L.": "Centro",
  "EMSAPA YAULI LA OROYA S.R.L.": "Centro",
  "EMAPA PASCO S.A.": "Centro",
  "EMAPA HVCA SA": "Centro",
  "EPS SEDA HUÁNUCO S.A.": "Centro",
  "EMUSAP ABANCAY S.A.": "Centro",
  "EMSAP CHANKA S.A.": "Centro",
  "SEDA AYACUCHO S.A.": "Centro",

  // Sur (18)
  "EMAPA CAÑETE S.A.": "Sur",
  "SEDACUSCO S.A.": "Sur",
  "EMPSSAPAL S.A.": "Sur",
  "EPS EMAQ S.A.": "Sur",
  "EPS EMSAPA CALCA S.A.": "Sur",
  "EPS EMAPICA S.A.": "Sur",
  "EPS SEMAPACH S.A.": "Sur",
  "EMAPISCO S.A.": "Sur",
  "EMAPAVIGS S.A.": "Sur",
  "SEDAPAR S.A.": "Sur",
  "EPS TACNA S.A.": "Sur",
  "EPS MOQUEGUA S.A.": "Sur",
  "EPS ILO S.A": "Sur",
  "EMSAPUNO S.A.": "Sur",
  "SEDAJULIACA": "Sur",
  "EMAPA Y S.R.LTDA.": "Sur",
  "EPS NORPUNO": "Sur",
  "EPS AGUAS DEL ALTIPLANO S.R.L": "Sur",

  // Oriente (9)
  "EMAPA SAN MARTÍN S.A.": "Oriente",
  "EPS MOYOBAMBA S.A.": "Oriente",
  "EPS RIOJA S.A.": "Oriente",
  "EMUSAP S.A.": "Oriente",
  "EPSSMU S.A.": "Oriente",
  "EMAPAB S.A.": "Oriente",
  "SEDALORETO S.A.": "Oriente",
  "EMAPACOP SA": "Oriente",
  "EPS EMAPAT S.A.": "Oriente",

  // Central - Lima (3)
  "SEDAPAL S.A.": "Central (Lima)",
  "EMAPA HUARAL S.A.": "Central (Lima)",
  "EPS BARRANCA S.A.": "Central (Lima)"
};

// El nuevo select que va ENTRE el select de regiones y el buscador
const macroSelectHTML = `<select id="eps-macro-select" onchange="filterEpsCards()" class="w-full sm:w-auto pl-4 pr-8 py-2 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer font-medium text-slate-600 bg-white shadow-sm" style="appearance: none; background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%207.5L10%2012.5L15%207.5%22%20stroke%3D%22%2364748B%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E'); background-repeat: no-repeat; background-position: right 8px center; background-size: 16px;">
        <option value="">Todas las macroregiones</option>
        <option value="Norte">Macro Región Norte (9)</option>
        <option value="Centro">Macro Región Centro (11)</option>
        <option value="Sur">Macro Región Sur (18)</option>
        <option value="Oriente">Macro Región Oriente (9)</option>
        <option value="Central (Lima)">Macro Región Central - Lima (3)</option>
      </select>`;

// Nueva función filterEpsCards con soporte para macroregión
const newFilterCode = `function filterEpsCards() {
    var input = document.getElementById('eps-search-input');
    var query = normalizeText(input ? input.value : '');
    var select = document.getElementById('eps-region-select');
    var regionQuery = normalizeText(select ? select.value : '');
    var macroSelect = document.getElementById('eps-macro-select');
    var macroQuery = macroSelect ? macroSelect.value : '';
    
    var cards = document.querySelectorAll('.glass-card[data-search]');
    var visibleCount = 0;

    cards.forEach(function (card) {
      var haystack = normalizeText(card.getAttribute('data-search'));
      var macro = card.getAttribute('data-macro') || '';
      var matchSearch = query === '' || haystack.indexOf(query) !== -1;
      var matchRegion = regionQuery === '' || haystack.indexOf(regionQuery) !== -1;
      var matchMacro = macroQuery === '' || macro === macroQuery;
      var matches = matchSearch && matchRegion && matchMacro;
      card.style.display = matches ? '' : 'none';
      if (matches) visibleCount++;
    });

    var resultsEl = document.getElementById('results-count');
    if (resultsEl) resultsEl.textContent = visibleCount + (visibleCount === 1 ? ' resultado' : ' resultados');

    var noResultsEl = document.getElementById('no-results-message');
    if (noResultsEl) noResultsEl.style.display = visibleCount === 0 ? '' : 'none';
  }`;

const searchDir = path.join(__dirname, 'sunass-plus---sunassplus', 'web-pages');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.html')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(searchDir);
let changedFiles = 0;
let cardMatches = 0;

files.forEach(filepath => {
    let content = fs.readFileSync(filepath, 'utf-8');
    let original = content;

    // 1) Inyectar data-macro en cada tarjeta glass-card
    for (const [epsName, macro] of Object.entries(epsMacroMap)) {
        // Buscar tarjetas que contengan el nombre de la EPS y no tengan ya data-macro
        const escapedName = epsName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(
            '(<div class="glass-card[^"]*"\\s+data-search="[^"]*' + escapedName + '[^"]*")(?!.*data-macro)',
            'g'
        );
        const before = content;
        content = content.replace(regex, '$1 data-macro="' + macro + '"');
        if (content !== before) cardMatches++;
    }

    // 2) Inyectar el nuevo <select> entre el </select> de regiones y el <div class="relative"> del buscador
    if (content.includes('id="eps-region-select"') && !content.includes('id="eps-macro-select"')) {
        content = content.replace(
            /(<\/select>\s*)(<div class="relative">)/,
            '$1' + macroSelectHTML + '\n      $2'
        );
    }

    // 3) Actualizar la función filterEpsCards
    if (content.includes('function filterEpsCards()') && !content.includes('eps-macro-select')) {
        content = content.replace(
            /function filterEpsCards\(\) \{[\s\S]*?if \(noResultsEl\) noResultsEl\.style\.display = visibleCount === 0 \? '' : 'none';\s*\}/,
            newFilterCode
        );
    }

    if (content !== original) {
        fs.writeFileSync(filepath, content, 'utf-8');
        changedFiles++;
    }
});

console.log(`Processed ${files.length} files. Changed ${changedFiles} files. Matched ${cardMatches} cards.`);
