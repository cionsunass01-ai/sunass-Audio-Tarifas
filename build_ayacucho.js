const fs = require('fs');
let html = fs.readFileSync('sunass-plus---sunassplus/web-pages/seda-ayacucho/content-pages/SEDA-AYACUCHO.es-ES.webpage.copy.html', 'utf8');

// Header and Title
html = html.replace(/EMAPA HUARAL S.A\./g, 'SEDA AYACUCHO S.A.');
html = html.replace(/Emapa Huaral/g, 'SEDA AYACUCHO');
html = html.replace(/EMAPA Huaral/g, 'SEDA AYACUCHO');
html = html.replace(/Huaral/g, 'Huamanga');

// Context
html = html.replace(
  /<p class="text-slate-600 leading-relaxed mb-6">[\s\S]*?<\/p>/,
  '<p class="text-slate-600 leading-relaxed mb-6"><strong>SEDA AYACUCHO S.A.</strong> brinda servicios en las provincias de Huamanga y Huanta. Sus problemáticas destacan por un elevado índice de pérdidas (ANF), presencia de metales (aluminio, hierro) en la captación de Apacheta, contaminación microbiológica de la laguna Cuchoquesera, fallas e inoperatividad en filtros de la PTAR Totora, sobrecarga en la PTAR Ichpico (Huanta), y sectores críticos con solo 4-5 horas al día de servicio.</p>'
);

// Periodo Regulatorio
html = html.replace(/2025-2027/g, '2022-2027');

// Mejoras Esperadas
html = html.replace(
  /<ul class="space-y-3 text-slate-600 text-sm mb-6">[\s\S]*?<\/ul>/,
  `<ul class="space-y-3 text-slate-600 text-sm mb-6">
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Reducción de agua no facturada:</strong> Renovación de parque obsoleto de medidores.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Actualización de catastros:</strong> 100% de actualización catastral técnica y comercial en Año 5.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Mejora en la continuidad:</strong> Pasar de 20 a 21 h/d en Huamanga y de 18 a 19 h/d en Huanta.</span></li>
  </ul>`
);

// Poblacion
html = html.replace(/86,220/g, '281,970'); // inicio 
html = html.replace(/98,168/g, '310,825'); // final 

// Metas de Gestión (Gráficos)
html = html.replace(/const anFData = \[35, 29\];/, 'const anFData = [0, -3]; // 0 por determinar. Meta: -3.0%');
html = html.replace(/const contData = \[18\.2, 19\];/, 'const contData = [19.6, 21.0]; // 21 en Huamanga, 19 en Huanta'); 
html = html.replace(/const microData = \[95, 98\];/, 'const microData = [90.5, 0]; // 0 indica meta física por renovación');
html = html.replace(/const presData = \[8\.5, 10\];/, 'const presData = [0, 0]; // ND'); 

// Metas a Nivel de Localidad
html = html.replace(/<table class="data-table glass-card rounded-2xl overflow-hidden">[\s\S]*?<\/table>/, `<table class="data-table glass-card rounded-2xl overflow-hidden">
        <thead><tr><th>Localidad</th><th>Continuidad (h/d)</th><th>Presión (m.c.a.)</th><th>Micromedición (%)</th></tr></thead>
        <tbody>
          <tr><td>Huamanga</td><td>21.0</td><td>ND</td><td>Meta física</td></tr>
          <tr><td>Huanta</td><td>19.0</td><td>ND</td><td>Meta física</td></tr>
        </tbody>
      </table>`);

// Brechas y Acceso
html = html.replace(/makeCoverageDonut\('covApChart', 83\.8\);/, "makeCoverageDonut('covApChart', 92.80);"); // Usamos el dato de Huamanga que es más alto, no hay promedio global
html = html.replace(/makeCoverageDonut\('covSaneamientoChart', 76\.7\);/, "makeCoverageDonut('covSaneamientoChart', 85.70);");

// Sostenibilidad
html = html.replace(/<p class="text-3xl font-bold mt-2">100%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Micromedición<\/p>/, '<p class="text-3xl font-bold mt-2">90.5%</p>\n<p class="text-xs text-slate-400 mt-1">Micromedición (Prom.)</p>');
html = html.replace(/<p class="text-3xl font-bold mt-2">75%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Catastro comercial<\/p>/, '<p class="text-3xl font-bold mt-2">100%</p>\n<p class="text-xs text-slate-400 mt-1">Catastro (Meta Año 5)</p>');

// Económico-Financiero
html = html.replace(/S\/ 4\.1 millones/g, 'S/ 18 300 000'); // Total fondo inicial consolidado
html = html.replace(/S\/ 448 240/g, 'S/ 5 420 069'); // Deudas
html = html.replace(/62\.3%/g, '13.42%'); // Incremento acumulado
html = html.replace(/6\.50%/g, '0.0%'); // Incremento año 1

// Inversiones
html = html.replace(/S\/ 13 642 987/g, 'S/ 56 072 148');
html = html.replace(/S\/ 12 415 790/g, 'S/ 52 289 214'); // Agua y saneamiento
html = html.replace(/S\/ 535 380/g, 'S/ 1 714 723'); // MRSE
html = html.replace(/S\/ 418 223/g, 'S/ 1 019 211'); // PCC
html = html.replace(/S\/ 273 593/g, 'S/ 1 049 000'); // GRD

html = html.replace(/data: \[6743600, 3951190, 1721000, 535380, 418223, 273593\]/, 'data: [0, 0, 52289214, 1714723, 1019211, 1049000]');

html = html.replace(/const projects = \[[\s\S]*?\];/, `const projects = [
  { name: "Renovación de medidores en la localidad de Huamanga", category: "Comercial", amount: 6544574, year: '2022-2027' },
  { name: "Renovación de redes de distribución de agua - Huamanga", category: "Distribución", amount: 3362026, year: '2022-2027' },
  { name: "Mejoramiento del catastro técnico operacional (Huamanga y Huanta)", category: "Comercial/Técnico", amount: 2391475, year: '2022-2027' }
];`);

// Tarifas
html = html.replace(/<p id="currentBill" class="text-2xl font-bold text-slate-600">S\/ 0\.00<\/p>/, '<p id="currentBill" class="text-2xl font-bold text-slate-600">S/ 22.05</p>');
html = html.replace(/<p id="newBill1" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill1" class="text-3xl font-bold text-cyan-700">S/ 22.99</p>');
html = html.replace(/<p id="newBill3" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill3" class="text-3xl font-bold text-cyan-700">S/ 24.37</p>');

fs.writeFileSync('sunass-plus---sunassplus/web-pages/seda-ayacucho/content-pages/SEDA-AYACUCHO.es-ES.webpage.copy.html', html, 'utf8');
console.log("Done");
