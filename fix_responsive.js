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

files.forEach(filepath => {
    let content = fs.readFileSync(filepath, 'utf-8');

    // Fix header layout
    content = content.replace(
        '<header class="header-bg px-8 py-4 flex items-center justify-between sticky top-0 z-50">',
        '<header class="header-bg px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between sticky top-0 z-50 gap-4 md:gap-0">'
    );

    // Fix search container in header
    content = content.replace(
        '<div class="flex items-center space-x-3 relative">',
        '<div class="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 relative w-full md:w-auto">'
    );

    // Fix select width on mobile
    content = content.replace(
        'class="pl-4 pr-8 py-2 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer font-medium text-slate-600 bg-white shadow-sm"',
        'class="w-full sm:w-auto pl-4 pr-8 py-2 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer font-medium text-slate-600 bg-white shadow-sm"'
    );

    // Fix input width on mobile
    content = content.replace(
        'class="pl-10 pr-4 py-2 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-56 transition-all shadow-sm"',
        'class="w-full sm:w-56 pl-10 pr-4 py-2 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"'
    );

    // Fix title row layout
    content = content.replace(
        '<div class="flex items-center justify-between mb-4">',
        '<div class="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">'
    );
    
    // Fix card flex layout
    content = content.replace(
        /<div class="flex items-center justify-between">/g,
        '<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">'
    );

    // Fix downloads and duration text wrap
    content = content.replace(
        /<span class="text-sm text-slate-500 flex items-center">(<svg[^>]*>.*?<\/svg>)\s*<span id="downloads-/g,
        '<span class="text-sm text-slate-500 flex items-center whitespace-nowrap">$1 <span id="downloads-'
    );
    content = content.replace(
        /<span class="text-sm text-slate-500 flex items-center">(<svg[^>]*>.*?<\/svg>)\s*<span id="duration-/g,
        '<span class="text-sm text-slate-500 flex items-center whitespace-nowrap">$1 <span id="duration-'
    );

    fs.writeFileSync(filepath, content, 'utf-8');
});

console.log(`Processed ${files.length} files.`);
