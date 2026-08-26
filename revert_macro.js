const fs = require('fs');
const path = require('path');

const oldFilterCode = `function filterEpsCards() {
    var input = document.getElementById('eps-search-input');
    var query = normalizeText(input ? input.value : '');
    var select = document.getElementById('eps-region-select');
    var regionQuery = normalizeText(select ? select.value : '');
    
    var cards = document.querySelectorAll('.glass-card[data-search]');
    var visibleCount = 0;

    cards.forEach(function (card) {
      var haystack = normalizeText(card.getAttribute('data-search'));
      var matchSearch = query === '' || haystack.indexOf(query) !== -1;
      var matchRegion = regionQuery === '' || haystack.indexOf(regionQuery) !== -1;
      var matches = matchSearch && matchRegion;
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

files.forEach(filepath => {
    let content = fs.readFileSync(filepath, 'utf-8');
    let original = content;

    // Remove data-macro attributes
    content = content.replace(/ data-macro="[^"]+"/g, '');

    // Remove eps-macro-select
    content = content.replace(
        /<select id="eps-macro-select"[\s\S]*?<\/select>\s*/,
        ''
    );

    // Revert filterEpsCards function
    if (content.includes('var macroSelect = document.getElementById(\'eps-macro-select\');')) {
        content = content.replace(
            /function filterEpsCards\(\) \{[\s\S]*?if \(noResultsEl\) noResultsEl\.style\.display = visibleCount === 0 \? '' : 'none';\s*\}/,
            oldFilterCode
        );
    }

    if(content !== original) {
        fs.writeFileSync(filepath, content, 'utf-8');
        changedFiles++;
    }
});

console.log('Processed', files.length, 'files. Reverted', changedFiles, 'files.');
