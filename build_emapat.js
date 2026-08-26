const fs = require('fs');
let html = fs.readFileSync('sunass-plus---sunassplus/web-pages/emapat/content-pages/EMAPAT.es-ES.webpage.copy.html', 'utf8');

// Header and Title
html = html.replace(/EMAPA HUARAL S.A\./g, 'EPS EMAPAT S.A.');
html = html.replace(/Emapa Huaral/g, 'EMAPAT');
html = html.replace(/EMAPA Huaral/g, 'EMAPAT');
html = html.replace(/Huaral/g, 'Puerto Maldonado y El Triunfo');

// Context
html = html.replace(
  /<p class="text-slate-600 leading-relaxed mb-6">[\s\S]*?<\/p>/,
  '<p class="text-slate-600 leading-relaxed mb-6">La <strong>EPS EMAPAT S.A.</strong> atiende a Puerto Maldonado y El Triunfo en Madre de Dios. Enfrenta fuertes retos debido a un parque de micromedidores obsoleto (más de 3,000 medidores han superado su vida útil) y la alarmante falta de tratamiento de aguas residuales, generando descargas directas a los ríos. A ello se suma la alta vulnerabilidad de su captación superficial (La Pastora) y picos de turbidez extrema en lluvias, que elevan sus costos de producción hasta en un 200%.</p>'
);

// Periodo Regulatorio
html = html.replace(/2025-2027/g, '2023-2027');

// Mejoras Esperadas
html = html.replace(
  /<ul class="space-y-3 text-slate-600 text-sm mb-6">[\s\S]*?<\/ul>/,
  `<ul class="space-y-3 text-slate-600 text-sm mb-6">
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Universalización de micromedición:</strong> Lograr cobertura del 100% mediante la renovación masiva e instalación de nuevos equipos.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Mitigación de riesgos (GRD):</strong> Asegurar la captación mediante balsa cautiva y robustecer los sistemas eléctricos frente a inundaciones.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Implementación MRSE:</strong> Conservar la microcuenca Jayave para controlar la erosión y regular los caudales superficiales.</span></li>
  </ul>`
);

// Poblacion
html = html.replace(/86,220/g, '87,903'); // Población servida AP (Año 5)
html = html.replace(/98,168/g, '38,449'); // Población servida ALC (Año 5)

// Metas de Gestión (Gráficos)
html = html.replace(/const anFData = \[35, 29\];/, 'const anFData = [27.9, 31.0]; // Ref Pto Maldonado');
html = html.replace(/const contData = \[18\.2, 19\];/, 'const contData = [24.0, 24.0]; // Ref Pto Maldonado'); 
html = html.replace(/const microData = \[95, 98\];/, 'const microData = [98.2, 100]; // Ref Pto Maldonado');
html = html.replace(/const presData = \[8\.5, 10\];/, 'const presData = [20.8, 22.0]; // Ref Pto Maldonado'); 

// Metas a Nivel de Localidad
html = html.replace(/<table class="data-table glass-card rounded-2xl overflow-hidden">[\s\S]*?<\/table>/, `<table class="data-table glass-card rounded-2xl overflow-hidden">
        <thead><tr><th>Localidad</th><th>Continuidad (h/d)</th><th>Presión (m.c.a.)</th><th>Micromedición (%)</th></tr></thead>
        <tbody>
          <tr><td>Puerto Maldonado</td><td>24.0</td><td>22.0</td><td>100.0</td></tr>
          <tr><td>El Triunfo</td><td>C (Base)</td><td>P (Base)</td><td>100.0</td></tr>
        </tbody>
      </table>`);

// Brechas y Acceso
html = html.replace(/makeCoverageDonut\('covApChart', 83\.8\);/, "makeCoverageDonut('covApChart', 72.1);");
html = html.replace(/makeCoverageDonut\('covSaneamientoChart', 76\.7\);/, "makeCoverageDonut('covSaneamientoChart', 33.8);");

// Sostenibilidad
html = html.replace(/<p class="text-3xl font-bold mt-2">100%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Micromedición<\/p>/, '<p class="text-3xl font-bold mt-2">98.2%</p>\n<p class="text-xs text-slate-400 mt-1">Micromedición (Pto Mal.)</p>');
html = html.replace(/<p class="text-3xl font-bold mt-2">75%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Catastro comercial<\/p>/, '<p class="text-3xl font-bold mt-2">100%</p>\n<p class="text-xs text-slate-400 mt-1">Catastro (Actual)</p>');

// Económico-Financiero
html = html.replace(/S\/ 4\.1 millones/g, 'S/ 7 810 249'); // Saldo inicial total de reservas
html = html.replace(/S\/ 448 240/g, 'S/ 0'); // Deuda nueva
html = html.replace(/62\.3%/g, '4.10%'); // Incremento AP base
html = html.replace(/6\.50%/g, '0.0%'); // Incremento año 1

// Inversiones
html = html.replace(/S\/ 13 642 987/g, 'S/ 27 522 584'); // Total unificado
html = html.replace(/S\/ 12 415 790/g, 'S/ 23 193 251'); // Agua y saneamiento
html = html.replace(/S\/ 535 380/g, 'S/ 1 200 000'); // MRSE
html = html.replace(/S\/ 418 223/g, 'S/ 379 136'); // PCC PAS
html = html.replace(/S\/ 273 593/g, 'S/ 2 750 197'); // GRD

html = html.replace(/data: \[6743600, 3951190, 1721000, 535380, 418223, 273593\]/, 'data: [0, 0, 23193251, 1200000, 379136, 2750197]');

html = html.replace(/const projects = \[[\s\S]*?\];/, `const projects = [
  { name: "Renovación balsa flotante, bomba y tablero en Billinghurst", category: "Obras", amount: 2549107, year: '2023-2027' },
  { name: "Renovación de medidores inoperativos a nivel global", category: "Comercial", amount: 1955198, year: '2023-2027' },
  { name: "Casa de fuerza y grupo electrógeno en PTAP La Pastora", category: "Obras", amount: 1462372, year: '2023-2027' }
];`);

// Tarifas
html = html.replace(/<p id="currentBill" class="text-2xl font-bold text-slate-600">S\/ 0\.00<\/p>/, '<p id="currentBill" class="text-2xl font-bold text-slate-600">S/ 64.82</p>'); // Ref base sin IGV
html = html.replace(/<p id="newBill1" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill1" class="text-3xl font-bold text-cyan-700">S/ 65.14</p>'); // Ref año 1 ND
html = html.replace(/<p id="newBill3" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill3" class="text-3xl font-bold text-cyan-700">S/ 68.83</p>'); // Ref año 3

fs.writeFileSync('sunass-plus---sunassplus/web-pages/emapat/content-pages/EMAPAT.es-ES.webpage.copy.html', html, 'utf8');
console.log("Done");
