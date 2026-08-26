const fs = require('fs');
let html = fs.readFileSync('sunass-plus---sunassplus/web-pages/mantaro/content-pages/MANTARO.es-ES.webpage.copy.html', 'utf8');

// Header and Title
html = html.replace(/EMAPA HUARAL S.A\./g, 'EPS MANTARO S.A.');
html = html.replace(/Emapa Huaral/g, 'MANTARO');
html = html.replace(/EMAPA Huaral/g, 'MANTARO');
html = html.replace(/Huaral/g, 'Jauja, Chupaca y Concepción');

// Context
html = html.replace(
  /<p class="text-slate-600 leading-relaxed mb-6">[\s\S]*?<\/p>/,
  '<p class="text-slate-600 leading-relaxed mb-6">La <strong>EPS MANTARO S.A.</strong> administra los servicios en Jauja, Chupaca y Concepción. Sus principales retos operativos se centran en los altísimos niveles de agua no facturada (hasta 62.7% en Concepción) y un bajo nivel global de micromedición (30.4%). Además, enfrenta una problemática crítica de salud pública por la presencia natural de arsénico en la captación de Quero (Jauja), lo que demanda acciones urgentes de tratamiento y obras de mezcla.</p>'
);

// Periodo Regulatorio
html = html.replace(/2025-2027/g, '2023-2028');

// Mejoras Esperadas
html = html.replace(
  /<ul class="space-y-3 text-slate-600 text-sm mb-6">[\s\S]*?<\/ul>/,
  `<ul class="space-y-3 text-slate-600 text-sm mb-6">
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Sostenibilidad del servicio:</strong> Rehabilitar la infraestructura existente para mejorar la continuidad y presión en sus tres localidades.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Optimización comercial:</strong> Incrementar la micromedición (hasta un 79% en Jauja) y reducir las pérdidas de agua.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Protección y calidad:</strong> Asegurar la remoción de arsénico y ejecutar reforestación en zonas de recarga hídrica.</span></li>
  </ul>`
);

// Poblacion
html = html.replace(/86,220/g, '70,509'); // inicio servida AP
html = html.replace(/98,168/g, '72,171'); // final servida AP

// Metas de Gestión (Gráficos)
html = html.replace(/const anFData = \[35, 29\];/, 'const anFData = [55.8, 53.8]; // Promedio Ref (ANF - 2)');
html = html.replace(/const contData = \[18\.2, 19\];/, 'const contData = [23.0, 24.0]; // Ref Jauja C+1'); 
html = html.replace(/const microData = \[95, 98\];/, 'const microData = [30.4, 59.6]; // Ref Promedio 59.6');
html = html.replace(/const presData = \[8\.5, 10\];/, 'const presData = [15.0, 15.0]; // Ref P (Rango 10-50)'); 

// Metas a Nivel de Localidad
html = html.replace(/<table class="data-table glass-card rounded-2xl overflow-hidden">[\s\S]*?<\/table>/, `<table class="data-table glass-card rounded-2xl overflow-hidden">
        <thead><tr><th>Localidad</th><th>Continuidad (h/d)</th><th>Presión (m.c.a.)</th><th>Micromedición (%)</th></tr></thead>
        <tbody>
          <tr><td>Jauja</td><td>C + 1 (≥ 20)</td><td>P (≥ 10)</td><td>79.0</td></tr>
          <tr><td>Chupaca</td><td>C + 3 (≥ 6)</td><td>P (≥ 10)</td><td>50.0</td></tr>
          <tr><td>Concepción</td><td>C (≥ 20)</td><td>P (≥ 10)</td><td>50.0</td></tr>
        </tbody>
      </table>`);

// Brechas y Acceso
html = html.replace(/makeCoverageDonut\('covApChart', 83\.8\);/, "makeCoverageDonut('covApChart', 96.7);");
html = html.replace(/makeCoverageDonut\('covSaneamientoChart', 76\.7\);/, "makeCoverageDonut('covSaneamientoChart', 79.7);");

// Sostenibilidad
html = html.replace(/<p class="text-3xl font-bold mt-2">100%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Micromedición<\/p>/, '<p class="text-3xl font-bold mt-2">30.4%</p>\n<p class="text-xs text-slate-400 mt-1">Micromedición (Base)</p>');
html = html.replace(/<p class="text-3xl font-bold mt-2">75%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Catastro comercial<\/p>/, '<p class="text-3xl font-bold mt-2">100%</p>\n<p class="text-xs text-slate-400 mt-1">Catastro Comercial (Año 5)</p>');

// Económico-Financiero
html = html.replace(/S\/ 4\.1 millones/g, 'S/ 2 346 783'); // Saldo inicial fondo inv
html = html.replace(/S\/ 448 240/g, 'S/ 2 676 000'); // Pasivo total proyectado
html = html.replace(/62\.3%/g, '26.2%'); // Incremento acumulado
html = html.replace(/6\.50%/g, '0.0%'); // Incremento año 1

// Inversiones
html = html.replace(/S\/ 13 642 987/g, 'S/ 9 531 273'); // Total unificado
html = html.replace(/S\/ 12 415 790/g, 'S/ 7 744 319'); // Agua y saneamiento
html = html.replace(/S\/ 535 380/g, 'S/ 586 715'); // MRSE
html = html.replace(/S\/ 418 223/g, 'S/ 835 853'); // PCC PAS VMA
html = html.replace(/S\/ 273 593/g, 'S/ 364 385'); // GRD

html = html.replace(/data: \[6743600, 3951190, 1721000, 535380, 418223, 273593\]/, 'data: [0, 0, 7744319, 586715, 835853, 364385]');

html = html.replace(/const projects = \[[\s\S]*?\];/, `const projects = [
  { name: "Ampliación de micromedidores en la Zonal Chupaca", category: "Comercial", amount: 733960, year: '2023-2028' },
  { name: "Ampliación de micromedidores en la Zonal Jauja", category: "Comercial", amount: 520363, year: '2023-2028' },
  { name: "Rehabilitación de tubería HDF sector Yurajcunya (Jauja)", category: "Obras", amount: 375000, year: '2023-2028' }
];`);

// Tarifas
html = html.replace(/<p id="currentBill" class="text-2xl font-bold text-slate-600">S\/ 0\.00<\/p>/, '<p id="currentBill" class="text-2xl font-bold text-slate-600">S/ 24.90</p>'); // Jauja ref
html = html.replace(/<p id="newBill1" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill1" class="text-3xl font-bold text-cyan-700">S/ 25.40</p>'); // Jauja ref
html = html.replace(/<p id="newBill3" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill3" class="text-3xl font-bold text-cyan-700">S/ 29.76</p>'); // Jauja año 3 ref

fs.writeFileSync('sunass-plus---sunassplus/web-pages/mantaro/content-pages/MANTARO.es-ES.webpage.copy.html', html, 'utf8');
console.log("Done");
