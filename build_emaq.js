const fs = require('fs');
let html = fs.readFileSync('sunass-plus---sunassplus/web-pages/emaq/content-pages/EMAQ.es-ES.webpage.copy.html', 'utf8');

// Header and Title
html = html.replace(/EMAPA HUARAL S.A\./g, 'EPS EMAQ S.A.');
html = html.replace(/Emapa Huaral/g, 'EMAQ');
html = html.replace(/EMAPA Huaral/g, 'EMAQ');
html = html.replace(/Huaral/g, 'Quillabamba');

// Context
html = html.replace(
  /<p class="text-slate-600 leading-relaxed mb-6">[\s\S]*?<\/p>/,
  '<p class="text-slate-600 leading-relaxed mb-6">La <strong>EPS EMAQ S.A.</strong> (Quillabamba, La Convención) enfrenta severos problemas de calidad y continuidad durante la época de lluvias, donde la extrema turbiedad obliga a paralizar sus captaciones principales (Poromate y Chuyapi). A esta vulnerabilidad se suma la paralización de su infraestructura de tratamiento de aguas residuales, un parque de medidores obsoleto y pérdidas de agua no facturada que superan el 52%.</p>'
);

// Periodo Regulatorio
html = html.replace(/2025-2027/g, '2024-2027'); // 4 años

// Mejoras Esperadas
html = html.replace(
  /<ul class="space-y-3 text-slate-600 text-sm mb-6">[\s\S]*?<\/ul>/,
  `<ul class="space-y-3 text-slate-600 text-sm mb-6">
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Optimización Comercial:</strong> Masificar la micromedición mediante un plan intensivo de renovación de equipos obsoletos y nuevas conexiones.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Mitigación de riesgos (GRD):</strong> Renovar la aducción Santa Ana e implementar una cámara reguladora de presión vital para evitar colapsos.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Sostenibilidad Ambiental:</strong> Construir el laboratorio de control de calidad y ejecutar fondos MRSE en las cuencas Poromate y Chuyapi.</span></li>
  </ul>`
);

// Poblacion
html = html.replace(/86,220/g, '28,880'); // Población servida AP (Año 4)
html = html.replace(/98,168/g, '26,164'); // Población servida ALC (Año 4)

// Metas de Gestión (Gráficos)
html = html.replace(/const anFData = \[35, 29\];/, 'const anFData = [52.68, 52.68]; // Meta final ND, mantenemos base visual');
html = html.replace(/const contData = \[18\.2, 19\];/, 'const contData = [24.0, 24.0]; // Quillabamba'); 
html = html.replace(/const microData = \[95, 98\];/, 'const microData = [69.0, 69.0]; // Quillabamba');
html = html.replace(/const presData = \[8\.5, 10\];/, 'const presData = [33.0, 33.0]; // Quillabamba'); 

// Metas a Nivel de Localidad
html = html.replace(/<table class="data-table glass-card rounded-2xl overflow-hidden">[\s\S]*?<\/table>/, `<table class="data-table glass-card rounded-2xl overflow-hidden">
        <thead><tr><th>Localidad</th><th>Continuidad (h/d)</th><th>Presión (m.c.a.)</th><th>Micromedición (%)</th></tr></thead>
        <tbody>
          <tr><td>Quillabamba</td><td>24.0</td><td>33.0</td><td>69.0</td></tr>
        </tbody>
      </table>`);

// Brechas y Acceso
html = html.replace(/makeCoverageDonut\('covApChart', 83\.8\);/, "makeCoverageDonut('covApChart', 90.0);");
html = html.replace(/makeCoverageDonut\('covSaneamientoChart', 76\.7\);/, "makeCoverageDonut('covSaneamientoChart', 83.0);");

// Sostenibilidad
html = html.replace(/<p class="text-3xl font-bold mt-2">100%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Micromedición<\/p>/, '<p class="text-3xl font-bold mt-2">69%</p>\n<p class="text-xs text-slate-400 mt-1">Micromedición (Año 4)</p>');
html = html.replace(/<p class="text-3xl font-bold mt-2">75%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Catastro comercial<\/p>/, '<p class="text-3xl font-bold mt-2">100%</p>\n<p class="text-xs text-slate-400 mt-1">Catastro (Año 4)</p>');

// Económico-Financiero
html = html.replace(/S\/ 4\.1 millones/g, 'S/ 566 869'); // Saldo inicial fondo inv
html = html.replace(/S\/ 448 240/g, 'S/ 0'); // Amortización deuda nueva (no hay)
html = html.replace(/62\.3%/g, '9.3%'); // Incremento año 3 (fórmula)
html = html.replace(/6\.50%/g, '0.0%'); // Incremento año 1

// Inversiones
html = html.replace(/S\/ 13 642 987/g, 'S/ 3 387 558'); // Total unificado
html = html.replace(/S\/ 12 415 790/g, 'S/ 2 659 341'); // Agua y saneamiento
html = html.replace(/S\/ 535 380/g, 'S/ 144 900'); // MRSE
html = html.replace(/S\/ 418 223/g, 'S/ 270 437'); // PCC PAS
html = html.replace(/S\/ 273 593/g, 'S/ 312 880'); // GRD

html = html.replace(/data: \[6743600, 3951190, 1721000, 535380, 418223, 273593\]/, 'data: [0, 0, 2659341, 144900, 270437, 312880]');

html = html.replace(/const projects = \[[\s\S]*?\];/, `const projects = [
  { name: "Renovación línea de aducción Santa Ana", category: "Obras", amount: 544971, year: '2024-2027' },
  { name: "Renovación de 2,681 micromedidores por vida útil", category: "Comercial", amount: 439678, year: '2024-2027' },
  { name: "Cámara reguladora de presión en línea de conducción", category: "Obras", amount: 312880, year: '2024-2027' }
];`);

// Tarifas
html = html.replace(/<p id="currentBill" class="text-2xl font-bold text-slate-600">S\/ 0\.00<\/p>/, '<p id="currentBill" class="text-2xl font-bold text-slate-600">S/ 16.40</p>'); // Ref base sin IGV
html = html.replace(/<p id="newBill1" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill1" class="text-3xl font-bold text-cyan-700">S/ 16.70</p>'); // Ref año 1 sin IGV
html = html.replace(/<p id="newBill3" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill3" class="text-3xl font-bold text-cyan-700">S/ 0.00</p>'); // ND soles año 3 directos

fs.writeFileSync('sunass-plus---sunassplus/web-pages/emaq/content-pages/EMAQ.es-ES.webpage.copy.html', html, 'utf8');
console.log("Done");
