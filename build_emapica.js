const fs = require('fs');
let html = fs.readFileSync('sunass-plus---sunassplus/web-pages/emapica/content-pages/EMAPICA.es-ES.webpage.copy.html', 'utf8');

// Header and Title
html = html.replace(/EMAPA HUARAL S.A\./g, 'EPS EMAPICA S.A.');
html = html.replace(/Emapa Huaral/g, 'EMAPICA');
html = html.replace(/EMAPA Huaral/g, 'EMAPICA');
html = html.replace(/Huaral/g, 'Ica y Palpa');

// Context
html = html.replace(
  /<p class="text-slate-600 leading-relaxed mb-6">[\s\S]*?<\/p>/,
  '<p class="text-slate-600 leading-relaxed mb-6">La <strong>EPS EMAPICA S.A.</strong> opera en Ica, Parcona, Los Aquijes y Palpa. Enfrenta problemáticas severas como bajísimas continuidades (2.4 a 2.7 horas al día en Los Aquijes y Parcona), 0% de micromedición en estas zonas críticas, un fuerte estrés hídrico en sus cuencas de captación y una alta vulnerabilidad ante desastres naturales.</p>'
);

// Periodo Regulatorio
html = html.replace(/2025-2027/g, '2023-2028');

// Mejoras Esperadas
html = html.replace(
  /<ul class="space-y-3 text-slate-600 text-sm mb-6">[\s\S]*?<\/ul>/,
  `<ul class="space-y-3 text-slate-600 text-sm mb-6">
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Reducción de agua no facturada:</strong> Bajar las pérdidas globales de 43% a 38% en el Año 5.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Ampliación de micromedición:</strong> Alcanzar 98% de cobertura en Parcona, Palpa y Los Aquijes.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Implementación de catastros:</strong> 100% de actualización Técnica y Comercial a partir del Año 2.</span></li>
  </ul>`
);

// Poblacion
html = html.replace(/86,220/g, '190,980'); // inicio 
html = html.replace(/98,168/g, '197,121'); // final 

// Metas de Gestión (Gráficos)
html = html.replace(/const anFData = \[35, 29\];/, 'const anFData = [43, 38];');
html = html.replace(/const contData = \[18\.2, 19\];/, 'const contData = [18.4, 20]; // 18.4 base en Ica'); 
html = html.replace(/const microData = \[95, 98\];/, 'const microData = [64, 77]; // 64 base Ica, 77 Año 2 Ica (luego física)');
html = html.replace(/const presData = \[8\.5, 10\];/, 'const presData = [13.1, 13]; // 13.1 base en Ica, meta 13'); 

// Metas a Nivel de Localidad
html = html.replace(/<table class="data-table glass-card rounded-2xl overflow-hidden">[\s\S]*?<\/table>/, `<table class="data-table glass-card rounded-2xl overflow-hidden">
        <thead><tr><th>Localidad</th><th>Continuidad (h/d)</th><th>Presión (m.c.a.)</th><th>Micromedición (%)</th></tr></thead>
        <tbody>
          <tr><td>Ica</td><td>20.0</td><td>13.0</td><td>Meta física (Año 5)</td></tr>
          <tr><td>Parcona</td><td>14.0</td><td>≥ 10.0</td><td>98.0</td></tr>
          <tr><td>Palpa</td><td>17.0</td><td>12.0</td><td>98.0</td></tr>
          <tr><td>Los Aquijes</td><td>10.0</td><td>≥ 10.0</td><td>98.0</td></tr>
        </tbody>
      </table>`);

// Brechas y Acceso
html = html.replace(/makeCoverageDonut\('covApChart', 83\.8\);/, "makeCoverageDonut('covApChart', 90.3);");
html = html.replace(/makeCoverageDonut\('covSaneamientoChart', 76\.7\);/, "makeCoverageDonut('covSaneamientoChart', 90.7);");

// Sostenibilidad
html = html.replace(/<p class="text-3xl font-bold mt-2">100%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Micromedición<\/p>/, '<p class="text-3xl font-bold mt-2">64%</p>\n<p class="text-xs text-slate-400 mt-1">Micromedición (Ica)</p>');
html = html.replace(/<p class="text-3xl font-bold mt-2">75%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Catastro comercial<\/p>/, '<p class="text-3xl font-bold mt-2">100%</p>\n<p class="text-xs text-slate-400 mt-1">Catastro (Meta Año 2)</p>');

// Económico-Financiero
html = html.replace(/S\/ 4\.1 millones/g, 'S/ 5 322 652'); // Saldo inicial
html = html.replace(/S\/ 448 240/g, 'S/ 31 278 525'); // Deudas
html = html.replace(/62\.3%/g, '18.92%'); // Incremento acumulado
html = html.replace(/6\.50%/g, '4.6%'); // Incremento año 1 por reordenamiento

// Inversiones
html = html.replace(/S\/ 13 642 987/g, 'S/ 50 050 231');
html = html.replace(/S\/ 12 415 790/g, 'S/ 47 636 256'); // Agua y saneamiento
html = html.replace(/S\/ 535 380/g, 'S/ 1 673 502'); // MRSE
html = html.replace(/S\/ 418 223/g, 'S/ 289 000'); // PCC (Opex)
html = html.replace(/S\/ 273 593/g, 'S/ 740 473'); // GRD

html = html.replace(/data: \[6743600, 3951190, 1721000, 535380, 418223, 273593\]/, 'data: [0, 0, 47636256, 1673502, 289000, 740473]');

html = html.replace(/const projects = \[[\s\S]*?\];/, `const projects = [
  { name: "Optimización del sistema de medición de AP (Renovación Ica)", category: "Comercial", amount: 9183391, year: '2023-2028' },
  { name: "Optimización del sistema de medición de AP (Ampliación Ica)", category: "Comercial", amount: 5924741, year: '2023-2028' },
  { name: "Optimización del sistema SCADA (Gestión EPS)", category: "Técnico", amount: 4633600, year: '2023-2028' }
];`);

// Tarifas
html = html.replace(/<p id="currentBill" class="text-2xl font-bold text-slate-600">S\/ 0\.00<\/p>/, '<p id="currentBill" class="text-2xl font-bold text-slate-600">S/ 28.79</p>');
html = html.replace(/<p id="newBill1" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill1" class="text-3xl font-bold text-cyan-700">S/ 30.42</p>');
html = html.replace(/<p id="newBill3" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill3" class="text-3xl font-bold text-cyan-700">S/ 35.40</p>');

fs.writeFileSync('sunass-plus---sunassplus/web-pages/emapica/content-pages/EMAPICA.es-ES.webpage.copy.html', html, 'utf8');
console.log("Done");
