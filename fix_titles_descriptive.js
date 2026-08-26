const fs = require('fs');
const path = require('path');

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

files.forEach(filepath => {
    let content = fs.readFileSync(filepath, 'utf-8');
    
    // Replace titles with descriptive ones
    let newContent = content.replace(
        /title="Reproducir Audio"/g,
        'title="Reproducir un resumen en audio con los puntos clave del estudio"'
    );
    
    newContent = newContent.replace(
        /title="Reporte informativo"/g,
        'title="Abrir en una nueva pestaña el reporte interactivo completo de la EPS"'
    );
    
    newContent = newContent.replace(
        /title="Descargar PDF"/g,
        'title="Descargar el documento oficial del estudio en formato PDF para su lectura"'
    );
    
    if(newContent !== content) {
        fs.writeFileSync(filepath, newContent, 'utf-8');
        changedFiles++;
    }
});

console.log(`Processed ${files.length} files. Changed ${changedFiles} files.`);
