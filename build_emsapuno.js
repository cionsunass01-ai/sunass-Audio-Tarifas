const fs = require('fs');
let html = fs.readFileSync('sunass-plus---sunassplus/web-pages/emsapuno/content-pages/EMSAPUNO.es-ES.webpage.copy.html', 'utf8');

// Header and Title
html = html.replace(/EMAPA HUARAL S.A\./g, 'EMSAPUNO S.A.');
html = html.replace(/Emapa Huaral/g, 'EMSAPUNO');
html = html.replace(/EMAPA Huaral/g, 'EMSAPUNO');
html = html.replace(/Huaral/g, 'Puno');

// Context
html = html.replace(
  /<p class="text-slate-600 leading-relaxed mb-6">[\s\S]*?<\/p>/,
  '<p class="text-slate-600 leading-relaxed mb-6">La <strong>Empresa Municipal de Saneamiento Básico de Puno S.A. (EMSAPUNO S.A.)</strong> presta servicios en Puno y Desaguadero. Entre sus retos más críticos se encuentran el elevado nivel de agua no facturada (44% en Puno) y una micromedición precaria en Desaguadero (solo 9.9%). Además, la empresa debe superar la severa obsolescencia de sus sistemas informáticos (basados en DBF y servidores antiguos) y gestionar estratégicamente el pago progresivo de una millonaria deuda histórica con el FONAVI (S/ 55.84 millones) sin afectar la viabilidad del servicio.</p>'
);

// Periodo Regulatorio
html = html.replace(/2025-2027/g, '2023-2027');

// Mejoras Esperadas
html = html.replace(
  /<ul class="space-y-3 text-slate-600 text-sm mb-6">[\s\S]*?<\/ul>/,
  `<ul class="space-y-3 text-slate-600 text-sm mb-6">
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Eficiencia Operativa:</strong> Ejecución urgente de obras de cabecera en Puno y equipamiento electromecánico en Desaguadero para elevar la producción a 20 l/s.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Modernización Comercial:</strong> Renovación total a GIS, migración a bases de datos seguras SQL/Oracle, y masificación de miles de medidores.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Sostenibilidad Ambiental (MRSE):</strong> Proyectos ecosistémicos, forestación y zanjas de infiltración en la cuenca de aporte Totorani.</span></li>
  </ul>`
);

// Poblacion
html = html.replace(/86,220/g, '146,543'); // Población servida AP (Año 5)
html = html.replace(/98,168/g, '135,918'); // Población servida ALC (Año 5)

// Metas de Gestión (Gráficos)
html = html.replace(/const anFData = \[35, 29\];/, 'const anFData = [44.0, 40.0]; // Puno');
html = html.replace(/const contData = \[18\.2, 19\];/, 'const contData = [10.0, 14.0]; // Puno'); 
html = html.replace(/const microData = \[95, 98\];/, 'const microData = [84.2, 100.0]; // Puno (Aprox. final con reemplazos)');
html = html.replace(/const presData = \[8\.5, 10\];/, 'const presData = [21.0, 21.0]; // Puno'); 

// Metas a Nivel de Localidad
html = html.replace(/<table class="data-table glass-card rounded-2xl overflow-hidden">[\s\S]*?<\/table>/, `<table class="data-table glass-card rounded-2xl overflow-hidden">
        <thead><tr><th>Localidad</th><th>Continuidad (h/d)</th><th>Presión (m.c.a.)</th><th>Agua No Facturada (%)</th></tr></thead>
        <tbody>
          <tr><td>Puno</td><td>14.0</td><td>21.0</td><td>40.0</td></tr>
          <tr><td>Desaguadero</td><td>5.0</td><td>ND</td><td>ND</td></tr>
        </tbody>
      </table>`);

// Brechas y Acceso
html = html.replace(/makeCoverageDonut\('covApChart', 83\.8\);/, "makeCoverageDonut('covApChart', 90.0);"); // Puno
html = html.replace(/makeCoverageDonut\('covSaneamientoChart', 76\.7\);/, "makeCoverageDonut('covSaneamientoChart', 84.0);"); // Puno

// Sostenibilidad
html = html.replace(/<p class="text-3xl font-bold mt-2">100%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Micromedición<\/p>/, '<p class="text-3xl font-bold mt-2">100%</p>\n<p class="text-xs text-slate-400 mt-1">Catastro (Puno y Desaguadero)</p>');
html = html.replace(/<p class="text-3xl font-bold mt-2">75%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Catastro comercial<\/p>/, '<p class="text-3xl font-bold mt-2">Sí</p>\n<p class="text-xs text-slate-400 mt-1">Subsidio Cruzado Focalizado</p>');

// Económico-Financiero
html = html.replace(/S\/ 4\.1 millones/g, 'S/ 16 236 861'); // Saldo inicial proyectado
html = html.replace(/S\/ 448 240/g, 'S/ 0'); // Deuda nueva a largo plazo
html = html.replace(/62\.3%/g, '14.4%'); // Incremento nominal acumulado fórmula base
html = html.replace(/6\.50%/g, '0.0%'); // Incremento año 1

// Inversiones
html = html.replace(/S\/ 13 642 987/g, 'S/ 22 783 039'); // Total unificado
html = html.replace(/S\/ 12 415 790/g, 'S/ 21 180 007'); // Agua y saneamiento
html = html.replace(/S\/ 535 380/g, 'S/ 428 329'); // MRSE
html = html.replace(/S\/ 418 223/g, 'S/ 142 113'); // PCC PAS
html = html.replace(/S\/ 273 593/g, 'S/ 1 032 591'); // GRD

html = html.replace(/data: \[6743600, 3951190, 1721000, 535380, 418223, 273593\]/, 'data: [0, 0, 21180007, 428329, 142113, 1032591]');

html = html.replace(/const projects = \[[\s\S]*?\];/, `const projects = [
  { name: "Mejoramiento electromecánico y conducción en Captación Totorani", category: "Obras", amount: 2513550, year: '2023-2027' },
  { name: "Control de pérdidas y fugas en redes domiciliarias en Puno", category: "Obras", amount: 1079619, year: '2023-2027' },
  { name: "Obras de cabecera en sector Uros Chulluni – Puno", category: "Obras", amount: 1059322, year: '2023-2027' }
];`);

// Tarifas
html = html.replace(/<p id="currentBill" class="text-2xl font-bold text-slate-600">S\/ 0\.00<\/p>/, '<p id="currentBill" class="text-2xl font-bold text-slate-600">S/ 34.01</p>'); // Ref base sin IGV (Puno)
html = html.replace(/<p id="newBill1" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill1" class="text-3xl font-bold text-cyan-700">S/ 34.50</p>'); // Ref año 1 sin IGV (No Beneficiario Puno)
html = html.replace(/<p id="newBill3" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill3" class="text-3xl font-bold text-cyan-700">S/ 36.57</p>'); // Ref año 3 sin IGV (Puno)

fs.writeFileSync('sunass-plus---sunassplus/web-pages/emsapuno/content-pages/EMSAPUNO.es-ES.webpage.copy.html', html, 'utf8');
console.log("Done");
