const fs = require('fs');
let html = fs.readFileSync('sunass-plus---sunassplus/web-pages/eps-grau/content-pages/EPS-Grau.es-ES.webpage.copy.html', 'utf8');

// Header and Title
html = html.replace(/EMAPA HUARAL S.A\./g, 'EPS GRAU S.A.');
html = html.replace(/Emapa Huaral/g, 'EPS GRAU');
html = html.replace(/EMAPA Huaral/g, 'EPS GRAU');
html = html.replace(/Huaral/g, 'Piura');

// Context
html = html.replace(
  /<p class="text-slate-600 leading-relaxed mb-6">[\s\S]*?<\/p>/,
  '<p class="text-slate-600 leading-relaxed mb-6">La <strong>EPS GRAU S.A.</strong> opera en 27 localidades de la región Piura y se encuentra en estado de insolvencia bajo régimen concursal (INDECOPI) desde el año 2000. Enfrenta una severa crisis de liquidez, alta vulnerabilidad climática (El Niño Costero), problemas de infraestructura (PTAP Sullana) y un elevado índice de medidores inoperativos.</p>'
);

// Periodo Regulatorio
html = html.replace(/2025-2027/g, '2022-2027');

// Mejoras Esperadas
html = html.replace(
  /<ul class="space-y-3 text-slate-600 text-sm mb-6">[\s\S]*?<\/ul>/,
  `<ul class="space-y-3 text-slate-600 text-sm mb-6">
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Recuperación comercial y micromedición:</strong> Instalación y renovación masiva de medidores inoperativos.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Saneamiento de conexiones:</strong> Recuperación de conexiones inactivas para reincorporarlas a la facturación.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Sostenibilidad y resiliencia:</strong> Mitigación de riesgos operativos (MRSE, GRD y Control de Calidad PCC).</span></li>
  </ul>`
);

// Poblacion
html = html.replace(/86,220/g, '951,778'); // inicio agua
html = html.replace(/98,168/g, '1,006,506'); // final agua

// Metas de Gestión (Gráficos)
html = html.replace(/const anFData = \[35, 29\];/, 'const anFData = [0, 0]; // ND');
html = html.replace(/const contData = \[18\.2, 19\];/, 'const contData = [12.64, 0]; // 0 means variable por localidad'); 
html = html.replace(/const microData = \[95, 98\];/, 'const microData = [46.2, 0]; // ND global');
html = html.replace(/const presData = \[8\.5, 10\];/, 'const presData = [9.79, 0]; // 0 means variable por localidad'); 

// Metas a Nivel de Localidad
html = html.replace(/<tbody><tr><td>Piura<\/td><td>19<\/td><td>10<\/td><td>98<\/td><\/tr><\/tbody>/, `<tbody>
  <tr><td>Piura</td><td>17.0</td><td>8</td><td>Por metas de N° medidores</td></tr>
  <tr><td>Sullana</td><td>11.0</td><td>12</td><td>Por metas de N° medidores</td></tr>
  <tr><td>Amotape</td><td>24.0</td><td>Variable</td><td>Por metas de N° medidores</td></tr>
  <tr><td>Catacaos</td><td>Variable</td><td>7</td><td>Por metas de N° medidores</td></tr>
</tbody>`); 
// note: because I copied Huaral, the original text is "Huaral", wait. Above I replaced 'Huaral' with 'Piura', so the html has 'Piura'. The exact original HTML had '<tr><td>Huaral</td>...'. With my replace above, it became '<tr><td>Piura</td>...'. 
// To be safe, I'll do a regex replace for the whole tbody:
html = html.replace(/<table class="data-table glass-card rounded-2xl overflow-hidden">[\s\S]*?<\/table>/, `<table class="data-table glass-card rounded-2xl overflow-hidden">
        <thead><tr><th>Localidad</th><th>Continuidad (h/d)</th><th>Presión (m.c.a.)</th><th>Micromedición (%)</th></tr></thead>
        <tbody>
          <tr><td>Piura</td><td>17.0</td><td>8</td><td>Fijado por volumen</td></tr>
          <tr><td>Sullana</td><td>11.0</td><td>12</td><td>Fijado por volumen</td></tr>
          <tr><td>Amotape</td><td>24.0</td><td>Variable</td><td>Fijado por volumen</td></tr>
          <tr><td>Catacaos</td><td>Variable</td><td>7</td><td>Fijado por volumen</td></tr>
          <tr><td>El Alto</td><td>2.0</td><td>8</td><td>Fijado por volumen</td></tr>
        </tbody>
      </table>`);


// Brechas y Acceso
html = html.replace(/makeCoverageDonut\('covApChart', 83\.8\);/, "makeCoverageDonut('covApChart', 84.55);");
html = html.replace(/makeCoverageDonut\('covSaneamientoChart', 76\.7\);/, "makeCoverageDonut('covSaneamientoChart', 73.78);");

// Sostenibilidad
html = html.replace(/<p class="text-3xl font-bold mt-2">100%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Micromedición<\/p>/, '<p class="text-3xl font-bold mt-2">46.2%</p>\n<p class="text-xs text-slate-400 mt-1">Micromedición (efectiva)</p>');
html = html.replace(/<p class="text-3xl font-bold mt-2">75%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Catastro comercial<\/p>/, '<p class="text-3xl font-bold mt-2">97.4%</p>\n<p class="text-xs text-slate-400 mt-1">Catastro comercial</p>');

// Económico-Financiero
html = html.replace(/S\/ 4\.1 millones/g, 'S/ 0');
html = html.replace(/S\/ 448 240/g, 'S/ 49 497 274'); // Deuda concursal + proveedores
html = html.replace(/62\.3%/g, '27.8%'); // Incremento acumulado
html = html.replace(/6\.50%/g, '4.5%'); // Incremento año 1

// Inversiones
html = html.replace(/S\/ 13 642 987/g, 'S/ 110 593 961');
html = html.replace(/S\/ 12 415 790/g, 'S/ 110 593 961');
html = html.replace(/S\/ 535 380/g, 'S/ 3 417 285');
html = html.replace(/S\/ 418 223/g, 'S/ 783 521'); // PCC
html = html.replace(/S\/ 273 593/g, 'S/ 13 172 066'); // GRD

html = html.replace(/data: \[6743600, 3951190, 1721000, 535380, 418223, 273593\]/, 'data: [0, 0, 110593961, 3417285, 783521, 13172066]');

html = html.replace(/const projects = \[[\s\S]*?\];/, `const projects = [
  { name: "Recuperación comercial de medidores (Piura, Castilla, 26 de Octubre)", category: "Comercial", amount: 14730985, year: '2022-2027' },
  { name: "Mejoramiento/ampliación AP sector operativo El Cortijo", category: "Ampliación", amount: 10123647, year: '2022-2027' },
  { name: "Mejoramiento/ampliación alcantarillado Cámara Las Dalias", category: "Saneamiento", amount: 7638000, year: '2022-2027' }
];`);

// Tarifas 
html = html.replace(/<p id="currentBill" class="text-2xl font-bold text-slate-600">S\/ 0\.00<\/p>/, '<p id="currentBill" class="text-2xl font-bold text-slate-600">S/ 22.65</p>');
html = html.replace(/<p id="newBill1" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill1" class="text-3xl font-bold text-cyan-700">S/ 24.10</p>');
html = html.replace(/<p id="newBill3" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill3" class="text-3xl font-bold text-cyan-700">S/ 26.65</p>'); // Proyectado con aumentos

fs.writeFileSync('sunass-plus---sunassplus/web-pages/eps-grau/content-pages/EPS-Grau.es-ES.webpage.copy.html', html, 'utf8');
console.log("Done");
