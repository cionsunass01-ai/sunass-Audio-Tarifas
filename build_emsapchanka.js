const fs = require('fs');
let html = fs.readFileSync('sunass-plus---sunassplus/web-pages/emsapchanka/content-pages/EMSAPCHANKA.es-ES.webpage.copy.html', 'utf8');

// Header and Title
html = html.replace(/EMAPA HUARAL S.A\./g, 'EPS EMSAP CHANKA S.A.');
html = html.replace(/Emapa Huaral/g, 'EMSAP CHANKA');
html = html.replace(/EMAPA Huaral/g, 'EMSAP CHANKA');
html = html.replace(/Huaral/g, 'Andahuaylas');

// Context
html = html.replace(
  /<p class="text-slate-600 leading-relaxed mb-6">[\s\S]*?<\/p>/,
  '<p class="text-slate-600 leading-relaxed mb-6">La <strong>EMSAP CHANKA S.A.</strong> opera los servicios de saneamiento en el distrito de Andahuaylas, Apurímac. Presenta un bajo nivel de continuidad y presiones críticas en varios sectores, así como la grave presencia de arsénico (0.032 mg/l) en la captación "Plaza de Armas", superando límites permisibles. Adicionalmente, carece de una Planta de Tratamiento de Aguas Residuales (PTAR), lo que genera descargas directas al río Chumbao, operando además con un 29% de medidores que excedieron su vida útil.</p>'
);

// Periodo Regulatorio
html = html.replace(/2025-2027/g, '2023-2027');

// Mejoras Esperadas
html = html.replace(
  /<ul class="space-y-3 text-slate-600 text-sm mb-6">[\s\S]*?<\/ul>/,
  `<ul class="space-y-3 text-slate-600 text-sm mb-6">
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Continuidad y Salud Pública:</strong> Construcción de nueva captación y bombeo para lograr 19 h/día y cerrar la fuente contaminada por arsénico.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Micromedición:</strong> Renovar e instalar nuevos medidores para sincerar el consumo y controlar el 22% de agua no facturada actual.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Protección de Fuentes (MRSE):</strong> Implementación del Mecanismo de Retribución por Servicios Ecosistémicos en la cuenca Churrubamba.</span></li>
  </ul>`
);

// Poblacion
html = html.replace(/86,220/g, '22,879'); // Población servida AP (Año 5)
html = html.replace(/98,168/g, '28,932'); // Población servida ALC (Año 5)

// Metas de Gestión (Gráficos)
html = html.replace(/const anFData = \[35, 29\];/, 'const anFData = [22.0, 22.0]; // ND, se mantiene la base');
html = html.replace(/const contData = \[18\.2, 19\];/, 'const contData = [18.5, 19.0]; // Andahuaylas'); 
html = html.replace(/const microData = \[95, 98\];/, 'const microData = [98.07, 98.07]; // Andahuaylas, ND meta directa %');
html = html.replace(/const presData = \[8\.5, 10\];/, 'const presData = [27.8, 27.0]; // Andahuaylas'); 

// Metas a Nivel de Localidad
html = html.replace(/<table class="data-table glass-card rounded-2xl overflow-hidden">[\s\S]*?<\/table>/, `<table class="data-table glass-card rounded-2xl overflow-hidden">
        <thead><tr><th>Localidad</th><th>Continuidad (h/d)</th><th>Presión (m.c.a.)</th><th>Micromedición (%)</th></tr></thead>
        <tbody>
          <tr><td>Andahuaylas</td><td>19.0</td><td>27.0</td><td>ND (Renovaciones)</td></tr>
        </tbody>
      </table>`);

// Brechas y Acceso
html = html.replace(/makeCoverageDonut\('covApChart', 83\.8\);/, "makeCoverageDonut('covApChart', 46.7);"); // base comercial urbana
html = html.replace(/makeCoverageDonut\('covSaneamientoChart', 76\.7\);/, "makeCoverageDonut('covSaneamientoChart', 61.0);"); // base comercial urbana

// Sostenibilidad
html = html.replace(/<p class="text-3xl font-bold mt-2">100%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Micromedición<\/p>/, '<p class="text-3xl font-bold mt-2">98%</p>\n<p class="text-xs text-slate-400 mt-1">Micromedición (Base)</p>');
html = html.replace(/<p class="text-3xl font-bold mt-2">75%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Catastro comercial<\/p>/, '<p class="text-3xl font-bold mt-2">100%</p>\n<p class="text-xs text-slate-400 mt-1">Catastro (Año 5)</p>');

// Económico-Financiero
html = html.replace(/S\/ 4\.1 millones/g, 'S/ 511 084'); // Saldo inicial total reservas aprox
html = html.replace(/S\/ 448 240/g, 'S/ 0'); // Deuda nueva
html = html.replace(/62\.3%/g, '16.1%'); // Incremento nominal simple acumulado fórmula
html = html.replace(/6\.50%/g, '0.0%'); // Incremento año 1

// Inversiones
html = html.replace(/S\/ 13 642 987/g, 'S/ 3 582 554'); // Total unificado
html = html.replace(/S\/ 12 415 790/g, 'S/ 3 299 636'); // Agua y saneamiento con fondo
html = html.replace(/S\/ 535 380/g, 'S/ 189 418'); // MRSE
html = html.replace(/S\/ 418 223/g, 'S/ 25 000'); // PCC PAS
html = html.replace(/S\/ 273 593/g, 'S/ 68 500'); // GRD

html = html.replace(/data: \[6743600, 3951190, 1721000, 535380, 418223, 273593\]/, 'data: [0, 0, 3299636, 189418, 25000, 68500]');

html = html.replace(/const projects = \[[\s\S]*?\];/, `const projects = [
  { name: "Línea impulsión, captación y bombeo Andahuaylas", category: "Obras", amount: 743750, year: '2023-2027' },
  { name: "Reparación red alcantarillado C.P. Villa Salinas", category: "Obras", amount: 508474, year: '2023-2027' },
  { name: "Construcción redes secundarias alcantarillado", category: "Obras", amount: 396270, year: '2023-2027' }
];`);

// Tarifas
html = html.replace(/<p id="currentBill" class="text-2xl font-bold text-slate-600">S\/ 0\.00<\/p>/, '<p id="currentBill" class="text-2xl font-bold text-slate-600">S/ 17.91</p>'); // Ref base sin IGV
html = html.replace(/<p id="newBill1" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill1" class="text-3xl font-bold text-cyan-700">S/ 18.12</p>'); // Ref año 1 sin IGV
html = html.replace(/<p id="newBill3" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill3" class="text-3xl font-bold text-cyan-700">S/ 19.62</p>'); // Ref año 3 sin IGV

fs.writeFileSync('sunass-plus---sunassplus/web-pages/emsapchanka/content-pages/EMSAPCHANKA.es-ES.webpage.copy.html', html, 'utf8');
console.log("Done");
