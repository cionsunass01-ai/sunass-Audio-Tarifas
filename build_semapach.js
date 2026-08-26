const fs = require('fs');
let html = fs.readFileSync('sunass-plus---sunassplus/web-pages/semapach/content-pages/SEMAPACH.es-ES.webpage.copy.html', 'utf8');

// Header and Title
html = html.replace(/EMAPA HUARAL S.A\./g, 'EPS SEMAPACH S.A.');
html = html.replace(/Emapa Huaral/g, 'SEMAPACH');
html = html.replace(/EMAPA Huaral/g, 'SEMAPACH');
html = html.replace(/Huaral/g, 'Chincha');

// Context
html = html.replace(
  /<p class="text-slate-600 leading-relaxed mb-6">[\s\S]*?<\/p>/,
  '<p class="text-slate-600 leading-relaxed mb-6">La <strong>EPS SEMAPACH S.A.</strong> brinda servicios en Chincha, enfrentando deficiencias críticas de continuidad durante estiaje (cuando baja el caudal de sus fuentes) y alta turbiedad en época de lluvias. Para cerrar sus enormes brechas históricas de infraestructura y gestión, requiere financiamiento masivo destinado a reactivar su micromedición y completar el catastro técnico y comercial.</p>'
);

// Periodo Regulatorio
html = html.replace(/2025-2027/g, '2024-2028');

// Mejoras Esperadas
html = html.replace(
  /<ul class="space-y-3 text-slate-600 text-sm mb-6">[\s\S]*?<\/ul>/,
  `<ul class="space-y-3 text-slate-600 text-sm mb-6">
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Incrementar micromedición:</strong> Pasar de un 18% a un 51% a nivel de toda la EP al Año 5.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Incrementar continuidad:</strong> Perforación de 3 pozos para sumar hasta 5 h/d en zonas como Tambo de Mora.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Actualización catastral:</strong> Alcanzar 100% en todas las localidades.</span></li>
  </ul>`
);

// Poblacion
html = html.replace(/86,220/g, '229,566'); // inicio (responsabilidad)
html = html.replace(/98,168/g, '229,566'); // final (no var. proyectada directamente, se usa responsabilidad)

// Metas de Gestión (Gráficos)
html = html.replace(/const anFData = \[35, 29\];/, 'const anFData = [38, 0]; // 0 = no hay meta cuantitativa aprobada');
html = html.replace(/const contData = \[18\.2, 19\];/, 'const contData = [15.9, 17.9]; // 15.9 Promedio. Meta varía por sector, gráfica ref. +2h'); 
html = html.replace(/const microData = \[95, 98\];/, 'const microData = [18, 51];');
html = html.replace(/const presData = \[8\.5, 10\];/, 'const presData = [8.8, 10.0];'); 

// Metas a Nivel de Localidad
html = html.replace(/<table class="data-table glass-card rounded-2xl overflow-hidden">[\s\S]*?<\/table>/, `<table class="data-table glass-card rounded-2xl overflow-hidden">
        <thead><tr><th>Localidad</th><th>Continuidad (h/d)</th><th>Presión (m.c.a.)</th><th>Micromedición (%)</th></tr></thead>
        <tbody>
          <tr><td>Chincha Alta</td><td>Base + 2</td><td>P</td><td>Meta EPS 51%</td></tr>
          <tr><td>Sunampe</td><td>Base</td><td>P</td><td>Meta EPS 51%</td></tr>
          <tr><td>Alto Larán</td><td>Base + 1</td><td>P</td><td>Meta EPS 51%</td></tr>
          <tr><td>Tambo de Mora</td><td>Base + 5</td><td>P + 4</td><td>Meta EPS 51%</td></tr>
        </tbody>
      </table>`);

// Brechas y Acceso
html = html.replace(/makeCoverageDonut\('covApChart', 83\.8\);/, "makeCoverageDonut('covApChart', 89.5);");
html = html.replace(/makeCoverageDonut\('covSaneamientoChart', 76\.7\);/, "makeCoverageDonut('covSaneamientoChart', 80.9);");

// Sostenibilidad
html = html.replace(/<p class="text-3xl font-bold mt-2">100%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Micromedición<\/p>/, '<p class="text-3xl font-bold mt-2">18%</p>\n<p class="text-xs text-slate-400 mt-1">Micromedición (Base)</p>');
html = html.replace(/<p class="text-3xl font-bold mt-2">75%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Catastro comercial<\/p>/, '<p class="text-3xl font-bold mt-2">100%</p>\n<p class="text-xs text-slate-400 mt-1">Catastro (Meta Año 5)</p>');

// Económico-Financiero
html = html.replace(/S\/ 4\.1 millones/g, 'S/ 17 600 000'); // Saldo inicial
html = html.replace(/S\/ 448 240/g, 'S/ 1 622 543'); // Deudas (laudo + reintegros)
html = html.replace(/62\.3%/g, '23.4%'); // Incremento acumulado ref. (3+10.8+9.6)
html = html.replace(/6\.50%/g, '5.5%'); // Incremento año 1 ref (3% formula + 2.5% estr)

// Inversiones
html = html.replace(/S\/ 13 642 987/g, 'S/ 32 985 578');
html = html.replace(/S\/ 12 415 790/g, 'S/ 29 076 147'); // Agua y saneamiento
html = html.replace(/S\/ 535 380/g, 'S/ 2 133 952'); // MRSE
html = html.replace(/S\/ 418 223/g, 'S/ 231 750'); // PCC
html = html.replace(/S\/ 273 593/g, 'S/ 1 543 729'); // GRD

html = html.replace(/data: \[6743600, 3951190, 1721000, 535380, 418223, 273593\]/, 'data: [0, 0, 29076147, 2133952, 231750, 1543729]');

html = html.replace(/const projects = \[[\s\S]*?\];/, `const projects = [
  { name: "Saldo de Obra del PMRI II (CUI 2046101)", category: "Obras", amount: 25684682, year: '2024-2028' },
  { name: "Renovación de Medidores (Mejoramiento AP)", category: "Comercial", amount: 6920870, year: '2024-2028' },
  { name: "Ampliación de Agua Potable (Sunampe)", category: "Producción", amount: 2443496, year: '2024-2028' }
];`);

// Tarifas
html = html.replace(/<p id="currentBill" class="text-2xl font-bold text-slate-600">S\/ 0\.00<\/p>/, '<p id="currentBill" class="text-2xl font-bold text-slate-600">S/ 35.00</p>');
html = html.replace(/<p id="newBill1" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill1" class="text-3xl font-bold text-cyan-700">S/ 37.90</p>');
html = html.replace(/<p id="newBill3" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill3" class="text-3xl font-bold text-cyan-700">S/ 0.00</p>'); // ND 

fs.writeFileSync('sunass-plus---sunassplus/web-pages/semapach/content-pages/SEMAPACH.es-ES.webpage.copy.html', html, 'utf8');
console.log("Done");
