const fs = require('fs');
let html = fs.readFileSync('sunass-plus---sunassplus/web-pages/moquegua/content-pages/MOQUEGUA.es-ES.webpage.copy.html', 'utf8');

// Header and Title
html = html.replace(/EMAPA HUARAL S.A\./g, 'EPS MOQUEGUA S.A.');
html = html.replace(/Emapa Huaral/g, 'EPS MOQUEGUA');
html = html.replace(/EMAPA Huaral/g, 'EPS MOQUEGUA');
html = html.replace(/Huaral/g, 'Moquegua');

// Context
html = html.replace(
  /<p class="text-slate-600 leading-relaxed mb-6">[\s\S]*?<\/p>/,
  '<p class="text-slate-600 leading-relaxed mb-6">La <strong>EPS MOQUEGUA S.A.</strong> (Mediana) afronta graves retos en la calidad del agua debido a la presencia de metales pesados (aluminio, arsénico, manganeso) en su principal fuente, Pasto Grande, y turbidez extrema en época de lluvias. Para potabilizar el agua, se requieren complejos procesos de remoción química, lo que incrementa los costos operativos. Adicionalmente, reporta niveles de agua no facturada del 30.15% y enfrenta el desafío de lograr una micromedición integral mediante la renovación de su parque de medidores.</p>'
);

// Periodo Regulatorio
html = html.replace(/2025-2027/g, '2023-2027');

// Mejoras Esperadas
html = html.replace(
  /<ul class="space-y-3 text-slate-600 text-sm mb-6">[\s\S]*?<\/ul>/,
  `<ul class="space-y-3 text-slate-600 text-sm mb-6">
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Tratamiento y Calidad:</strong> Optimización de equipamiento para medición de pH, dosificación, filtros y SCADA en la PTAP Chen Chen.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Eficiencia Comercial:</strong> Masificación de la micromedición con la renovación de 11,537 medidores para abatir el Agua No Facturada a menos de 25%.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Resiliencia Hídrica:</strong> Inversión en Mecanismos de Retribución por Servicios Ecosistémicos (MRSE) en la subcuenca del río Tumilaca.</span></li>
  </ul>`
);

// Poblacion
html = html.replace(/86,220/g, '70,310'); // Población servida AP (Año 5)
html = html.replace(/98,168/g, '58,853'); // Población servida ALC (Año 5)

// Metas de Gestión (Gráficos)
html = html.replace(/const anFData = \[35, 29\];/, 'const anFData = [30.15, 25.0]; // Moquegua (Meta < 25)');
html = html.replace(/const contData = \[18\.2, 19\];/, 'const contData = [23.9, 23.9]; // Moquegua'); 
html = html.replace(/const microData = \[95, 98\];/, 'const microData = [91.57, 100.0]; // Moquegua');
html = html.replace(/const presData = \[8\.5, 10\];/, 'const presData = [31.8, 30.0]; // Moquegua'); 

// Metas a Nivel de Localidad
html = html.replace(/<table class="data-table glass-card rounded-2xl overflow-hidden">[\s\S]*?<\/table>/, `<table class="data-table glass-card rounded-2xl overflow-hidden">
        <thead><tr><th>Localidad</th><th>Continuidad (h/d)</th><th>Presión (m.c.a.)</th><th>Micromedición (%)</th></tr></thead>
        <tbody>
          <tr><td>Moquegua</td><td>23.9</td><td>30.0</td><td>100.0</td></tr>
        </tbody>
      </table>`);

// Brechas y Acceso
html = html.replace(/makeCoverageDonut\('covApChart', 83\.8\);/, "makeCoverageDonut('covApChart', 98.9);");
html = html.replace(/makeCoverageDonut\('covSaneamientoChart', 76\.7\);/, "makeCoverageDonut('covSaneamientoChart', 84.8);");

// Sostenibilidad
html = html.replace(/<p class="text-3xl font-bold mt-2">100%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Micromedición<\/p>/, '<p class="text-3xl font-bold mt-2">100%</p>\n<p class="text-xs text-slate-400 mt-1">Micromedición (Año 5)</p>');
html = html.replace(/<p class="text-3xl font-bold mt-2">75%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Catastro comercial<\/p>/, '<p class="text-3xl font-bold mt-2">100%</p>\n<p class="text-xs text-slate-400 mt-1">Catastro (Actual y Meta)</p>');

// Económico-Financiero
html = html.replace(/S\/ 4\.1 millones/g, 'S/ 541 724'); // Saldo inicial en caja indicado
html = html.replace(/S\/ 448 240/g, 'S/ 0'); // Deuda nueva
html = html.replace(/62\.3%/g, '15.4%'); // Incremento nominal acumulado simple
html = html.replace(/6\.50%/g, '0.0%'); // Incremento año 1

// Inversiones
html = html.replace(/S\/ 13 642 987/g, 'S/ 16 880 689'); // Total unificado
html = html.replace(/S\/ 12 415 790/g, 'S/ 15 420 082'); // Agua y saneamiento
html = html.replace(/S\/ 535 380/g, 'S/ 632 532'); // MRSE
html = html.replace(/S\/ 418 223/g, 'S/ 0'); // PCC PAS (sin asignar global separado)
html = html.replace(/S\/ 273 593/g, 'S/ 828 075'); // GRD

html = html.replace(/data: \[6743600, 3951190, 1721000, 535380, 418223, 273593\]/, 'data: [0, 0, 15420082, 632532, 0, 828075]');

html = html.replace(/const projects = \[[\s\S]*?\];/, `const projects = [
  { name: "Optimización equipamiento (pH, dosificación, mezcla) en PTAP Chen Chen", category: "Obras", amount: 2041513, year: '2023-2027' },
  { name: "Adquisición y renovación de maquinarias y vehículos", category: "Obras", amount: 1783694, year: '2023-2027' },
  { name: "Renovación de 11,537 medidores de agua en Moquegua", category: "Comercial", amount: 1621127, year: '2023-2027' }
];`);

// Tarifas
html = html.replace(/<p id="currentBill" class="text-2xl font-bold text-slate-600">S\/ 0\.00<\/p>/, '<p id="currentBill" class="text-2xl font-bold text-slate-600">S/ 31.39</p>'); // Ref base sin IGV
html = html.replace(/<p id="newBill1" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill1" class="text-3xl font-bold text-cyan-700">S/ 32.52</p>'); // Ref año 1 sin IGV (Reordenamiento)
html = html.replace(/<p id="newBill3" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill3" class="text-3xl font-bold text-cyan-700">S/ 35.19</p>'); // Ref año 3 sin IGV

fs.writeFileSync('sunass-plus---sunassplus/web-pages/moquegua/content-pages/MOQUEGUA.es-ES.webpage.copy.html', html, 'utf8');
console.log("Done");
