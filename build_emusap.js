const fs = require('fs');
let html = fs.readFileSync('sunass-plus---sunassplus/web-pages/emusap/content-pages/EMUSAP.es-ES.webpage.copy.html', 'utf8');

// Header and Title
html = html.replace(/EMAPA HUARAL S.A\./g, 'EPS EMUSAP S.A.');
html = html.replace(/Emapa Huaral/g, 'EMUSAP');
html = html.replace(/EMAPA Huaral/g, 'EMUSAP');
html = html.replace(/Huaral/g, 'Chachapoyas');

// Context
html = html.replace(
  /<p class="text-slate-600 leading-relaxed mb-6">[\s\S]*?<\/p>/,
  '<p class="text-slate-600 leading-relaxed mb-6">La <strong>EPS EMUSAP S.A.</strong> opera bajo el Régimen de Apoyo Transitorio (RAT) desde 2018. Su mayor desafío operativo es la alta turbiedad y sedimentación de sus fuentes de agua superficiales (río Tilacancha) en época de lluvias, que restringen el servicio e inflan costos. Además, sus PTAR se encuentran inoperativas, forzando el vertimiento de aguas sin tratar a los ríos Sonche y Utcubamba.</p>'
);

// Periodo Regulatorio
html = html.replace(/2025-2027/g, '2021-2026');

// Mejoras Esperadas
html = html.replace(
  /<ul class="space-y-3 text-slate-600 text-sm mb-6">[\s\S]*?<\/ul>/,
  `<ul class="space-y-3 text-slate-600 text-sm mb-6">
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Reducción de agua no facturada:</strong> Disminuir progresivamente hasta alcanzar un 26% en el Año 5.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Actualización catastral integral:</strong> Mantener el catastro comercial georreferenciado al 100% y alcanzar el 100% en el técnico.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Renovación de medidores:</strong> Cambiar entre 676 y 1,120 unidades de micromedidores anualmente.</span></li>
  </ul>`
);

// Poblacion
html = html.replace(/86,220/g, '29,886'); // inicio servida AP
html = html.replace(/98,168/g, '35,673'); // final servida AP

// Metas de Gestión (Gráficos)
html = html.replace(/const anFData = \[35, 29\];/, 'const anFData = [27, 26]; // 27% en años 1-2, 26% meta final');
html = html.replace(/const contData = \[18\.2, 19\];/, 'const contData = [23.5, 23.0];'); 
html = html.replace(/const microData = \[95, 98\];/, 'const microData = [94, 94]; // Meta oficial es física (renovación anual)');
html = html.replace(/const presData = \[8\.5, 10\];/, 'const presData = [31.9, 0]; // ND - Meta de presión no disponible'); 

// Metas a Nivel de Localidad
html = html.replace(/<table class="data-table glass-card rounded-2xl overflow-hidden">[\s\S]*?<\/table>/, `<table class="data-table glass-card rounded-2xl overflow-hidden">
        <thead><tr><th>Ámbito de la EPS</th><th>Continuidad (h/d)</th><th>Presión (m.c.a.)</th><th>Micromedición (%)</th></tr></thead>
        <tbody>
          <tr><td>EMUSAP S.A.</td><td>23.0</td><td>ND</td><td>Meta física de renovación</td></tr>
        </tbody>
      </table>`);

// Brechas y Acceso
html = html.replace(/makeCoverageDonut\('covApChart', 83\.8\);/, "makeCoverageDonut('covApChart', 88.3);");
html = html.replace(/makeCoverageDonut\('covSaneamientoChart', 76\.7\);/, "makeCoverageDonut('covSaneamientoChart', 78.0);");

// Sostenibilidad
html = html.replace(/<p class="text-3xl font-bold mt-2">100%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Micromedición<\/p>/, '<p class="text-3xl font-bold mt-2">94%</p>\n<p class="text-xs text-slate-400 mt-1">Micromedición (Base)</p>');
html = html.replace(/<p class="text-3xl font-bold mt-2">75%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Catastro comercial<\/p>/, '<p class="text-3xl font-bold mt-2">100%</p>\n<p class="text-xs text-slate-400 mt-1">Catastro Comercial (Sostenido)</p>');

// Económico-Financiero
html = html.replace(/S\/ 4\.1 millones/g, 'S/ 3 203 530'); // Saldo inicial fondo inv
html = html.replace(/S\/ 448 240/g, 'S/ 31 289 075'); // Deudas (Fonavi)
html = html.replace(/62\.3%/g, '5.2%'); // Incremento acumulado
html = html.replace(/6\.50%/g, '0.0%'); // Incremento año 1

// Inversiones
html = html.replace(/S\/ 13 642 987/g, 'S/ 10 244 567');
html = html.replace(/S\/ 12 415 790/g, 'S/ 9 211 951'); // Agua y saneamiento
html = html.replace(/S\/ 535 380/g, 'S/ 751 000'); // MRSE
html = html.replace(/S\/ 418 223/g, 'S/ 57 916'); // PCC
html = html.replace(/S\/ 273 593/g, 'S/ 223 700'); // GRD

html = html.replace(/data: \[6743600, 3951190, 1721000, 535380, 418223, 273593\]/, 'data: [0, 0, 9211951, 751000, 57916, 223700]');

html = html.replace(/const projects = \[[\s\S]*?\];/, `const projects = [
  { name: "Mejoramiento y ampliación de redes y reconexiones en Chachapoyas", category: "Obras", amount: 1907963, year: '2021-2026' },
  { name: "Optimización de la línea de conducción Tilacancha DN 14''", category: "Producción", amount: 850481, year: '2021-2026' },
  { name: "Creación y Construcción primera etapa local institucional", category: "Institucional", amount: 848800, year: '2021-2026' }
];`);

// Tarifas
html = html.replace(/<p id="currentBill" class="text-2xl font-bold text-slate-600">S\/ 0\.00<\/p>/, '<p id="currentBill" class="text-2xl font-bold text-slate-600">S/ 40.72</p>');
html = html.replace(/<p id="newBill1" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill1" class="text-3xl font-bold text-cyan-700">S/ 40.72</p>');
html = html.replace(/<p id="newBill3" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill3" class="text-3xl font-bold text-cyan-700">S/ 42.72</p>'); // Estimado ref.

fs.writeFileSync('sunass-plus---sunassplus/web-pages/emusap/content-pages/EMUSAP.es-ES.webpage.copy.html', html, 'utf8');
console.log("Done");
