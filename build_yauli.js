const fs = require('fs');
let html = fs.readFileSync('sunass-plus---sunassplus/web-pages/yauli/content-pages/YAULI.es-ES.webpage.copy.html', 'utf8');

// Header and Title
html = html.replace(/EMAPA HUARAL S.A\./g, 'EMSAPA YAULI LA OROYA S.R.L.');
html = html.replace(/Emapa Huaral/g, 'YAULI');
html = html.replace(/EMAPA Huaral/g, 'YAULI');
html = html.replace(/Huaral/g, 'La Oroya');

// Context
html = html.replace(
  /<p class="text-slate-600 leading-relaxed mb-6">[\s\S]*?<\/p>/,
  '<p class="text-slate-600 leading-relaxed mb-6">La <strong>EMSAPA YAULI LA OROYA S.R.L.</strong> es una EPS pequeña severamente afectada en sus ingresos por la paralización del Complejo Metalúrgico Doe Run y la pandemia, lo que mermó su capacidad de inversión e impidió concretar su catastro. A esto se suma la inexistencia de una Planta de Tratamiento de Aguas Residuales (PTAR), dejando una gran brecha ambiental en la ciudad de La Oroya.</p>'
);

// Periodo Regulatorio
html = html.replace(/2025-2027/g, '2022-2027');

// Mejoras Esperadas
html = html.replace(
  /<ul class="space-y-3 text-slate-600 text-sm mb-6">[\s\S]*?<\/ul>/,
  `<ul class="space-y-3 text-slate-600 text-sm mb-6">
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Actualización catastral completa:</strong> Lograr el 100% de implementación de los catastros técnico y comercial a partir del Año 2.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Mejora en continuidad:</strong> Incrementar la continuidad a 24 horas/día en toda la empresa del Año 2 al Año 5.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Renovación de micromedidores:</strong> Reemplazar 1,687 medidores para reducir el subregistro y el ANF.</span></li>
  </ul>`
);

// Poblacion
html = html.replace(/86,220/g, '9,213'); // inicio servida AP
html = html.replace(/98,168/g, '10,267'); // final servida AP

// Metas de Gestión (Gráficos)
html = html.replace(/const anFData = \[35, 29\];/, 'const anFData = [54.1, 50.1]; // Ref ANF - 4%');
html = html.replace(/const contData = \[18\.2, 19\];/, 'const contData = [23.7, 24.0];'); 
html = html.replace(/const microData = \[95, 98\];/, 'const microData = [93, 0]; // 0 = meta física en el Año 5');
html = html.replace(/const presData = \[8\.5, 10\];/, 'const presData = [40.0, 40.0];'); 

// Metas a Nivel de Localidad
html = html.replace(/<table class="data-table glass-card rounded-2xl overflow-hidden">[\s\S]*?<\/table>/, `<table class="data-table glass-card rounded-2xl overflow-hidden">
        <thead><tr><th>Localidad</th><th>Continuidad (h/d)</th><th>Presión (m.c.a.)</th><th>Micromedición (%)</th></tr></thead>
        <tbody>
          <tr><td>La Oroya</td><td>24.0</td><td>ND</td><td>Metas físicas anuales</td></tr>
        </tbody>
      </table>`);

// Brechas y Acceso
html = html.replace(/makeCoverageDonut\('covApChart', 83\.8\);/, "makeCoverageDonut('covApChart', 42.9);");
html = html.replace(/makeCoverageDonut\('covSaneamientoChart', 76\.7\);/, "makeCoverageDonut('covSaneamientoChart', 34.3);");

// Sostenibilidad
html = html.replace(/<p class="text-3xl font-bold mt-2">100%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Micromedición<\/p>/, '<p class="text-3xl font-bold mt-2">93%</p>\n<p class="text-xs text-slate-400 mt-1">Micromedición (Base)</p>');
html = html.replace(/<p class="text-3xl font-bold mt-2">75%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Catastro comercial<\/p>/, '<p class="text-3xl font-bold mt-2">100%</p>\n<p class="text-xs text-slate-400 mt-1">Catastro Comercial (Año 5)</p>');

// Económico-Financiero
html = html.replace(/S\/ 4\.1 millones/g, 'S/ 185 462'); // Saldo inicial fondo inv
html = html.replace(/S\/ 448 240/g, 'S/ 812 141'); // Pasivos corrientes año 1 ref
html = html.replace(/62\.3%/g, '15.0%'); // Incremento acumulado
html = html.replace(/6\.50%/g, '4.5%'); // Incremento año 1

// Inversiones
html = html.replace(/S\/ 13 642 987/g, 'S/ 875 074'); // Total unificado
html = html.replace(/S\/ 12 415 790/g, 'S/ 744 574'); // Agua y saneamiento
html = html.replace(/S\/ 535 380/g, 'S/ 60 500'); // MRSE
html = html.replace(/S\/ 418 223/g, 'S/ 48 000'); // PCC PAS ref directa obras (reserva 159k)
html = html.replace(/S\/ 273 593/g, 'S/ 70 000'); // GRD

html = html.replace(/data: \[6743600, 3951190, 1721000, 535380, 418223, 273593\]/, 'data: [0, 0, 744574, 60500, 48000, 70000]');

html = html.replace(/const projects = \[[\s\S]*?\];/, `const projects = [
  { name: "Implementación del Catastro Comercial de Agua y Alcantarillado", category: "Comercial", amount: 67126, year: '2022-2027' },
  { name: "Implementación del Catastro Técnico de Agua y Alcantarillado", category: "Comercial", amount: 56650, year: '2022-2027' },
  { name: "Ampliación de 200 Micromedidores (1/2'') en Alto Marcavalle", category: "Comercial", amount: 45286, year: '2022-2027' }
];`);

// Tarifas
html = html.replace(/<p id="currentBill" class="text-2xl font-bold text-slate-600">S\/ 0\.00<\/p>/, '<p id="currentBill" class="text-2xl font-bold text-slate-600">S/ 19.16</p>');
html = html.replace(/<p id="newBill1" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill1" class="text-3xl font-bold text-cyan-700">S/ 19.37</p>'); // No benef
html = html.replace(/<p id="newBill3" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill3" class="text-3xl font-bold text-cyan-700">S/ 0.00</p>'); // ND soles

fs.writeFileSync('sunass-plus---sunassplus/web-pages/yauli/content-pages/YAULI.es-ES.webpage.copy.html', html, 'utf8');
console.log("Done");
