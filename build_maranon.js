const fs = require('fs');
let html = fs.readFileSync('sunass-plus---sunassplus/web-pages/eps-maranon/content-pages/Eps-Maranon.es-ES.webpage.copy.html', 'utf8');

// Header and Title
html = html.replace(/EMAPA HUARAL S.A\./g, 'EPS MARAÑÓN S.A.');
html = html.replace(/Emapa Huaral/g, 'EPS Marañón S.A.');
html = html.replace(/EMAPA Huaral/g, 'EPS Marañón S.A.');

// Context
html = html.replace(
  /<p class="text-slate-600 leading-relaxed mb-6">[\s\S]*?<\/p>/,
  '<p class="text-slate-600 leading-relaxed mb-6">La <strong>EPS Marañón S.A.</strong> es una empresa municipal de saneamiento que opera en el norte del país, abarcando las localidades de Jaén, Bellavista y San Ignacio. Sus principales problemáticas incluyen la deforestación de las microcuencas de aporte, alta tasa de agua no facturada, sobrecarga de la PTAR de Jaén, y baja continuidad en San Ignacio (5.3 h/d).</p>'
);

// Periodo Regulatorio
html = html.replace(/2025-2027/g, '2023-2028');

// Mejoras Esperadas
html = html.replace(
  /<ul class="space-y-3 text-slate-600 text-sm mb-6">[\s\S]*?<\/ul>/,
  `<ul class="space-y-3 text-slate-600 text-sm mb-6">
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Cierre de brechas de micromedición:</strong> meta del 98% en las tres localidades.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Reducción del agua no facturada:</strong> del 36% al 34% a nivel EPS.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Implementación del 100%</strong> de Catastro Comercial y Técnico a partir del tercer año.</span></li>
  </ul>`
);

// Poblacion
html = html.replace(/86,220/g, '116,757'); // inicio
html = html.replace(/98,168/g, '125,955'); // final

// Metas de Gestión (Gráficos)
html = html.replace(/const anFData = \[35, 29\];/, 'const anFData = [36, 34];');
html = html.replace(/const contData = \[18\.2, 19\];/, 'const contData = [24, 21];'); // Usando Jaén como referencia o un promedio. Pondré 24 a 21 para Jaén
html = html.replace(/const microData = \[95, 98\];/, 'const microData = [92.1, 98];');
html = html.replace(/const presData = \[8\.5, 10\];/, 'const presData = [33.4, 25];'); // Jaen base 33.4, meta P (10-50). Promedio 25.

// Brechas y Acceso
html = html.replace(/makeCoverageDonut\('covApChart', 83\.8\);/, "makeCoverageDonut('covApChart', 82.6); // Jaén");
html = html.replace(/makeCoverageDonut\('covSaneamientoChart', 76\.7\);/, "makeCoverageDonut('covSaneamientoChart', 80.27); // Jaén");

// Sostenibilidad
html = html.replace(/<p class="text-3xl font-bold mt-2">100%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Micromedición<\/p>/, '<p class="text-3xl font-bold mt-2">92.1%</p>\n<p class="text-xs text-slate-400 mt-1">Micromedición</p>');
html = html.replace(/<p class="text-3xl font-bold mt-2">75%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Catastro comercial<\/p>/, '<p class="text-3xl font-bold mt-2">57%</p>\n<p class="text-xs text-slate-400 mt-1">Catastro comercial (Jaén)</p>');

// Económico-Financiero
html = html.replace(/S\/ 4\.1 millones/g, 'S/ 1.34 millones');
html = html.replace(/S\/ 448 240/g, 'S/ 0');
html = html.replace(/62\.3%/g, '8.5%'); // Incremento acumulado
html = html.replace(/6\.50%/g, '0.0%'); // Incremento año 1

html = html.replace(/data: \[6\.7, 6\.6, 6\.8, 8\.0, 9\.1\]/, 'data: [0, 0, 0, 0, 0]'); // Not provided, zero out
html = html.replace(/data: \[5\.5, 4\.9, 6\.4, 6\.8, 7\.1\]/, 'data: [0, 0, 0, 0, 0]');

// Inversiones
html = html.replace(/S\/ 13 642 987/g, 'S/ 18 941 997');
html = html.replace(/S\/ 12 415 790/g, 'S/ 15 992 528');
html = html.replace(/S\/ 535 380/g, 'S/ 2 033 832');
html = html.replace(/S\/ 418 223/g, 'S/ 115 000');
html = html.replace(/S\/ 273 593/g, 'S/ 800 637');

html = html.replace(/data: \[6743600, 3951190, 1721000, 535380, 418223, 273593\]/, 'data: [0, 0, 15992528, 2033832, 115000, 800637]');

html = html.replace(/const projects = \[[\s\S]*?\];/, `const projects = [
  { name: "Renovación de medidores de AP en Jaén", category: "Mejora", amount: 3418470, year: '2023-2028' },
  { name: "Renovación de redes primarias y secundarias AP en San Ignacio", category: "Ampliación", amount: 1975561, year: '2023-2028' },
  { name: "Implementación del sistema SCADA", category: "Institucional", amount: 1515520, year: '2023-2028' }
];`);

// Tarifas 
html = html.replace(/<p id="currentBill" class="text-2xl font-bold text-slate-600">S\/ 0\.00<\/p>/, '<p id="currentBill" class="text-2xl font-bold text-slate-600">S/ 30.95</p>');
html = html.replace(/<p id="newBill1" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill1" class="text-3xl font-bold text-cyan-700">S/ 31.94</p>');
html = html.replace(/<p id="newBill3" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill3" class="text-3xl font-bold text-cyan-700">S/ 32.50</p>');

// Límite de consumo
html = html.replace(/los primeros 8 m³/g, 'los primeros 10 m³ en Jaén (8 m³ en Bellavista y San Ignacio)');

fs.writeFileSync('sunass-plus---sunassplus/web-pages/eps-maranon/content-pages/Eps-Maranon.es-ES.webpage.copy.html', html, 'utf8');
console.log("Done");
