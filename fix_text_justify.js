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
    let newContent = content.replace(
        /class="mt-4 pt-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed"/g,
        'class="mt-4 pt-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed text-justify"'
    );
    
    // In case some were already modified with text-justify or had slightly different spacing
    if(newContent !== content) {
        fs.writeFileSync(filepath, newContent, 'utf-8');
        changedFiles++;
    }
});

console.log(`Processed ${files.length} files. Changed ${changedFiles} files.`);
