const fs = require('fs');
let html = fs.readFileSync('sunass-plus---sunassplus/web-pages/eps-chavin/content-pages/EPS-Chavin.es-ES.webpage.copy.html', 'utf8');

// Header and Title
html = html.replace(/EMAPA HUARAL S.A\./g, 'EPS CHAVÍN S.A.');
html = html.replace(/Emapa Huaral/g, 'EPS CHAVÍN');
html = html.replace(/EMAPA Huaral/g, 'EPS CHAVÍN');
html = html.replace(/Huaral/g, 'Huaraz');

// Context
html = html.replace(
  /<p class="text-slate-600 leading-relaxed mb-6">[\s\S]*?<\/p>/,
  '<p class="text-slate-600 leading-relaxed mb-6">La <strong>EPS CHAVÍN S.A.</strong> brinda servicios en Huaraz, Aija, Chiquián y Caraz. Enfrenta problemáticas severas como bajísima micromedición en Aija (3.8%) y Chiquián (0.8%) con pérdidas que superan el 74%; ineficiencias financieras por convenios desventajosos en Huaraz (JASS Shancayán); y un déficit absoluto (100%) en el tratamiento de aguas residuales, realizando vertimientos directos a los ríos Santa y Pativilca sin procesar.</p>'
);

// Periodo Regulatorio
html = html.replace(/2025-2027/g, '2015-2020');

// Mejoras Esperadas
html = html.replace(
  /<ul class="space-y-3 text-slate-600 text-sm mb-6">[\s\S]*?<\/ul>/,
  `<ul class="space-y-3 text-slate-600 text-sm mb-6">
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Reducción de agua no facturada:</strong> Instalación masiva de medidores en Aija y Chiquián (cercana al 100%).</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Eficiencia hídrica en Huaraz:</strong> Recuperación del control del volumen entregado a la JASS Shancayán.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Modernización comercial:</strong> Pasar de 0% a 100% de digitalización de catastro en Huaraz y Caraz.</span></li>
  </ul>`
);

// Poblacion
html = html.replace(/86,220/g, '125,256'); // inicio 
html = html.replace(/98,168/g, '133,253'); // final 

// Metas de Gestión (Gráficos)
html = html.replace(/const anFData = \[35, 29\];/, 'const anFData = [0, 39]; // ND global, 39% meta en Huaraz');
html = html.replace(/const contData = \[18\.2, 19\];/, 'const contData = [23.7, 23.0]; // 23.7 prom a 23.0 meta Huaraz'); 
html = html.replace(/const microData = \[95, 98\];/, 'const microData = [85.6, 0]; // 85.6 base, ND meta global');
html = html.replace(/const presData = \[8\.5, 10\];/, 'const presData = [23.3, 10]; // 23.3 Huaraz base, 10 a 50 rango'); 

// Metas a Nivel de Localidad
html = html.replace(/<table class="data-table glass-card rounded-2xl overflow-hidden">[\s\S]*?<\/table>/, `<table class="data-table glass-card rounded-2xl overflow-hidden">
        <thead><tr><th>Localidad</th><th>Continuidad (h/d)</th><th>Presión (m.c.a.)</th><th>Micromedición (%)</th></tr></thead>
        <tbody>
          <tr><td>Huaraz</td><td>23.0</td><td>10 a 50</td><td>Meta física</td></tr>
          <tr><td>Aija</td><td>23.0</td><td>10 a 50</td><td>97.0</td></tr>
          <tr><td>Chiquián</td><td>24.0</td><td>10 a 50</td><td>100.0</td></tr>
          <tr><td>Caraz</td><td>24.0</td><td>10 a 50</td><td>Meta física</td></tr>
        </tbody>
      </table>`);

// Brechas y Acceso
html = html.replace(/makeCoverageDonut\('covApChart', 83\.8\);/, "makeCoverageDonut('covApChart', 74.0);");
html = html.replace(/makeCoverageDonut\('covSaneamientoChart', 76\.7\);/, "makeCoverageDonut('covSaneamientoChart', 65.3);");

// Sostenibilidad
html = html.replace(/<p class="text-3xl font-bold mt-2">100%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Micromedición<\/p>/, '<p class="text-3xl font-bold mt-2">85.6%</p>\n<p class="text-xs text-slate-400 mt-1">Micromedición EPS</p>');
html = html.replace(/<p class="text-3xl font-bold mt-2">75%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Catastro comercial<\/p>/, '<p class="text-3xl font-bold mt-2">100%</p>\n<p class="text-xs text-slate-400 mt-1">Catastro (Meta Huaraz/Caraz)</p>');

// Económico-Financiero
html = html.replace(/S\/ 4\.1 millones/g, 'S/ 3 969 272');
html = html.replace(/S\/ 448 240/g, 'S/ 3 490 000'); // Deudas
html = html.replace(/62\.3%/g, '27.1%'); // Incremento acumulado
html = html.replace(/6\.50%/g, '11.0%'); // Incremento año 1

// Inversiones
html = html.replace(/S\/ 13 642 987/g, 'S/ 152 327 014'); // Total con donaciones
html = html.replace(/S\/ 12 415 790/g, 'S/ 15 409 549'); // Programa base 
html = html.replace(/S\/ 535 380/g, 'S/ 0'); // MRSE
html = html.replace(/S\/ 418 223/g, 'S/ 0'); // PCC
html = html.replace(/S\/ 273 593/g, '2.4% Ing.'); // GRD 

html = html.replace(/data: \[6743600, 3951190, 1721000, 535380, 418223, 273593\]/, 'data: [0, 0, 15409549, 0, 0, 0]');

html = html.replace(/const projects = \[[\s\S]*?\];/, `const projects = [
  { name: "Construcción PTAR Huaraz (Donación MinVivienda)", category: "Saneamiento", amount: 48129507, year: '2015-2020' },
  { name: "Mejoramiento AP y Alcantarillado Caraz (Donación)", category: "Integral", amount: 36476971, year: '2015-2020' },
  { name: "Mejoramiento integral del sistema de AP de Chiquián", category: "Producción", amount: 28172673, year: '2015-2020' }
];`);

// Tarifas
html = html.replace(/<p id="currentBill" class="text-2xl font-bold text-slate-600">S\/ 0\.00<\/p>/, '<p id="currentBill" class="text-2xl font-bold text-slate-600">S/ 10.81</p>');
html = html.replace(/<p id="newBill1" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill1" class="text-3xl font-bold text-cyan-700">S/ 11.75</p>');
html = html.replace(/<p id="newBill3" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill3" class="text-3xl font-bold text-cyan-700">S/ 13.11</p>');

fs.writeFileSync('sunass-plus---sunassplus/web-pages/eps-chavin/content-pages/EPS-Chavin.es-ES.webpage.copy.html', html, 'utf8');
console.log("Done");
