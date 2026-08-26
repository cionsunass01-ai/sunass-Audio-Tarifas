const fs = require('fs');
let html = fs.readFileSync('sunass-plus---sunassplus/web-pages/sedam-huancayo/content-pages/SEDAM-HUANCAYO.es-ES.webpage.copy.html', 'utf8');

// Header and Title
html = html.replace(/EMAPA HUARAL S.A\./g, 'EPS SEDAM HUANCAYO S.A.');
html = html.replace(/Emapa Huaral/g, 'SEDAM HUANCAYO');
html = html.replace(/EMAPA Huaral/g, 'SEDAM HUANCAYO');
html = html.replace(/Huaral/g, 'Huancayo');

// Context
html = html.replace(
  /<p class="text-slate-600 leading-relaxed mb-6">[\s\S]*?<\/p>/,
  '<p class="text-slate-600 leading-relaxed mb-6">La <strong>EPS SEDAM HUANCAYO S.A.</strong> atiende a Huancayo, Orcotuna, Viques y Huacrapuquio. Su diagnóstico revela altas pérdidas de agua (38.9%), deficiente micromedición (37%) y nulo catastro comercial en la línea base. Además, zonas como Orcotuna y Viques sufren una bajísima continuidad (5 horas/día) y existe un déficit grave de plantas de tratamiento de aguas residuales, generando descargas directas al río Mantaro.</p>'
);

// Periodo Regulatorio
html = html.replace(/2025-2027/g, '2023-2028');

// Mejoras Esperadas
html = html.replace(
  /<ul class="space-y-3 text-slate-600 text-sm mb-6">[\s\S]*?<\/ul>/,
  `<ul class="space-y-3 text-slate-600 text-sm mb-6">
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Continuidad y presión:</strong> Rehabilitar redes y líneas de aducción para mejorar el servicio y sostener la presión regulatoria mínima.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Micromedición masiva:</strong> Instalar y renovar medidores para elevar el indicador al 88% en Huancayo y 92% en Orcotuna.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Sostenibilidad hídrica:</strong> Proteger la cuenca del río Shullcas mediante los mecanismos de MRSE Hídrico y planes GRD/ACC.</span></li>
  </ul>`
);

// Poblacion
html = html.replace(/86,220/g, '396,112'); // Población servida AP (Año 5, se usará como referencia principal)
html = html.replace(/98,168/g, '383,552'); // Población servida ALC (Año 5)

// Metas de Gestión (Gráficos)
html = html.replace(/const anFData = \[35, 29\];/, 'const anFData = [38.9, 38.0]; // Reducción general EP');
html = html.replace(/const contData = \[18\.2, 19\];/, 'const contData = [17.0, 18.0]; // Ref Huancayo C+1'); 
html = html.replace(/const microData = \[95, 98\];/, 'const microData = [37, 88]; // Ref general a Meta Hyo 88%');
html = html.replace(/const presData = \[8\.5, 10\];/, 'const presData = [16.5, 16.5]; // Ref Huancayo P'); 

// Metas a Nivel de Localidad
html = html.replace(/<table class="data-table glass-card rounded-2xl overflow-hidden">[\s\S]*?<\/table>/, `<table class="data-table glass-card rounded-2xl overflow-hidden">
        <thead><tr><th>Localidad</th><th>Continuidad (h/d)</th><th>Presión (m.c.a.)</th><th>Micromedición (%)</th></tr></thead>
        <tbody>
          <tr><td>Huancayo</td><td>C + 1 (Ref. 17 base)</td><td>P (Ref. 16.5 base)</td><td>88.0</td></tr>
          <tr><td>Orcotuna</td><td>C + 1 (Ref. 5 base)</td><td>P (Ref. 21.2 base)</td><td>92.0</td></tr>
          <tr><td>Viques-Huacrapuquio</td><td>C + 1 (Ref. 5 base)</td><td>P + 1 (Ref. 14.2 base)</td><td>53.0</td></tr>
        </tbody>
      </table>`);

// Brechas y Acceso
html = html.replace(/makeCoverageDonut\('covApChart', 83\.8\);/, "makeCoverageDonut('covApChart', 77.6);");
html = html.replace(/makeCoverageDonut\('covSaneamientoChart', 76\.7\);/, "makeCoverageDonut('covSaneamientoChart', 73.6);");

// Sostenibilidad
html = html.replace(/<p class="text-3xl font-bold mt-2">100%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Micromedición<\/p>/, '<p class="text-3xl font-bold mt-2">37%</p>\n<p class="text-xs text-slate-400 mt-1">Micromedición (Base)</p>');
html = html.replace(/<p class="text-3xl font-bold mt-2">75%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Catastro comercial<\/p>/, '<p class="text-3xl font-bold mt-2">100%</p>\n<p class="text-xs text-slate-400 mt-1">Catastro (Año 5)</p>');

// Económico-Financiero
html = html.replace(/S\/ 4\.1 millones/g, 'S/ 33 665 023'); // Saldo inicial fondo inv + transferencias
html = html.replace(/S\/ 448 240/g, 'S/ 13 949 879'); // Amortización laudos y colfonavi
html = html.replace(/62\.3%/g, '12.3%'); // Incremento acumulado
html = html.replace(/6\.50%/g, '0.0%'); // Incremento año 1

// Inversiones
html = html.replace(/S\/ 13 642 987/g, 'S/ 86 780 725'); // Total unificado con OTASS
html = html.replace(/S\/ 12 415 790/g, 'S/ 76 935 172'); // Agua y saneamiento con OTASS
html = html.replace(/S\/ 535 380/g, 'S/ 5 137 321'); // MRSE
html = html.replace(/S\/ 418 223/g, 'S/ 1 910 868'); // PCC PAS
html = html.replace(/S\/ 273 593/g, 'S/ 2 797 365'); // GRD

html = html.replace(/data: \[6743600, 3951190, 1721000, 535380, 418223, 273593\]/, 'data: [0, 0, 76935172, 5137321, 1910868, 2797365]');

html = html.replace(/const projects = \[[\s\S]*?\];/, `const projects = [
  { name: "Mejoramiento PTAP Metropolitana Huancayo (250 l/s)", category: "Obras", amount: 28101894, year: '2023-2028' },
  { name: "Instalación de 225 dataloggers de presión y continuidad", category: "Obras", amount: 3224999, year: '2023-2028' },
  { name: "Mejoramiento líneas de aducción Huancayo - Cerrito", category: "Obras", amount: 3200364, year: '2023-2028' }
];`);

// Tarifas
html = html.replace(/<p id="currentBill" class="text-2xl font-bold text-slate-600">S\/ 0\.00<\/p>/, '<p id="currentBill" class="text-2xl font-bold text-slate-600">S/ 24.04</p>'); // Huancayo ref
html = html.replace(/<p id="newBill1" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill1" class="text-3xl font-bold text-cyan-700">S/ 24.68</p>'); // Huancayo ref
html = html.replace(/<p id="newBill3" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill3" class="text-3xl font-bold text-cyan-700">S/ 27.03</p>'); // Huancayo año 3 ref

fs.writeFileSync('sunass-plus---sunassplus/web-pages/sedam-huancayo/content-pages/SEDAM-HUANCAYO.es-ES.webpage.copy.html', html, 'utf8');
console.log("Done");
