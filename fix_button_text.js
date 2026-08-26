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
    
    // Replace "Ver estudio" with "Reporte informativo"
    let newContent = content.replace(
        /Ver estudio/g,
        'Reporte informativo'
    );
    
    if(newContent !== content) {
        fs.writeFileSync(filepath, newContent, 'utf-8');
        changedFiles++;
    }
});

console.log(`Processed ${files.length} files. Changed ${changedFiles} files.`);
