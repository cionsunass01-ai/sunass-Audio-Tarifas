const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const files = fs.readdirSync(rootDir).filter(f => f.startsWith('build_') && f.endsWith('.js'));

const buildPeriods = {};

files.forEach(file => {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf-8');
  // Match replacements like /2025-2027/g, '2020-2025'
  const match = content.match(/\/2025-2027\/g,\s*['"]([0-9]{4}\s*[-–]\s*[0-9]{4})['"]/);
  if (match) {
    const epsKey = file.replace('build_', '').replace('.js', '');
    buildPeriods[epsKey] = match[1];
  }
});

console.log('Periods from build scripts:');
console.log(JSON.stringify(buildPeriods, null, 2));
