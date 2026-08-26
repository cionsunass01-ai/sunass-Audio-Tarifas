const fs = require('fs');
const path = require('path');

const EPS_ROOT = path.join(__dirname, 'eps');

console.log('🔍 Leyendo carpetas modulares de EPS en:', EPS_ROOT);

if (fs.existsSync(EPS_ROOT)) {
  const folders = fs.readdirSync(EPS_ROOT);
  folders.forEach(folder => {
    const folderPath = path.join(EPS_ROOT, folder);
    if (!fs.statSync(folderPath).isDirectory()) return;

    const infoJsonPath = path.join(folderPath, 'info.json');
    const htmlPath = path.join(folderPath, `${folder}.html`);

    if (fs.existsSync(infoJsonPath)) {
      const info = JSON.parse(fs.readFileSync(infoJsonPath, 'utf-8'));
      console.log(`\n📌 EPS detectada en carpeta: ${folder}`);
      console.log(`   • Nombre: ${info.nombre}`);
      console.log(`   • Periodo Oficial: ${info.periodo}`);
      console.log(`   • Región / Macro: ${info.region} (${info.macroregion})`);
      console.log(`   • Resumen: ${info.resumen.substring(0, 80)}...`);
      console.log(`   • Archivo HTML propio: ${fs.existsSync(htmlPath) ? '✅ Existe (' + fs.statSync(htmlPath).size + ' bytes)' : '❌ No encontrado'}`);
    }
  });
}
