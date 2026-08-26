const fs = require('fs');
let html = fs.readFileSync('sunass-plus---sunassplus/web-pages/unidad-002-tumbes/content-pages/Unidad-002-Tumbes.es-ES.webpage.copy.html', 'utf8');

// Header and Title
html = html.replace(/EMAPA HUARAL S.A\./g, 'AGUA TUMBES');
html = html.replace(/Emapa Huaral/g, 'Agua Tumbes');
html = html.replace(/EMAPA Huaral/g, 'Agua Tumbes');
html = html.replace(/Huaral/g, 'Tumbes');

// Context
html = html.replace(
  /<p class="text-slate-600 leading-relaxed mb-6">[\s\S]*?<\/p>/,
  '<p class="text-slate-600 leading-relaxed mb-6">La <strong>Unidad Ejecutora 002 Servicios de Saneamiento de Tumbes (UESST)</strong>, comercialmente "Agua Tumbes", opera en régimen transitorio (OTASS). Enfrenta una severa crisis económico-financiera, alta tasa de agua no facturada (68.3%), bajísima continuidad (ej. 3.6 h/d en Zorritos) y problemas socioambientales por metales pesados en el río Tumbes.</p>'
);

// Periodo Regulatorio
html = html.replace(/2025-2027/g, '2023-2027');

// Mejoras Esperadas
html = html.replace(
  /<ul class="space-y-3 text-slate-600 text-sm mb-6">[\s\S]*?<\/ul>/,
  `<ul class="space-y-3 text-slate-600 text-sm mb-6">
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Reducir pérdidas:</strong> físicas y comerciales mediante la renovación del parque de medidores.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Incrementar cobertura y continuidad:</strong> priorizando obras de infraestructura clave.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Focalizar subsidios:</strong> para beneficiar a la población vulnerable según el SISFOH.</span></li>
  </ul>`
);

// Poblacion
html = html.replace(/86,220/g, '230,831'); // inicio
html = html.replace(/98,168/g, '247,266'); // final

// Metas de Gestión (Gráficos)
html = html.replace(/const anFData = \[35, 29\];/, 'const anFData = [68.3, 0]; // 0 means variable (TBD)');
html = html.replace(/const contData = \[18\.2, 19\];/, 'const contData = [11.5, 0]; // 0 means variable C'); 
html = html.replace(/const microData = \[95, 98\];/, 'const microData = [35.3, 0]; // 0 means variable TBD');
html = html.replace(/const presData = \[8\.5, 10\];/, 'const presData = [8, 0]; // 8 avg, 0 means variable P'); 

// Metas a Nivel de Localidad
html = html.replace(/<tbody>\s*<tr><td>Jaén<\/td><td>21<\/td><td>10-50<\/td><td>98<\/td><\/tr>[\s\S]*?<\/tbody>/, `<tbody>
  <tr><td>Tumbes</td><td>C</td><td>P</td><td>4,662 (reemplazos)</td></tr>
  <tr><td>Corrales</td><td>C</td><td>P</td><td>2,189 (reemplazos)</td></tr>
  <tr><td>Zorritos</td><td>C</td><td>P</td><td>1,164 (reemplazos)</td></tr>
</tbody>`);
// wait I replaced Jaén previously for Marañón, but I copied Huaral, so the target is:
html = html.replace(/<tbody><tr><td>Tumbes<\/td><td>19<\/td><td>10<\/td><td>98<\/td><\/tr><\/tbody>/, `<tbody>
  <tr><td>Tumbes</td><td>C (Variable)</td><td>P (Variable)</td><td>Metas por cantidad</td></tr>
</tbody>`); // Note: above line is fallback just in case.

// Brechas y Acceso
html = html.replace(/makeCoverageDonut\('covApChart', 83\.8\);/, "makeCoverageDonut('covApChart', 81.9);");
html = html.replace(/makeCoverageDonut\('covSaneamientoChart', 76\.7\);/, "makeCoverageDonut('covSaneamientoChart', 50.2);");

// Sostenibilidad
html = html.replace(/<p class="text-3xl font-bold mt-2">100%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Micromedición<\/p>/, '<p class="text-3xl font-bold mt-2">35.3%</p>\n<p class="text-xs text-slate-400 mt-1">Micromedición</p>');
html = html.replace(/<p class="text-3xl font-bold mt-2">75%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Catastro comercial<\/p>/, '<p class="text-3xl font-bold mt-2">ND</p>\n<p class="text-xs text-slate-400 mt-1">Catastro comercial</p>');

// Económico-Financiero
html = html.replace(/S\/ 4\.1 millones/g, 'S/ 0');
html = html.replace(/S\/ 448 240/g, 'S/ 0');
html = html.replace(/62\.3%/g, '12.4%'); // Incremento acumulado
html = html.replace(/6\.50%/g, '0.0%'); // Incremento año 1

// Inversiones
html = html.replace(/S\/ 13 642 987/g, 'S/ 18 698 606');
html = html.replace(/S\/ 12 415 790/g, 'S/ 18 698 606');
html = html.replace(/S\/ 535 380/g, 'S/ 264 000');
html = html.replace(/S\/ 418 223/g, 'S/ 0');
html = html.replace(/S\/ 273 593/g, 'S/ 126 000');

html = html.replace(/data: \[6743600, 3951190, 1721000, 535380, 418223, 273593\]/, 'data: [0, 0, 18698606, 264000, 0, 126000]');

html = html.replace(/const projects = \[[\s\S]*?\];/, `const projects = [
  { name: "Mejoramiento AP zona sur de Tumbes (1° etapa)", category: "Ampliación", amount: 9101540, year: '2023-2027' },
  { name: "Renovación de 13,352 medidores", category: "Mejora", amount: 4625488, year: '2023-2027' },
  { name: "Actualización de catastro técnico y comercial (Tumbes)", category: "Institucional", amount: 3004026, year: '2023-2027' }
];`);

// Tarifas 
html = html.replace(/<p id="currentBill" class="text-2xl font-bold text-slate-600">S\/ 0\.00<\/p>/, '<p id="currentBill" class="text-2xl font-bold text-slate-600">S/ 39.02</p>');
html = html.replace(/<p id="newBill1" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill1" class="text-3xl font-bold text-cyan-700">S/ 39.18</p>');
html = html.replace(/<p id="newBill3" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill3" class="text-3xl font-bold text-cyan-700">S/ 43.66</p>');

fs.writeFileSync('sunass-plus---sunassplus/web-pages/unidad-002-tumbes/content-pages/Unidad-002-Tumbes.es-ES.webpage.copy.html', html, 'utf8');
console.log("Done");
