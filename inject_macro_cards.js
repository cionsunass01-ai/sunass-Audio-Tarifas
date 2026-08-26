const fs = require('fs');
const path = require('path');

// Mapeo exacto: nombre de EPS tal como aparece en <h3> → Macroregión
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

    // 1) Inyectar data-macro en cada tarjeta.
    //    Las tarjetas tienen la forma: <div class="glass-card rounded-xl p-6" data-search="...">
    //    y dentro contienen <h3 ...>NOMBRE EPS</h3>.
    //    Estrategia: por cada EPS, buscar el <h3> con su nombre y luego retroceder
    //    hasta el div glass-card padre para añadir data-macro.
    for (const [epsName, macro] of Object.entries(epsMacroMap)) {
        const h3Marker = '>' + epsName + '</h3>';
        let searchStart = 0;
        while (true) {
            const h3Pos = content.indexOf(h3Marker, searchStart);
            if (h3Pos === -1) break;
            
            // Buscar hacia atrás el glass-card más cercano
            const cardMarker = 'class="glass-card';
            const cardPos = content.lastIndexOf(cardMarker, h3Pos);
            if (cardPos === -1) { searchStart = h3Pos + 1; continue; }
            
            // Verificar que no tenga ya data-macro entre cardPos y h3Pos
            const segment = content.substring(cardPos, h3Pos);
            if (segment.includes('data-macro=')) { searchStart = h3Pos + 1; continue; }
            
            // Buscar el cierre del tag de apertura del div (el primer > después de data-search="...")
            const dataSearchPos = content.indexOf('data-search="', cardPos);
            if (dataSearchPos === -1 || dataSearchPos > h3Pos) { searchStart = h3Pos + 1; continue; }
            
            // Encontrar el cierre de las comillas de data-search
            const dataSearchEnd = content.indexOf('"', dataSearchPos + 13); // después de data-search="
            if (dataSearchEnd === -1) { searchStart = h3Pos + 1; continue; }
            
            // Insertar data-macro justo después de cerrar data-search="..."
            const insertPos = dataSearchEnd + 1;
            content = content.substring(0, insertPos) + ' data-macro="' + macro + '"' + content.substring(insertPos);
            cardMatches++;
            searchStart = h3Pos + h3Marker.length + 30; // avanzar más allá de lo insertado
        }
    }

    if (content !== original) {
        fs.writeFileSync(filepath, content, 'utf-8');
        changedFiles++;
    }
});

console.log(`Processed ${files.length} files. Changed ${changedFiles} files. Tagged ${cardMatches} cards with data-macro.`);
