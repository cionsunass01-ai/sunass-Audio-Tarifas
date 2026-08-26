const fs = require('fs');
let html = fs.readFileSync('sunass-plus---sunassplus/web-pages/emusap-abancay/content-pages/EMUSAP-ABANCAY.es-ES.webpage.copy.html', 'utf8');

// Header and Title
html = html.replace(/EMAPA HUARAL S.A\./g, 'EPS EMUSAP ABANCAY S.A.C.');
html = html.replace(/Emapa Huaral/g, 'EMUSAP ABANCAY');
html = html.replace(/EMAPA Huaral/g, 'EMUSAP ABANCAY');
html = html.replace(/Huaral/g, 'Abancay');

// Context
html = html.replace(
  /<p class="text-slate-600 leading-relaxed mb-6">[\s\S]*?<\/p>/,
  '<p class="text-slate-600 leading-relaxed mb-6">La <strong>EPS EMUSAP ABANCAY S.A.C.</strong> afronta riesgos de vulnerabilidad en su principal fuente hídrica (laguna Rontoccocha) por reducciones de caudal en época de estiaje. Además, opera con un parque de medidores altamente obsoleto y presenta deficiencias ambientales críticas: el 100% de las aguas residuales colectadas se vierten sin tratamiento al río Pachachaca y quebrada Ñacchero por inoperancia de sus sistemas. Debido a la no presentación de su Plan Maestro Optimizado, SUNASS inició de oficio el procedimiento de aprobación tarifaria.</p>'
);

// Periodo Regulatorio
html = html.replace(/2025-2027/g, '2019-2024');

// Mejoras Esperadas
html = html.replace(
  /<ul class="space-y-3 text-slate-600 text-sm mb-6">[\s\S]*?<\/ul>/,
  `<ul class="space-y-3 text-slate-600 text-sm mb-6">
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Sostenibilidad Hídrica:</strong> Implementación de proyectos forestales MRSE en Rontoccocha para asegurar la recarga del acuífero.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Tratamiento Ambiental:</strong> Puesta en operación de las plantas de tratamiento (PTAP Puruchaca y PTAR Illanya) para evitar vertimientos directos.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Digitalización y Micromedición:</strong> Renovación masiva de medidores y actualización al 100% del catastro técnico-comercial.</span></li>
  </ul>`
);

// Poblacion
html = html.replace(/86,220/g, '57,065'); // Población servida AP (Año 5)
html = html.replace(/98,168/g, '50,742'); // Población servida ALC (Año 5)

// Metas de Gestión (Gráficos)
html = html.replace(/const anFData = \[35, 29\];/, 'const anFData = [40.0, 39.0]; // ND, ilustrativo (base - 1%)');
html = html.replace(/const contData = \[18\.2, 19\];/, 'const contData = [21.0, 21.0]; // Abancay'); 
html = html.replace(/const microData = \[95, 98\];/, 'const microData = [82.6, 97.0]; // Abancay');
html = html.replace(/const presData = \[8\.5, 10\];/, 'const presData = [51.2, 50.0]; // Abancay'); 

// Metas a Nivel de Localidad
html = html.replace(/<table class="data-table glass-card rounded-2xl overflow-hidden">[\s\S]*?<\/table>/, `<table class="data-table glass-card rounded-2xl overflow-hidden">
        <thead><tr><th>Localidad</th><th>Continuidad (h/d)</th><th>Presión (m.c.a.)</th><th>Micromedición (%)</th></tr></thead>
        <tbody>
          <tr><td>Abancay</td><td>21.0</td><td>10.0 a 50.0</td><td>97.0 (aprox)</td></tr>
        </tbody>
      </table>`);

// Brechas y Acceso
html = html.replace(/makeCoverageDonut\('covApChart', 83\.8\);/, "makeCoverageDonut('covApChart', 77.3);");
html = html.replace(/makeCoverageDonut\('covSaneamientoChart', 76\.7\);/, "makeCoverageDonut('covSaneamientoChart', 75.3);");

// Sostenibilidad
html = html.replace(/<p class="text-3xl font-bold mt-2">100%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Micromedición<\/p>/, '<p class="text-3xl font-bold mt-2">82.6%</p>\n<p class="text-xs text-slate-400 mt-1">Micromedición (Base)</p>');
html = html.replace(/<p class="text-3xl font-bold mt-2">75%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Catastro comercial<\/p>/, '<p class="text-3xl font-bold mt-2">100%</p>\n<p class="text-xs text-slate-400 mt-1">Catastro (Año 5)</p>');

// Económico-Financiero
html = html.replace(/S\/ 4\.1 millones/g, 'S/ 1 773 338'); // Saldo inicial total reservas
html = html.replace(/S\/ 448 240/g, 'S/ 0'); // Deuda nueva
html = html.replace(/62\.3%/g, '9.2%'); // Incremento nominal simple acumulado fórmula
html = html.replace(/6\.50%/g, '2.6%'); // Incremento año 1

// Inversiones
html = html.replace(/S\/ 13 642 987/g, 'S/ 12 560 651'); // Total unificado
html = html.replace(/S\/ 12 415 790/g, 'S/ 8 708 495'); // Agua y saneamiento con fondo
html = html.replace(/S\/ 535 380/g, 'S/ 1 613 000'); // MRSE
html = html.replace(/S\/ 418 223/g, 'S/ 1 481 000'); // PCC PAS VMA
html = html.replace(/S\/ 273 593/g, 'S/ 2 239 156'); // GRD

html = html.replace(/data: \[6743600, 3951190, 1721000, 535380, 418223, 273593\]/, 'data: [0, 0, 8708495, 1613000, 1481000, 2239156]');

html = html.replace(/const projects = \[[\s\S]*?\];/, `const projects = [
  { name: "Renovación de redes secundarias de alcantarillado", category: "Obras", amount: 1968436, year: '2019-2024' },
  { name: "Mejoramiento de captaciones de la EPS", category: "Obras", amount: 181311, year: '2019-2024' },
  { name: "Muros de contención protección línea Rontococha", category: "Obras", amount: 89408, year: '2019-2024' }
];`);

// Tarifas
html = html.replace(/<p id="currentBill" class="text-2xl font-bold text-slate-600">S\/ 0\.00<\/p>/, '<p id="currentBill" class="text-2xl font-bold text-slate-600">S/ 17.03</p>'); // Ref base sin IGV
html = html.replace(/<p id="newBill1" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill1" class="text-3xl font-bold text-cyan-700">S/ 17.68</p>'); // Ref año 1 sin IGV
html = html.replace(/<p id="newBill3" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill3" class="text-3xl font-bold text-cyan-700">S/ 18.85</p>'); // Ref año 3 sin IGV

fs.writeFileSync('sunass-plus---sunassplus/web-pages/emusap-abancay/content-pages/EMUSAP-ABANCAY.es-ES.webpage.copy.html', html, 'utf8');
console.log("Done");
