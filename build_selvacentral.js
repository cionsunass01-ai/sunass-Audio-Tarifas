const fs = require('fs');
let html = fs.readFileSync('sunass-plus---sunassplus/web-pages/selva-central/content-pages/SELVA-CENTRAL.es-ES.webpage.copy.html', 'utf8');

// Header and Title
html = html.replace(/EMAPA HUARAL S.A\./g, 'EPS SELVA CENTRAL S.A.');
html = html.replace(/Emapa Huaral/g, 'SELVA CENTRAL');
html = html.replace(/EMAPA Huaral/g, 'SELVA CENTRAL');
html = html.replace(/Huaral/g, 'Chanchamayo, Satipo y Oxapampa');

// Context
html = html.replace(
  /<p class="text-slate-600 leading-relaxed mb-6">[\s\S]*?<\/p>/,
  '<p class="text-slate-600 leading-relaxed mb-6">La <strong>EPS Selva Central S.A.</strong> opera en las provincias de Chanchamayo, Satipo y Oxapampa. Afronta enormes desafíos operativos: pérdidas de agua que rozan el 68% en Villa Rica y Satipo, micromedición crítica (12.1% en San Ramón) y alta vulnerabilidad de sus fuentes por deforestación. Sumado a ello, la alarmante falta de tratamiento de aguas residuales en casi todas sus localidades compromete la sostenibilidad hídrica de la región.</p>'
);

// Periodo Regulatorio
html = html.replace(/2025-2027/g, '2023-2027');

// Mejoras Esperadas
html = html.replace(
  /<ul class="space-y-3 text-slate-600 text-sm mb-6">[\s\S]*?<\/ul>/,
  `<ul class="space-y-3 text-slate-600 text-sm mb-6">
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Reducción de pérdidas:</strong> Masificar la micromedición mediante un intenso programa de instalación y reemplazo para controlar los niveles de ANF.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Sostenibilidad en PTAP:</strong> Rehabilitar lechos filtrantes y asegurar la continuidad y desinfección eficiente del agua potable.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Conservación hídrica:</strong> Implementar mecanismos MRSE para el control de sedimentos y protección de las fuentes de captación.</span></li>
  </ul>`
);

// Poblacion
html = html.replace(/86,220/g, '114,361'); // Población servida AP (Año 5)
html = html.replace(/98,168/g, '93,321'); // Población servida ALC (Año 5)

// Metas de Gestión (Gráficos)
html = html.replace(/const anFData = \[35, 29\];/, 'const anFData = [68.0, 64.0]; // Ref Villa Rica (ANF-4)');
html = html.replace(/const contData = \[18\.2, 19\];/, 'const contData = [18.0, 20.0]; // Ref La Merced (C+2)'); 
html = html.replace(/const microData = \[95, 98\];/, 'const microData = [57.4, 0]; // 0 = Ref metas numéricas por localidad');
html = html.replace(/const presData = \[8\.5, 10\];/, 'const presData = [20.0, 21.0]; // Ref La Merced (P+1)'); 

// Metas a Nivel de Localidad
html = html.replace(/<table class="data-table glass-card rounded-2xl overflow-hidden">[\s\S]*?<\/table>/, `<table class="data-table glass-card rounded-2xl overflow-hidden">
        <thead><tr><th>Localidad</th><th>Continuidad (h/d)</th><th>Presión (m.c.a.)</th><th>Micromedición (%)</th></tr></thead>
        <tbody>
          <tr><td>La Merced</td><td>C + 2 (Ref. 18)</td><td>P + 1 (Ref. 20)</td><td>ND (Metas físicas)</td></tr>
          <tr><td>Villa Rica</td><td>C + 2 (Ref. 18)</td><td>P + 1 (Ref. 20)</td><td>ND (Metas físicas)</td></tr>
          <tr><td>Satipo</td><td>C + 2 (Ref. 17)</td><td>P + 1 (Ref. 12)</td><td>ND (Metas físicas)</td></tr>
          <tr><td>Pichanaqui</td><td>C + 1 (Ref. 22)</td><td>P + 1 (Ref. 20)</td><td>ND (Metas físicas)</td></tr>
          <tr><td>Oxapampa</td><td>C + 2 (Ref. 18)</td><td>P + 1 (Ref. 13)</td><td>ND (Metas físicas)</td></tr>
          <tr><td>San Ramón</td><td>C + 2 (Ref. 17)</td><td>P + 2 (Ref. 10)</td><td>ND (Metas físicas)</td></tr>
        </tbody>
      </table>`);

// Brechas y Acceso
html = html.replace(/makeCoverageDonut\('covApChart', 83\.8\);/, "makeCoverageDonut('covApChart', 70.0);");
html = html.replace(/makeCoverageDonut\('covSaneamientoChart', 76\.7\);/, "makeCoverageDonut('covSaneamientoChart', 57.3);");

// Sostenibilidad
html = html.replace(/<p class="text-3xl font-bold mt-2">100%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Micromedición<\/p>/, '<p class="text-3xl font-bold mt-2">57.4%</p>\n<p class="text-xs text-slate-400 mt-1">Micromedición (Base)</p>');
html = html.replace(/<p class="text-3xl font-bold mt-2">75%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Catastro comercial<\/p>/, '<p class="text-3xl font-bold mt-2">100%</p>\n<p class="text-xs text-slate-400 mt-1">Catastro (Año 5)</p>');

// Económico-Financiero
html = html.replace(/S\/ 4\.1 millones/g, 'S/ 1 679 014'); // Saldo inicial fondo inv + transferencias
html = html.replace(/S\/ 448 240/g, 'S/ 6 090 431'); // Amortización sentencias y colfonavi
html = html.replace(/62\.3%/g, '28.4%'); // Incremento acumulado
html = html.replace(/6\.50%/g, '0.0%'); // Incremento año 1

// Inversiones
html = html.replace(/S\/ 13 642 987/g, 'S/ 16 311 334'); // Total unificado
html = html.replace(/S\/ 12 415 790/g, 'S/ 15 055 839'); // Agua y saneamiento
html = html.replace(/S\/ 535 380/g, 'S/ 235 000'); // MRSE
html = html.replace(/S\/ 418 223/g, 'S/ 530 000'); // PCC PAS
html = html.replace(/S\/ 273 593/g, 'S/ 490 495'); // GRD

html = html.replace(/data: \[6743600, 3951190, 1721000, 535380, 418223, 273593\]/, 'data: [0, 0, 15055839, 235000, 530000, 490495]');

html = html.replace(/const projects = \[[\s\S]*?\];/, `const projects = [
  { name: "Construcción de galerías filtrantes en San Ramón", category: "Obras", amount: 314516, year: '2023-2027' },
  { name: "Adquisición software, mejora Avalon, hidrojets La Merced", category: "Equipamiento", amount: 1159764, year: '2023-2027' },
  { name: "Reemplazo de medidores para Pichanaqui - Sangani", category: "Comercial", amount: 1505930, year: '2023-2027' }
];`);

// Tarifas
html = html.replace(/<p id="currentBill" class="text-2xl font-bold text-slate-600">S\/ 0\.00<\/p>/, '<p id="currentBill" class="text-2xl font-bold text-slate-600">S/ 20.00</p>'); // La Merced ref
html = html.replace(/<p id="newBill1" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill1" class="text-3xl font-bold text-cyan-700">S/ 20.30</p>'); // La Merced ref
html = html.replace(/<p id="newBill3" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill3" class="text-3xl font-bold text-cyan-700">S/ 0.00</p>'); // ND soles

fs.writeFileSync('sunass-plus---sunassplus/web-pages/selva-central/content-pages/SELVA-CENTRAL.es-ES.webpage.copy.html', html, 'utf8');
console.log("Done");
