const fs = require('fs');
let html = fs.readFileSync('sunass-plus---sunassplus/web-pages/sedalib/content-pages/SEDALIB.es-ES.webpage.copy.html', 'utf8');

// Header and Title
html = html.replace(/EMAPA HUARAL S.A\./g, 'SEDALIB S.A.');
html = html.replace(/Emapa Huaral/g, 'SEDALIB');
html = html.replace(/EMAPA Huaral/g, 'SEDALIB');
html = html.replace(/Huaral/g, 'Trujillo');

// Context
html = html.replace(
  /<p class="text-slate-600 leading-relaxed mb-6">[\s\S]*?<\/p>/,
  '<p class="text-slate-600 leading-relaxed mb-6">El <strong>Servicio de Agua Potable y Alcantarillado de La Libertad S.A. (SEDALIB S.A.)</strong> opera en varias provincias y distritos de la región La Libertad. Enfrenta problemáticas críticas como alta turbidez desde el río Santa (200 veces los LMP), deforestación, minería en sus cuencas, fallas estructurales en reservorios estratégicos (Los Gemelos, Moche) y baja continuidad en sectores vulnerables (3-4 h/d).</p>'
);

// Periodo Regulatorio
html = html.replace(/2025-2027/g, '2021-2026');

// Mejoras Esperadas
html = html.replace(
  /<ul class="space-y-3 text-slate-600 text-sm mb-6">[\s\S]*?<\/ul>/,
  `<ul class="space-y-3 text-slate-600 text-sm mb-6">
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Reducción del agua no facturada:</strong> Compromiso de reducir pérdidas a nivel EPS de 48% a 42%.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Sinceramiento comercial:</strong> Renovación de 93,235 medidores obsoletos en Trujillo Metropolitano.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Ampliación y mejora de continuidad:</strong> Incremento en sectores críticos de 3-4 horas a 10 horas/día.</span></li>
  </ul>`
);

// Poblacion
html = html.replace(/86,220/g, '1,133,195'); // inicio 
html = html.replace(/98,168/g, '1,235,951'); // final 

// Metas de Gestión (Gráficos)
html = html.replace(/const anFData = \[35, 29\];/, 'const anFData = [48, 42];');
html = html.replace(/const contData = \[18\.2, 19\];/, 'const contData = [10.72, 15]; // meta de hasta 19 en Trujillo, aprox prom final no disp.'); 
html = html.replace(/const microData = \[95, 98\];/, 'const microData = [80, 0]; // 0 means meta de número de medidores');
html = html.replace(/const presData = \[8\.5, 10\];/, 'const presData = [10.02, 0]; // 0 means ND final'); 

// Metas a Nivel de Localidad
html = html.replace(/<table class="data-table glass-card rounded-2xl overflow-hidden">[\s\S]*?<\/table>/, `<table class="data-table glass-card rounded-2xl overflow-hidden">
        <thead><tr><th>Localidad</th><th>Continuidad (h/d)</th><th>Presión (m.c.a.)</th><th>Micromedición (%)</th></tr></thead>
        <tbody>
          <tr><td>Trujillo Metropolitano</td><td>19.0</td><td>ND</td><td>Por metas físicas</td></tr>
          <tr><td>El Porvenir</td><td>10.0</td><td>ND</td><td>Por metas físicas</td></tr>
          <tr><td>Víctor Larco</td><td>16.0</td><td>ND</td><td>Por metas físicas</td></tr>
          <tr><td>Paiján</td><td>15.0</td><td>ND</td><td>Por metas físicas</td></tr>
          <tr><td>Moche</td><td>15.0</td><td>ND</td><td>Por metas físicas</td></tr>
        </tbody>
      </table>`);

// Brechas y Acceso
html = html.replace(/makeCoverageDonut\('covApChart', 83\.8\);/, "makeCoverageDonut('covApChart', 76.0);");
html = html.replace(/makeCoverageDonut\('covSaneamientoChart', 76\.7\);/, "makeCoverageDonut('covSaneamientoChart', 73.3);");

// Sostenibilidad
html = html.replace(/<p class="text-3xl font-bold mt-2">100%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Micromedición<\/p>/, '<p class="text-3xl font-bold mt-2">80.0%</p>\n<p class="text-xs text-slate-400 mt-1">Micromedición</p>');
html = html.replace(/<p class="text-3xl font-bold mt-2">75%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Catastro comercial<\/p>/, '<p class="text-3xl font-bold mt-2">ND</p>\n<p class="text-xs text-slate-400 mt-1">Catastro comercial</p>');

// Económico-Financiero
html = html.replace(/S\/ 4\.1 millones/g, 'S/ 108 325 245');
html = html.replace(/S\/ 448 240/g, 'S/ 6 611 947'); // Deuda FONAVI
html = html.replace(/62\.3%/g, '0.0%'); // Incremento acumulado fórmula base
html = html.replace(/6\.50%/g, '0.0%'); // Incremento año 1

// Inversiones
html = html.replace(/S\/ 13 642 987/g, 'S/ 344 226 517');
html = html.replace(/S\/ 12 415 790/g, 'S/ 325 589 869'); // Agua y saneamiento
html = html.replace(/S\/ 535 380/g, 'S/ 4 207 964'); // MRSE
html = html.replace(/S\/ 418 223/g, 'S/ 1 685 026'); // PCC
html = html.replace(/S\/ 273 593/g, 'S/ 12 743 657'); // GRD

html = html.replace(/data: \[6743600, 3951190, 1721000, 535380, 418223, 273593\]/, 'data: [0, 0, 325589869, 4207964, 1685026, 12743657]');

html = html.replace(/const projects = \[[\s\S]*?\];/, `const projects = [
  { name: "Mejoramiento parque de medidores y micromedición (Trujillo)", category: "Comercial", amount: 49773389, year: '2021-2026' },
  { name: "Mejoramiento batería de pozos (La Esperanza, F. Mora, El Porvenir)", category: "Producción", amount: 34171893, year: '2021-2026' },
  { name: "Mejoramiento y ampliación PTAR de Puerto Malabrigo", category: "Saneamiento", amount: 4640388, year: '2021-2026' }
];`);

// Tarifas
html = html.replace(/<p id="currentBill" class="text-2xl font-bold text-slate-600">S\/ 0\.00<\/p>/, '<p id="currentBill" class="text-2xl font-bold text-slate-600">S/ 63.19</p>');
html = html.replace(/<p id="newBill1" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill1" class="text-3xl font-bold text-cyan-700">S/ 63.19</p>');
html = html.replace(/<p id="newBill3" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill3" class="text-3xl font-bold text-cyan-700">S/ 63.19</p>');

fs.writeFileSync('sunass-plus---sunassplus/web-pages/sedalib/content-pages/SEDALIB.es-ES.webpage.copy.html', html, 'utf8');
console.log("Done");
