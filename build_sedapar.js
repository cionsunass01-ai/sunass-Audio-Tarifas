const fs = require('fs');
let html = fs.readFileSync('sunass-plus---sunassplus/web-pages/sedapar/content-pages/SEDAPAR.es-ES.webpage.copy.html', 'utf8');

// Header and Title
html = html.replace(/EMAPA HUARAL S.A\./g, 'EPS SEDAPAR S.A.');
html = html.replace(/Emapa Huaral/g, 'SEDAPAR');
html = html.replace(/EMAPA Huaral/g, 'SEDAPAR');
html = html.replace(/Huaral/g, 'Arequipa Metropolitana');

// Context
html = html.replace(
  /<p class="text-slate-600 leading-relaxed mb-6">[\s\S]*?<\/p>/,
  '<p class="text-slate-600 leading-relaxed mb-6">La <strong>EPS SEDAPAR S.A.</strong> (Grande) administra los servicios en el departamento de Arequipa. Su principal problemática radica en la presencia de metales (arsénico y boro) por encima de los límites permisibles en sus fuentes subterráneas, pérdidas y baja continuidad en sectores críticos (como Chala, con solo 1.49 h/d), y altos niveles de agua no facturada (30.59%). Para contrarrestar esto, enfrenta el reto urgente de modernizar su obsoleto parque de medidores, donde el 37% de las unidades superaron su vida útil.</p>'
);

// Periodo Regulatorio
html = html.replace(/2025-2027/g, '2021-2026');

// Mejoras Esperadas
html = html.replace(
  /<ul class="space-y-3 text-slate-600 text-sm mb-6">[\s\S]*?<\/ul>/,
  `<ul class="space-y-3 text-slate-600 text-sm mb-6">
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Confiabilidad de Infraestructura:</strong> Fortalecer el sistema primario de Arequipa y mejorar las redes de agua y alcantarillado en localidades anexas.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Eficiencia Comercial:</strong> Instalar masivamente 30,584 medidores y renovar 159,495 inoperativos para abatir el Agua No Facturada.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Sostenibilidad (MRSE):</strong> Proyectos ecosistémicos para la regulación hídrica y control de sedimentos en cuencas de aporte.</span></li>
  </ul>`
);

// Poblacion
html = html.replace(/86,220/g, '1,315,419'); // Población servida AP (Año 5)
html = html.replace(/98,168/g, '1,200,731'); // Población servida ALC (Año 5)

// Metas de Gestión (Gráficos)
html = html.replace(/const anFData = \[35, 29\];/, 'const anFData = [30.59, 28.0]; // ND (a determinar en Año 3)');
html = html.replace(/const contData = \[18\.2, 19\];/, 'const contData = [23.8, 24.0]; // Arequipa Metropolitana'); 
html = html.replace(/const microData = \[95, 98\];/, 'const microData = [89.51, 95.0]; // Arequipa Metropolitana, aprox final');
html = html.replace(/const presData = \[8\.5, 10\];/, 'const presData = [35.8, 35.8]; // Arequipa Metropolitana'); 

// Metas a Nivel de Localidad
html = html.replace(/<table class="data-table glass-card rounded-2xl overflow-hidden">[\s\S]*?<\/table>/, `<table class="data-table glass-card rounded-2xl overflow-hidden">
        <thead><tr><th>Localidad</th><th>Continuidad (h/d)</th><th>Presión (m.c.a.)</th><th>Micromedición (%)</th></tr></thead>
        <tbody>
          <tr><td>Arequipa Metrop.</td><td>24.0</td><td>ND</td><td>ND (Instalaciones anuales)</td></tr>
          <tr><td>Chala</td><td>2.0</td><td>ND</td><td>ND</td></tr>
        </tbody>
      </table>`);

// Brechas y Acceso
html = html.replace(/makeCoverageDonut\('covApChart', 83\.8\);/, "makeCoverageDonut('covApChart', 91.97);");
html = html.replace(/makeCoverageDonut\('covSaneamientoChart', 76\.7\);/, "makeCoverageDonut('covSaneamientoChart', 79.9);");

// Sostenibilidad
html = html.replace(/<p class="text-3xl font-bold mt-2">100%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Micromedición<\/p>/, '<p class="text-3xl font-bold mt-2">90.5%</p>\n<p class="text-xs text-slate-400 mt-1">Micromedición (EP)</p>');
html = html.replace(/<p class="text-3xl font-bold mt-2">75%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Catastro comercial<\/p>/, '<p class="text-3xl font-bold mt-2">100%</p>\n<p class="text-xs text-slate-400 mt-1">Catastro en Provincias</p>');

// Económico-Financiero
html = html.replace(/S\/ 4\.1 millones/g, 'S/ 174.3 millones'); // Saldo inicial caja
html = html.replace(/S\/ 448 240/g, 'S/ 0'); // Deuda nueva
html = html.replace(/62\.3%/g, '19.5%'); // Incremento nominal acumulado AQP (AP)
html = html.replace(/6\.50%/g, '5.0%'); // Incremento año 1 AQP (AP)

// Inversiones
html = html.replace(/S\/ 13 642 987/g, 'S/ 415 770 734'); // Total unificado
html = html.replace(/S\/ 12 415 790/g, 'S/ 394 141 729'); // Agua y saneamiento
html = html.replace(/S\/ 535 380/g, 'S/ 7 957 094'); // MRSE
html = html.replace(/S\/ 418 223/g, 'S/ 0'); // PCC PAS (incluido en otros, S/ 0 consolidado exacto)
html = html.replace(/S\/ 273 593/g, 'S/ 13 671 911'); // GRD

html = html.replace(/data: \[6743600, 3951190, 1721000, 535380, 418223, 273593\]/, 'data: [0, 0, 394141729, 7957094, 0, 13671911]');

html = html.replace(/const projects = \[[\s\S]*?\];/, `const projects = [
  { name: "Sistema AP/ALC Sachaca, Tiabaya, Congata (AQP-16)", category: "Obras", amount: 63041227, year: '2021-2026' },
  { name: "Sistema primario AP Cono Sur Este Arequipa (AQP-15)", category: "Obras", amount: 49734177, year: '2021-2026' },
  { name: "Mejoramiento micromedición ciudad de Arequipa", category: "Comercial", amount: 23542722, year: '2021-2026' }
];`);

// Tarifas
html = html.replace(/<p id="currentBill" class="text-2xl font-bold text-slate-600">S\/ 0\.00<\/p>/, '<p id="currentBill" class="text-2xl font-bold text-slate-600">S/ 25.85</p>'); // Ref base sin IGV
html = html.replace(/<p id="newBill1" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill1" class="text-3xl font-bold text-cyan-700">S/ 27.03</p>'); // Ref año 1 sin IGV (+5% aprox AQP)
html = html.replace(/<p id="newBill3" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill3" class="text-3xl font-bold text-cyan-700">S/ 28.74</p>'); // Ref año 3 sin IGV

fs.writeFileSync('sunass-plus---sunassplus/web-pages/sedapar/content-pages/SEDAPAR.es-ES.webpage.copy.html', html, 'utf8');
console.log("Done");
