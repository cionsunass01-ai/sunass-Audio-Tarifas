const fs = require('fs');
let html = fs.readFileSync('sunass-plus---sunassplus/web-pages/rioja/content-pages/RIOJA.es-ES.webpage.copy.html', 'utf8');

// Header and Title
html = html.replace(/EMAPA HUARAL S.A\./g, 'EPS RIOJA S.A.');
html = html.replace(/Emapa Huaral/g, 'RIOJA');
html = html.replace(/EMAPA Huaral/g, 'RIOJA');
html = html.replace(/Huaral/g, 'Rioja');

// Context
html = html.replace(
  /<p class="text-slate-600 leading-relaxed mb-6">[\s\S]*?<\/p>/,
  '<p class="text-slate-600 leading-relaxed mb-6">La <strong>EPS RIOJA S.A.</strong> es una empresa pequeña que opera en el distrito de Rioja (San Martín). Su problemática principal se centra en la pérdida del 40% del rendimiento de su captación en el Río Negro (por filtraciones críticas) y una línea de conducción altamente vulnerable a deslizamientos por estar sobre terreno inestable. A esto se suma la ausencia de un catastro técnico y elevado nivel de Agua No Facturada.</p>'
);

// Periodo Regulatorio
html = html.replace(/2025-2027/g, '2022-2027');

// Mejoras Esperadas
html = html.replace(
  /<ul class="space-y-3 text-slate-600 text-sm mb-6">[\s\S]*?<\/ul>/,
  `<ul class="space-y-3 text-slate-600 text-sm mb-6">
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Renovación de medidores:</strong> Reemplazar 4,960 medidores de 1/2" con más de 5 años de antigüedad.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Implementación de catastro técnico:</strong> Lograr cobertura al 100% de redes de agua y desagüe al Año 2.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Reducción de pérdidas (ANF):</strong> Reducir el nivel de pérdidas operacionales desde un 46% a un 42% al Año 5.</span></li>
  </ul>`
);

// Poblacion
html = html.replace(/86,220/g, '25,330'); // inicio servida AP
html = html.replace(/98,168/g, '28,978'); // final servida AP

// Metas de Gestión (Gráficos)
html = html.replace(/const anFData = \[35, 29\];/, 'const anFData = [46, 42]; // Base 46%');
html = html.replace(/const contData = \[18\.2, 19\];/, 'const contData = [20.0, 20.0];'); 
html = html.replace(/const microData = \[95, 98\];/, 'const microData = [87, 0]; // 0 = meta física 980 ud. reemplazo Año 5');
html = html.replace(/const presData = \[8\.5, 10\];/, 'const presData = [19.0, 19.0];'); 

// Metas a Nivel de Localidad
html = html.replace(/<table class="data-table glass-card rounded-2xl overflow-hidden">[\s\S]*?<\/table>/, `<table class="data-table glass-card rounded-2xl overflow-hidden">
        <thead><tr><th>Localidad</th><th>Continuidad (h/d)</th><th>Presión (m.c.a.)</th><th>Micromedición (%)</th></tr></thead>
        <tbody>
          <tr><td>Rioja</td><td>20.0</td><td>19.0</td><td>Metas físicas anuales</td></tr>
        </tbody>
      </table>`);

// Brechas y Acceso
html = html.replace(/makeCoverageDonut\('covApChart', 83\.8\);/, "makeCoverageDonut('covApChart', 97.5);");
html = html.replace(/makeCoverageDonut\('covSaneamientoChart', 76\.7\);/, "makeCoverageDonut('covSaneamientoChart', 56.6);");

// Sostenibilidad
html = html.replace(/<p class="text-3xl font-bold mt-2">100%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Micromedición<\/p>/, '<p class="text-3xl font-bold mt-2">87%</p>\n<p class="text-xs text-slate-400 mt-1">Micromedición (Base)</p>');
html = html.replace(/<p class="text-3xl font-bold mt-2">75%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Catastro comercial<\/p>/, '<p class="text-3xl font-bold mt-2">100%</p>\n<p class="text-xs text-slate-400 mt-1">Catastro Comercial (Sostenido)</p>');

// Económico-Financiero
html = html.replace(/S\/ 4\.1 millones/g, 'S/ 1 233 460'); // Saldo inicial operativo fondo 
html = html.replace(/S\/ 448 240/g, 'S/ 0'); // Deudas (Sin deudas ref)
html = html.replace(/62\.3%/g, '3.2%'); // Incremento acumulado
html = html.replace(/6\.50%/g, '0.0%'); // Incremento año 1

// Inversiones
html = html.replace(/S\/ 13 642 987/g, 'S/ 3 403 488');
html = html.replace(/S\/ 12 415 790/g, 'S/ 2 797 588'); // Agua y saneamiento
html = html.replace(/S\/ 535 380/g, 'S/ 133 400'); // MRSE
html = html.replace(/S\/ 418 223/g, 'S/ 146 500'); // PCC
html = html.replace(/S\/ 273 593/g, 'S/ 326 000'); // GRD

html = html.replace(/data: \[6743600, 3951190, 1721000, 535380, 418223, 273593\]/, 'data: [0, 0, 2797588, 133400, 146500, 326000]');

html = html.replace(/const projects = \[[\s\S]*?\];/, `const projects = [
  { name: "Renovación de 4,960 micromedidores (1/2'') en Rioja", category: "Comercial", amount: 1558605, year: '2022-2027' },
  { name: "Construcción de la nueva Captación Río Negro (120 l/s)", category: "Producción", amount: 346383, year: '2022-2027' },
  { name: "Mejoramiento del sistema media tensión - Est. Bombeo", category: "Producción", amount: 285466, year: '2022-2027' }
];`);

// Tarifas
html = html.replace(/<p id="currentBill" class="text-2xl font-bold text-slate-600">S\/ 0\.00<\/p>/, '<p id="currentBill" class="text-2xl font-bold text-slate-600">S/ 39.00</p>');
html = html.replace(/<p id="newBill1" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill1" class="text-3xl font-bold text-cyan-700">S/ 39.30</p>'); // No benef sin IGV
html = html.replace(/<p id="newBill3" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill3" class="text-3xl font-bold text-cyan-700">S/ 0.00</p>'); // ND

fs.writeFileSync('sunass-plus---sunassplus/web-pages/rioja/content-pages/RIOJA.es-ES.webpage.copy.html', html, 'utf8');
console.log("Done");
