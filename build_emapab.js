const fs = require('fs');
let html = fs.readFileSync('sunass-plus---sunassplus/web-pages/emapab/content-pages/EMAPAB.es-ES.webpage.copy.html', 'utf8');

// Header and Title
html = html.replace(/EMAPA HUARAL S.A\./g, 'EPS EMAPAB S.A.');
html = html.replace(/Emapa Huaral/g, 'EMAPAB');
html = html.replace(/EMAPA Huaral/g, 'EMAPAB');
html = html.replace(/Huaral/g, 'Bagua');

// Context
html = html.replace(
  /<p class="text-slate-600 leading-relaxed mb-6">[\s\S]*?<\/p>/,
  '<p class="text-slate-600 leading-relaxed mb-6">La <strong>EPS EMAPAB S.A.</strong> administra Bagua y se encuentra bajo el Régimen de Apoyo Transitorio (RAT) desde 2018. Enfrenta una alta vulnerabilidad ante deslizamientos en su línea de conducción principal, elevadísimas pérdidas de agua (53%) y un servicio crítico de apenas 6.2 horas/día. Además, carece de PTAR, vertiendo aguas servidas directamente al río Utcubamba.</p>'
);

// Periodo Regulatorio
html = html.replace(/2025-2027/g, '2023-2027');

// Mejoras Esperadas
html = html.replace(
  /<ul class="space-y-3 text-slate-600 text-sm mb-6">[\s\S]*?<\/ul>/,
  `<ul class="space-y-3 text-slate-600 text-sm mb-6">
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Aumento de continuidad:</strong> Pasar de 7 h/d en el Año 1 a alcanzar 9 h/d en los Años 4 y 5.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Reducción de pérdidas:</strong> Bajar gradualmente el Agua No Facturada de 50% a 47%.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Catastros actualizados:</strong> Implementar al 100% el Catastro Comercial desde Año 1 y el Técnico en el Año 4.</span></li>
  </ul>`
);

// Poblacion
html = html.replace(/86,220/g, '19,214'); // inicio servida AP
html = html.replace(/98,168/g, '20,604'); // final servida AP

// Metas de Gestión (Gráficos)
html = html.replace(/const anFData = \[35, 29\];/, 'const anFData = [53, 47]; // Base 2020: 53%');
html = html.replace(/const contData = \[18\.2, 19\];/, 'const contData = [6.2, 9.0];'); 
html = html.replace(/const microData = \[95, 98\];/, 'const microData = [33.6, 0]; // 0 = meta final porcentual no disponible');
html = html.replace(/const presData = \[8\.5, 10\];/, 'const presData = [19.0, 19.0];'); 

// Metas a Nivel de Localidad
html = html.replace(/<table class="data-table glass-card rounded-2xl overflow-hidden">[\s\S]*?<\/table>/, `<table class="data-table glass-card rounded-2xl overflow-hidden">
        <thead><tr><th>Localidad</th><th>Continuidad (h/d)</th><th>Presión (m.c.a.)</th><th>Micromedición (%)</th></tr></thead>
        <tbody>
          <tr><td>Bagua</td><td>9.0</td><td>19.0</td><td>Meta anual (física)</td></tr>
        </tbody>
      </table>`);

// Brechas y Acceso
html = html.replace(/makeCoverageDonut\('covApChart', 83\.8\);/, "makeCoverageDonut('covApChart', 73.3);");
html = html.replace(/makeCoverageDonut\('covSaneamientoChart', 76\.7\);/, "makeCoverageDonut('covSaneamientoChart', 80.7);");

// Sostenibilidad
html = html.replace(/<p class="text-3xl font-bold mt-2">100%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Micromedición<\/p>/, '<p class="text-3xl font-bold mt-2">33.6%</p>\n<p class="text-xs text-slate-400 mt-1">Micromedición (Base)</p>');
html = html.replace(/<p class="text-3xl font-bold mt-2">75%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Catastro comercial<\/p>/, '<p class="text-3xl font-bold mt-2">100%</p>\n<p class="text-xs text-slate-400 mt-1">Catastro (Meta Año 1-5)</p>');

// Económico-Financiero
html = html.replace(/S\/ 4\.1 millones/g, 'S/ 204 414'); // Saldo inicial total ref.
html = html.replace(/S\/ 448 240/g, 'S/ 0'); // Deudas 
html = html.replace(/62\.3%/g, '15.24%'); // Incremento acumulado
html = html.replace(/6\.50%/g, '0.0%'); // Incremento año 1

// Inversiones
html = html.replace(/S\/ 13 642 987/g, 'S/ 2 877 350');
html = html.replace(/S\/ 12 415 790/g, 'S/ 2 576 869'); // Agua y saneamiento
html = html.replace(/S\/ 535 380/g, 'S/ 69 000'); // MRSE
html = html.replace(/S\/ 418 223/g, 'S/ 187 481'); // PCC
html = html.replace(/S\/ 273 593/g, 'S/ 44 000'); // GRD

html = html.replace(/data: \[6743600, 3951190, 1721000, 535380, 418223, 273593\]/, 'data: [0, 0, 2576869, 69000, 187481, 44000]');

html = html.replace(/const projects = \[[\s\S]*?\];/, `const projects = [
  { name: "Mejoramiento líneas de conducción de agua tratada", category: "Obras", amount: 783335, year: '2023-2027' },
  { name: "Instalación de 2,634 nuevos medidores de agua", category: "Comercial", amount: 764740, year: '2023-2027' },
  { name: "Optimización del catastro técnico georreferenciado", category: "Técnico", amount: 457835, year: '2023-2027' }
];`);

// Tarifas
html = html.replace(/<p id="currentBill" class="text-2xl font-bold text-slate-600">S\/ 0\.00<\/p>/, '<p id="currentBill" class="text-2xl font-bold text-slate-600">S/ 17.50</p>');
html = html.replace(/<p id="newBill1" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill1" class="text-3xl font-bold text-cyan-700">S/ 17.90</p>');
html = html.replace(/<p id="newBill3" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill3" class="text-3xl font-bold text-cyan-700">S/ 0.00</p>'); // ND

fs.writeFileSync('sunass-plus---sunassplus/web-pages/emapab/content-pages/EMAPAB.es-ES.webpage.copy.html', html, 'utf8');
console.log("Done");
