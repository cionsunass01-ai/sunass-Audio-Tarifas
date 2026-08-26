const fs = require('fs');
let html = fs.readFileSync('sunass-plus---sunassplus/web-pages/sedahuanuco/content-pages/SEDAHUANUCO.es-ES.webpage.copy.html', 'utf8');

// Header and Title
html = html.replace(/EMAPA HUARAL S.A\./g, 'EPS SEDA HUÁNUCO S.A.');
html = html.replace(/Emapa Huaral/g, 'SEDAHUANUCO');
html = html.replace(/EMAPA Huaral/g, 'SEDAHUANUCO');
html = html.replace(/Huaral/g, 'Huánuco');

// Context
html = html.replace(
  /<p class="text-slate-600 leading-relaxed mb-6">[\s\S]*?<\/p>/,
  '<p class="text-slate-600 leading-relaxed mb-6">La <strong>EPS SEDA HUÁNUCO S.A.</strong> opera en Huánuco, Tingo María y Aucayacu. Su problemática principal reside en la alta turbiedad del río Higueras y la quebrada Tigre en época de lluvias, sumado a la disminución de caudales en estiaje por la deforestación de las microcuencas. Además, la carencia de Plantas de Tratamiento de Aguas Residuales (PTAR) obliga al vertimiento directo, contaminando los ríos Huallaga, Sangapilla y Aucayacu.</p>'
);

// Periodo Regulatorio
html = html.replace(/2025-2027/g, '2023-2028');

// Mejoras Esperadas
html = html.replace(
  /<ul class="space-y-3 text-slate-600 text-sm mb-6">[\s\S]*?<\/ul>/,
  `<ul class="space-y-3 text-slate-600 text-sm mb-6">
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Micromedición al 100%:</strong> Lograr y mantener el 100% de conexiones con medidor leído en todas las localidades.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Renovación masiva:</strong> Reemplazar más de 30,000 micromedidores obsoletos o con más de 5 años de antigüedad.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Catastro Técnico:</strong> Alcanzar el 100% de actualización catastral georreferenciada en la EPS.</span></li>
  </ul>`
);

// Poblacion
html = html.replace(/86,220/g, '190,568'); // inicio servida AP
html = html.replace(/98,168/g, '201,332'); // final servida AP

// Metas de Gestión (Gráficos)
html = html.replace(/const anFData = \[35, 29\];/, 'const anFData = [43.94, 39.94]; // Ref EPS (Huánuco y TM -4%)');
html = html.replace(/const contData = \[18\.2, 19\];/, 'const contData = [23.0, 23.0]; // Ref EPS promedio'); 
html = html.replace(/const microData = \[95, 98\];/, 'const microData = [84, 100];');
html = html.replace(/const presData = \[8\.5, 10\];/, 'const presData = [19.1, 19.1]; // Ref EPS promedio'); 

// Metas a Nivel de Localidad
html = html.replace(/<table class="data-table glass-card rounded-2xl overflow-hidden">[\s\S]*?<\/table>/, `<table class="data-table glass-card rounded-2xl overflow-hidden">
        <thead><tr><th>Localidad</th><th>Continuidad (h/d)</th><th>Presión (m.c.a.)</th><th>Micromedición (%)</th></tr></thead>
        <tbody>
          <tr><td>Huánuco</td><td>C (≥ 21.0)</td><td>P (≥ 17.0)</td><td>100.0</td></tr>
          <tr><td>Tingo María</td><td>C + 1 (≥ 19.0)</td><td>P (≥ 13.0)</td><td>100.0</td></tr>
          <tr><td>Aucayacu</td><td>C + 3 (≥ 19.0)</td><td>P (≥ 25.0)</td><td>100.0</td></tr>
        </tbody>
      </table>`);

// Brechas y Acceso
html = html.replace(/makeCoverageDonut\('covApChart', 83\.8\);/, "makeCoverageDonut('covApChart', 64.1);");
html = html.replace(/makeCoverageDonut\('covSaneamientoChart', 76\.7\);/, "makeCoverageDonut('covSaneamientoChart', 59.0);");

// Sostenibilidad
html = html.replace(/<p class="text-3xl font-bold mt-2">100%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Micromedición<\/p>/, '<p class="text-3xl font-bold mt-2">84%</p>\n<p class="text-xs text-slate-400 mt-1">Micromedición (Base)</p>');
html = html.replace(/<p class="text-3xl font-bold mt-2">75%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Catastro comercial<\/p>/, '<p class="text-3xl font-bold mt-2">100%</p>\n<p class="text-xs text-slate-400 mt-1">Catastro (Año 4-5)</p>');

// Económico-Financiero
html = html.replace(/S\/ 4\.1 millones/g, 'S/ 11 223 701'); // Saldo inicial fondo inv
html = html.replace(/S\/ 448 240/g, 'S/ 14 827 703'); // Deuda Fonavi
html = html.replace(/62\.3%/g, '12.53%'); // Incremento acumulado
html = html.replace(/6\.50%/g, '0.0%'); // Incremento año 1

// Inversiones
html = html.replace(/S\/ 13 642 987/g, 'S/ 46 132 482'); // Total unificado con OTASS
html = html.replace(/S\/ 12 415 790/g, 'S/ 39 831 045'); // Agua y saneamiento sin otass
html = html.replace(/S\/ 535 380/g, 'S/ 743 096'); // MRSE
html = html.replace(/S\/ 418 223/g, 'S/ 1 672 483'); // PCC
html = html.replace(/S\/ 273 593/g, 'S/ 973 399'); // GRD

html = html.replace(/data: \[6743600, 3951190, 1721000, 535380, 418223, 273593\]/, 'data: [0, 0, 39831045, 743096, 1672483, 973399]');

html = html.replace(/const projects = \[[\s\S]*?\];/, `const projects = [
  { name: "Elaboración e implementación del catastro en Huánuco", category: "Comercial", amount: 6290125, year: '2023-2028' },
  { name: "Ampliación de agua y alcantarillado en Aucayacu", category: "Obras", amount: 3807218, year: '2023-2028' },
  { name: "Renovación de conexiones en Huánuco, T. María y Aucayacu", category: "Obras", amount: 2652894, year: '2023-2028' }
];`);

// Tarifas
html = html.replace(/<p id="currentBill" class="text-2xl font-bold text-slate-600">S\/ 0\.00<\/p>/, '<p id="currentBill" class="text-2xl font-bold text-slate-600">S/ 20.90</p>');
html = html.replace(/<p id="newBill1" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill1" class="text-3xl font-bold text-cyan-700">S/ 21.60</p>'); // No benef
html = html.replace(/<p id="newBill3" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill3" class="text-3xl font-bold text-cyan-700">S/ 0.00</p>'); // ND soles

fs.writeFileSync('sunass-plus---sunassplus/web-pages/sedahuanuco/content-pages/SEDAHUANUCO.es-ES.webpage.copy.html', html, 'utf8');
console.log("Done");
