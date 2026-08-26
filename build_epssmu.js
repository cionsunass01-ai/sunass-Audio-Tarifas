const fs = require('fs');
let html = fs.readFileSync('sunass-plus---sunassplus/web-pages/epssmu/content-pages/EPSSMU.es-ES.webpage.copy.html', 'utf8');

// Header and Title
html = html.replace(/EMAPA HUARAL S.A\./g, 'EPS EPSSMU S.A.');
html = html.replace(/Emapa Huaral/g, 'EPSSMU');
html = html.replace(/EMAPA Huaral/g, 'EPSSMU');
html = html.replace(/Huaral/g, 'Bagua Grande');

// Context
html = html.replace(
  /<p class="text-slate-600 leading-relaxed mb-6">[\s\S]*?<\/p>/,
  '<p class="text-slate-600 leading-relaxed mb-6">La <strong>EPS EPSSMU S.A.</strong> presta servicios en Bagua Grande, bajo el Régimen de Apoyo Transitorio (RAT) desde 2018. Su mayor problemática es la pérdida de casi el 50% de su producción de agua, sumado a una baja continuidad en estiaje y constantes interrupciones por alta turbiedad en época de lluvias. Además, la ausencia de una PTAR obliga al vertimiento de aguas servidas directamente al río Utcubamba sin tratamiento.</p>'
);

// Periodo Regulatorio
html = html.replace(/2025-2027/g, '2023-2028');

// Mejoras Esperadas
html = html.replace(
  /<ul class="space-y-3 text-slate-600 text-sm mb-6">[\s\S]*?<\/ul>/,
  `<ul class="space-y-3 text-slate-600 text-sm mb-6">
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Incrementar micromedición:</strong> Alcanzar progresivamente una cobertura del 80% de micromedición leída.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Mejorar continuidad:</strong> Sumar 2 horas de distribución al día (Meta: C+2).</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Reducción de pérdidas:</strong> Disminuir el nivel de Agua No Facturada en 2%.</span></li>
  </ul>`
);

// Poblacion
html = html.replace(/86,220/g, '32,905'); // inicio servida AP
html = html.replace(/98,168/g, '33,212'); // final administrada urbana o ref

// Metas de Gestión (Gráficos)
html = html.replace(/const anFData = \[35, 29\];/, 'const anFData = [50, 48]; // Base 50%, Meta: -2%');
html = html.replace(/const contData = \[18\.2, 19\];/, 'const contData = [0, 2]; // Gráfico referencial (+2h)'); 
html = html.replace(/const microData = \[95, 98\];/, 'const microData = [51, 80];');
html = html.replace(/const presData = \[8\.5, 10\];/, 'const presData = [0, 0]; // P base se mantiene constante'); 

// Metas a Nivel de Localidad
html = html.replace(/<table class="data-table glass-card rounded-2xl overflow-hidden">[\s\S]*?<\/table>/, `<table class="data-table glass-card rounded-2xl overflow-hidden">
        <thead><tr><th>Localidad</th><th>Continuidad (h/d)</th><th>Presión (m.c.a.)</th><th>Micromedición (%)</th></tr></thead>
        <tbody>
          <tr><td>Bagua Grande</td><td>C + 2</td><td>P</td><td>80.0</td></tr>
        </tbody>
      </table>`);

// Brechas y Acceso
html = html.replace(/makeCoverageDonut\('covApChart', 83\.8\);/, "makeCoverageDonut('covApChart', 80.7);");
html = html.replace(/makeCoverageDonut\('covSaneamientoChart', 76\.7\);/, "makeCoverageDonut('covSaneamientoChart', 68.7);");

// Sostenibilidad
html = html.replace(/<p class="text-3xl font-bold mt-2">100%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Micromedición<\/p>/, '<p class="text-3xl font-bold mt-2">51%</p>\n<p class="text-xs text-slate-400 mt-1">Micromedición (Base)</p>');
html = html.replace(/<p class="text-3xl font-bold mt-2">75%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Catastro comercial<\/p>/, '<p class="text-3xl font-bold mt-2">100%</p>\n<p class="text-xs text-slate-400 mt-1">Catastro (Sostenido)</p>');

// Económico-Financiero
html = html.replace(/S\/ 4\.1 millones/g, 'S/ 387 277'); // Saldo inicial total ref.
html = html.replace(/S\/ 448 240/g, 'S/ 4 503 130'); // Deudas Fonavi
html = html.replace(/62\.3%/g, '18.8%'); // Incremento acumulado
html = html.replace(/6\.50%/g, '0.0%'); // Incremento año 1

// Inversiones
html = html.replace(/S\/ 13 642 987/g, 'S/ 6 139 658'); // Programa base sin reservas contin
html = html.replace(/S\/ 12 415 790/g, 'S/ 5 676 032'); // Agua y saneamiento
html = html.replace(/S\/ 535 380/g, 'S/ 197 126'); // MRSE
html = html.replace(/S\/ 418 223/g, 'S/ 80 000'); // PCC
html = html.replace(/S\/ 273 593/g, 'S/ 186 500'); // GRD

html = html.replace(/data: \[6743600, 3951190, 1721000, 535380, 418223, 273593\]/, 'data: [0, 0, 5676032, 197126, 80000, 186500]');

html = html.replace(/const projects = \[[\s\S]*?\];/, `const projects = [
  { name: "Remodelación abastecimiento quebrada Goncha, PTAP N°01 y PTAP Nueva", category: "Producción", amount: 2361266, year: '2023-2028' },
  { name: "Renovación de redes de distribución EPSSMU S.A.", category: "Obras", amount: 764836, year: '2023-2028' },
  { name: "Sectorización de redes para mejorar eficiencia", category: "Obras", amount: 379097, year: '2023-2028' }
];`);

// Tarifas
html = html.replace(/<p id="currentBill" class="text-2xl font-bold text-slate-600">S\/ 0\.00<\/p>/, '<p id="currentBill" class="text-2xl font-bold text-slate-600">S/ 25.67</p>');
html = html.replace(/<p id="newBill1" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill1" class="text-3xl font-bold text-cyan-700">S/ 25.78</p>'); // No benef sin IGV
html = html.replace(/<p id="newBill3" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill3" class="text-3xl font-bold text-cyan-700">S/ 0.00</p>'); // ND

fs.writeFileSync('sunass-plus---sunassplus/web-pages/epssmu/content-pages/EPSSMU.es-ES.webpage.copy.html', html, 'utf8');
console.log("Done");
