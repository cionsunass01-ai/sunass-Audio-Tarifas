const fs = require('fs');
let html = fs.readFileSync('sunass-plus---sunassplus/web-pages/sedaloreto/content-pages/SEDALORETO.es-ES.webpage.copy.html', 'utf8');

// Header and Title
html = html.replace(/EMAPA HUARAL S.A\./g, 'EPS SEDALORETO S.A.');
html = html.replace(/Emapa Huaral/g, 'SEDALORETO');
html = html.replace(/EMAPA Huaral/g, 'SEDALORETO');
html = html.replace(/Huaral/g, 'Iquitos'); // Principal referencial

// Context
html = html.replace(
  /<p class="text-slate-600 leading-relaxed mb-6">[\s\S]*?<\/p>/,
  '<p class="text-slate-600 leading-relaxed mb-6">La <strong>EPS SEDALORETO S.A.</strong> cubre Iquitos, Yurimaguas y Requena. Su principal problema operativo incluye graves deficiencias de continuidad (críticas en época de estiaje por las variaciones extremas del río Nanay), alta turbiedad, falta de unidades de filtración, carencia de catastro técnico en todas sus localidades, y el vertimiento directo de las aguas servidas sin tratamiento a los ríos amazónicos.</p>'
);

// Periodo Regulatorio
html = html.replace(/2025-2027/g, '2022-2027');

// Mejoras Esperadas
html = html.replace(
  /<ul class="space-y-3 text-slate-600 text-sm mb-6">[\s\S]*?<\/ul>/,
  `<ul class="space-y-3 text-slate-600 text-sm mb-6">
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Reducción de pérdidas:</strong> Disminuir el nivel de Agua No Facturada de la EPS del 55% al 49% en el Año 5.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Implementación de catastro técnico:</strong> Lograr el 100% en sistemas de agua potable y alcantarillado lineal y no lineal para el Año 4.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Mejora del servicio en Iquitos:</strong> Incrementar continuidad (+1 h/d) y presión (+1 m.c.a) a partir del Año 4.</span></li>
  </ul>`
);

// Poblacion
html = html.replace(/86,220/g, '387,393'); // inicio servida AP
html = html.replace(/98,168/g, '411,654'); // final servida AP

// Metas de Gestión (Gráficos)
html = html.replace(/const anFData = \[35, 29\];/, 'const anFData = [55.2, 49]; // Base 2021');
html = html.replace(/const contData = \[18\.2, 19\];/, 'const contData = [13.3, 14.0]; // Iquitos referencial (13.7 base)'); 
html = html.replace(/const microData = \[95, 98\];/, 'const microData = [48.2, 0]; // 0 = meta física no porcentual');
html = html.replace(/const presData = \[8\.5, 10\];/, 'const presData = [13.0, 13.0]; // Ref EPS (Iquitos +1)'); 

// Metas a Nivel de Localidad
html = html.replace(/<table class="data-table glass-card rounded-2xl overflow-hidden">[\s\S]*?<\/table>/, `<table class="data-table glass-card rounded-2xl overflow-hidden">
        <thead><tr><th>Localidad</th><th>Continuidad (h/d)</th><th>Presión (m.c.a.)</th><th>Micromedición (%)</th></tr></thead>
        <tbody>
          <tr><td>Iquitos</td><td>C + 1</td><td>P + 1</td><td>Metas Físicas</td></tr>
          <tr><td>Yurimaguas</td><td>C</td><td>P</td><td>Metas Físicas</td></tr>
          <tr><td>Requena</td><td>C</td><td>P</td><td>Metas Físicas</td></tr>
        </tbody>
      </table>`);

// Brechas y Acceso
html = html.replace(/makeCoverageDonut\('covApChart', 83\.8\);/, "makeCoverageDonut('covApChart', 78.5);");
html = html.replace(/makeCoverageDonut\('covSaneamientoChart', 76\.7\);/, "makeCoverageDonut('covSaneamientoChart', 38.6);");

// Sostenibilidad
html = html.replace(/<p class="text-3xl font-bold mt-2">100%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Micromedición<\/p>/, '<p class="text-3xl font-bold mt-2">48.2%</p>\n<p class="text-xs text-slate-400 mt-1">Micromedición (Base)</p>');
html = html.replace(/<p class="text-3xl font-bold mt-2">75%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Catastro comercial<\/p>/, '<p class="text-3xl font-bold mt-2">100%</p>\n<p class="text-xs text-slate-400 mt-1">Catastro Técnico (Año 4)</p>');

// Económico-Financiero
html = html.replace(/S\/ 4\.1 millones/g, 'S/ 0'); // ND
html = html.replace(/S\/ 448 240/g, 'S/ 0'); // ND
html = html.replace(/62\.3%/g, '10.25%'); // Incremento acumulado
html = html.replace(/6\.50%/g, '0.00%'); // Incremento año 1

// Inversiones
html = html.replace(/S\/ 13 642 987/g, 'S/ 67 000 000'); // Total aprox (con OTASS)
html = html.replace(/S\/ 12 415 790/g, 'S/ 58 134 306'); // Agua y saneamiento
html = html.replace(/S\/ 535 380/g, 'S/ 684 865'); // MRSE
html = html.replace(/S\/ 418 223/g, 'S/ 1 904 864'); // PCC
html = html.replace(/S\/ 273 593/g, 'S/ 1 998 443'); // GRD

html = html.replace(/data: \[6743600, 3951190, 1721000, 535380, 418223, 273593\]/, 'data: [0, 0, 58134306, 684865, 1904864, 1998443]');

html = html.replace(/const projects = \[[\s\S]*?\];/, `const projects = [
  { name: "Optimización de Agua Potable R-11 (Iquitos - 1ra etapa)", category: "Producción", amount: 18307687, year: '2022-2027' },
  { name: "Reposición de parque automotor Iquitos", category: "Institucional", amount: 1262327, year: '2022-2027' },
  { name: "Equipamiento para control de 11 reservorios Iquitos", category: "Obras", amount: 946958, year: '2022-2027' }
];`);

// Tarifas
html = html.replace(/<p id="currentBill" class="text-2xl font-bold text-slate-600">S\/ 0\.00<\/p>/, '<p id="currentBill" class="text-2xl font-bold text-slate-600">S/ 48.00</p>'); // Ref. Iquitos 15m3
html = html.replace(/<p id="newBill1" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill1" class="text-3xl font-bold text-cyan-700">S/ 48.00</p>'); 
html = html.replace(/<p id="newBill3" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill3" class="text-3xl font-bold text-cyan-700">S/ 50.40</p>'); // Ref +5% (Año 2)

fs.writeFileSync('sunass-plus---sunassplus/web-pages/sedaloreto/content-pages/SEDALORETO.es-ES.webpage.copy.html', html, 'utf8');
console.log("Done");
