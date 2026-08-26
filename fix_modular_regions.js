const fs = require('fs');
const path = require('path');

const emapaY = path.join(__dirname, 'eps', 'EMAPA-Y', 'info.json');
if (fs.existsSync(emapaY)) {
  const data = JSON.parse(fs.readFileSync(emapaY, 'utf-8'));
  data.region = 'Puno';
  data.macroregion = 'Sur';
  fs.writeFileSync(emapaY, JSON.stringify(data, null, 2), 'utf-8');
}

const emusapAbancay = path.join(__dirname, 'eps', 'emusap-abancay', 'info.json');
if (fs.existsSync(emusapAbancay)) {
  const data = JSON.parse(fs.readFileSync(emusapAbancay, 'utf-8'));
  data.region = 'Apurímac';
  data.macroregion = 'Sur';
  fs.writeFileSync(emusapAbancay, JSON.stringify(data, null, 2), 'utf-8');
}

console.log('✅ Correcciones aplicadas a EMAPA-Y y EMUSAP Abancay');
