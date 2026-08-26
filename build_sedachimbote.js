const fs = require('fs');
let html = fs.readFileSync('sunass-plus---sunassplus/web-pages/sedachimbote/content-pages/SEDACHIMBOTE.es-ES.webpage.copy.html', 'utf8');

// Header and Title
html = html.replace(/EMAPA HUARAL S.A\./g, 'SEDACHIMBOTE S.A.');
html = html.replace(/Emapa Huaral/g, 'SEDACHIMBOTE');
html = html.replace(/EMAPA Huaral/g, 'SEDACHIMBOTE');
html = html.replace(/Huaral/g, 'Chimbote');

// Context
html = html.replace(
  /<p class="text-slate-600 leading-relaxed mb-6">[\s\S]*?<\/p>/,
  '<p class="text-slate-600 leading-relaxed mb-6">La <strong>EPS SEDACHIMBOTE S.A.</strong> opera en la franja costera de la región Áncash (Chimbote, Casma, Huarmey). Enfrenta problemáticas operacionales severas, como sulfatos elevados en pozos, contaminación crítica con manganeso en Huarmey por minería, inoperatividad de su PTAR Pacaysito, y una bajísima continuidad (5-7 h/d) en sectores críticos de Chimbote.</p>'
);

// Periodo Regulatorio
html = html.replace(/2025-2027/g, '2023-2028');

// Mejoras Esperadas
html = html.replace(
  /<ul class="space-y-3 text-slate-600 text-sm mb-6">[\s\S]*?<\/ul>/,
  `<ul class="space-y-3 text-slate-600 text-sm mb-6">
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Cierre de brechas de micromedición:</strong> Meta del 98% de conexiones medidas en todas sus localidades.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Reducción de agua no facturada:</strong> Instalación y renovación masiva de medidores.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Modernización comercial:</strong> Implementación al 100% de catastros georreferenciados en el Año 3.</span></li>
  </ul>`
);

// Poblacion
html = html.replace(/86,220/g, '425,460'); // inicio 
html = html.replace(/98,168/g, '447,842'); // final 

// Metas de Gestión (Gráficos)
html = html.replace(/const anFData = \[35, 29\];/, 'const anFData = [44, 42]; // -2% desde Chimbote baseline');
html = html.replace(/const contData = \[18\.2, 19\];/, 'const contData = [11.83, 11]; // 11 es meta aprox Chimbote'); 
html = html.replace(/const microData = \[95, 98\];/, 'const microData = [66.8, 98]; // Chimbote base, 98% meta');
html = html.replace(/const presData = \[8\.5, 10\];/, 'const presData = [16.56, 15]; // Rango 15-50'); 

// Metas a Nivel de Localidad
html = html.replace(/<table class="data-table glass-card rounded-2xl overflow-hidden">[\s\S]*?<\/table>/, `<table class="data-table glass-card rounded-2xl overflow-hidden">
        <thead><tr><th>Localidad</th><th>Continuidad (h/d)</th><th>Presión (m.c.a.)</th><th>Micromedición (%)</th></tr></thead>
        <tbody>
          <tr><td>Chimbote</td><td>&ge; 11.0</td><td>15 a 50</td><td>98.0</td></tr>
          <tr><td>Casma</td><td>&ge; 7.0</td><td>6 a 50</td><td>98.0</td></tr>
          <tr><td>Huarmey</td><td>&ge; 9.0</td><td>17 a 50</td><td>98.0</td></tr>
        </tbody>
      </table>`);

// Brechas y Acceso
html = html.replace(/makeCoverageDonut\('covApChart', 83\.8\);/, "makeCoverageDonut('covApChart', 72.9);");
html = html.replace(/makeCoverageDonut\('covSaneamientoChart', 76\.7\);/, "makeCoverageDonut('covSaneamientoChart', 69.0);");

// Sostenibilidad
html = html.replace(/<p class="text-3xl font-bold mt-2">100%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Micromedición<\/p>/, '<p class="text-3xl font-bold mt-2">66.8%</p>\n<p class="text-xs text-slate-400 mt-1">Micromedición (Chimbote)</p>');
html = html.replace(/<p class="text-3xl font-bold mt-2">75%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Catastro comercial<\/p>/, '<p class="text-3xl font-bold mt-2">100%</p>\n<p class="text-xs text-slate-400 mt-1">Catastro (Meta Año 3)</p>');

// Económico-Financiero
html = html.replace(/S\/ 4\.1 millones/g, 'S/ 13 480 619');
html = html.replace(/S\/ 448 240/g, 'S/ 5 098 420'); // Deuda FONAVI
html = html.replace(/62\.3%/g, '15.1%'); // Incremento acumulado
html = html.replace(/6\.50%/g, '0.0%'); // Incremento año 1

// Inversiones
html = html.replace(/S\/ 13 642 987/g, 'S/ 55 042 407');
html = html.replace(/S\/ 12 415 790/g, 'S/ 48 524 461'); // Agua y saneamiento
html = html.replace(/S\/ 535 380/g, 'S/ 2 471 102'); // MRSE
html = html.replace(/S\/ 418 223/g, 'S/ 1 944 400'); // PCC
html = html.replace(/S\/ 273 593/g, 'S/ 2 102 445'); // GRD

html = html.replace(/data: \[6743600, 3951190, 1721000, 535380, 418223, 273593\]/, 'data: [0, 0, 48524461, 2471102, 1944400, 2102445]');

html = html.replace(/const projects = \[[\s\S]*?\];/, `const projects = [
  { name: "Instalación de micromedidores por renovación en Chimbote", category: "Comercial", amount: 11233654, year: '2023-2028' },
  { name: "Línea de impulsión del pozo N° 4 al reservorio R-IV", category: "Producción", amount: 4440109, year: '2023-2028' },
  { name: "Creación del pozo tubular N° 8 en Casma", category: "Producción", amount: 2152914, year: '2023-2028' }
];`);

// Tarifas
html = html.replace(/<p id="currentBill" class="text-2xl font-bold text-slate-600">S\/ 0\.00<\/p>/, '<p id="currentBill" class="text-2xl font-bold text-slate-600">S/ 28.37</p>');
html = html.replace(/<p id="newBill1" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill1" class="text-3xl font-bold text-cyan-700">S/ 28.90</p>');
html = html.replace(/<p id="newBill3" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill3" class="text-3xl font-bold text-cyan-700">S/ 31.21</p>');

fs.writeFileSync('sunass-plus---sunassplus/web-pages/sedachimbote/content-pages/SEDACHIMBOTE.es-ES.webpage.copy.html', html, 'utf8');
console.log("Done");
