const fs = require('fs');
let html = fs.readFileSync('sunass-plus---sunassplus/web-pages/sedapal/content-pages/SEDAPAL.es-ES.webpage.copy.html', 'utf8');

// Header and Title
html = html.replace(/EMAPA HUARAL S.A\./g, 'SEDAPAL S.A.');
html = html.replace(/Emapa Huaral/g, 'SEDAPAL');
html = html.replace(/EMAPA Huaral/g, 'SEDAPAL');
html = html.replace(/Huaral/g, 'Lima Metropolitana y Callao');

// Context
html = html.replace(
  /<p class="text-slate-600 leading-relaxed mb-6">[\s\S]*?<\/p>/,
  '<p class="text-slate-600 leading-relaxed mb-6">El <strong>Servicio de Agua Potable y Alcantarillado de Lima (SEDAPAL S.A.)</strong> administra los servicios de saneamiento de Lima Metropolitana y el Callao. Sus principales problemáticas operativas y socioambientales incluyen el estrés hídrico de la cuenca, la vulnerabilidad de infraestructuras críticas (PTAP Huachipa) ante eventos climáticos, alta inoperatividad de medidores, sobrecarga en PTARs y abastecimiento restringido en sectores vulnerables.</p>'
);

// Periodo Regulatorio
html = html.replace(/2025-2027/g, '2022-2027');

// Mejoras Esperadas
html = html.replace(
  /<ul class="space-y-3 text-slate-600 text-sm mb-6">[\s\S]*?<\/ul>/,
  `<ul class="space-y-3 text-slate-600 text-sm mb-6">
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Reducción de agua no facturada:</strong> Disminución proyectada de pérdidas al 27% en el Año 5.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Sostenibilidad comercial:</strong> Mantenimiento de catastros comercial (89%) y técnico (97%) unificados.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Renovación de infraestructura:</strong> Cambio de kilómetros de redes secundarias y colectores en zonas críticas.</span></li>
  </ul>`
);

// Poblacion
html = html.replace(/86,220/g, '11,797,250'); // inicio 
html = html.replace(/98,168/g, '12,206,769'); // final 

// Metas de Gestión (Gráficos)
html = html.replace(/const anFData = \[35, 29\];/, 'const anFData = [28, 27];');
html = html.replace(/const contData = \[18\.2, 19\];/, 'const contData = [21.4, 21.0];'); 
html = html.replace(/const microData = \[95, 98\];/, 'const microData = [89, 0]; // 0 indica meta por instalación física');
html = html.replace(/const presData = \[8\.5, 10\];/, 'const presData = [21.8, 22.0];'); 

// Metas a Nivel de Localidad
html = html.replace(/<table class="data-table glass-card rounded-2xl overflow-hidden">[\s\S]*?<\/table>/, `<table class="data-table glass-card rounded-2xl overflow-hidden">
        <thead><tr><th>Localidad</th><th>Continuidad (h/d)</th><th>Presión (m.c.a.)</th><th>Micromedición (%)</th></tr></thead>
        <tbody>
          <tr><td>Lima y Callao</td><td>21.0</td><td>22.0</td><td>Meta física</td></tr>
        </tbody>
      </table>`);

// Brechas y Acceso
html = html.replace(/makeCoverageDonut\('covApChart', 83\.8\);/, "makeCoverageDonut('covApChart', 92.5);");
html = html.replace(/makeCoverageDonut\('covSaneamientoChart', 76\.7\);/, "makeCoverageDonut('covSaneamientoChart', 90.6);");

// Sostenibilidad
html = html.replace(/<p class="text-3xl font-bold mt-2">100%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Micromedición<\/p>/, '<p class="text-3xl font-bold mt-2">89.0%</p>\n<p class="text-xs text-slate-400 mt-1">Micromedición</p>');
html = html.replace(/<p class="text-3xl font-bold mt-2">75%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Catastro comercial<\/p>/, '<p class="text-3xl font-bold mt-2">89%</p>\n<p class="text-xs text-slate-400 mt-1">Catastro Comercial</p>');

// Económico-Financiero
html = html.replace(/S\/ 4\.1 millones/g, 'S/ 365 000 000'); // Saneamiento
html = html.replace(/S\/ 448 240/g, 'S/ 2 484 633 000'); // Pasivo de deuda
html = html.replace(/62\.3%/g, '8.4%'); // Incremento acumulado
html = html.replace(/6\.50%/g, '0.0%'); // Incremento año 1

// Inversiones
html = html.replace(/S\/ 13 642 987/g, 'S/ 1 962 951 050'); // Total general con Aguas Subterráneas
html = html.replace(/S\/ 12 415 790/g, 'S/ 1 724 199 520'); // Agua y saneamiento
html = html.replace(/S\/ 535 380/g, 'S/ 62 411 791'); // MRSE
html = html.replace(/S\/ 418 223/g, 'S/ 0'); // PCC
html = html.replace(/S\/ 273 593/g, 'S/ 98 376 547'); // GRD

html = html.replace(/data: \[6743600, 3951190, 1721000, 535380, 418223, 273593\]/, 'data: [0, 0, 1724199520, 62411791, 0, 98376547]');

html = html.replace(/const projects = \[[\s\S]*?\];/, `const projects = [
  { name: "Ampliación de sistemas AP y ALC para Pachacutec, Ventanilla", category: "Integral", amount: 98953313, year: '2022-2027' },
  { name: "Ampliación y mejoramiento esquema Cerro Las Ánimas (Puente Piedra)", category: "Integral", amount: 37477788, year: '2022-2027' },
  { name: "Ampliación AP y ALC habilitaciones Sargento Lores (SJL)", category: "Integral", amount: 32105780, year: '2022-2027' }
];`);

// Tarifas
html = html.replace(/<p id="currentBill" class="text-2xl font-bold text-slate-600">S\/ 0\.00<\/p>/, '<p id="currentBill" class="text-2xl font-bold text-slate-600">S/ 48.92</p>');
html = html.replace(/<p id="newBill1" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill1" class="text-3xl font-bold text-cyan-700">S/ 48.92</p>');
html = html.replace(/<p id="newBill3" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill3" class="text-3xl font-bold text-cyan-700">S/ 53.03</p>');

fs.writeFileSync('sunass-plus---sunassplus/web-pages/sedapal/content-pages/SEDAPAL.es-ES.webpage.copy.html', html, 'utf8');
console.log("Done");
