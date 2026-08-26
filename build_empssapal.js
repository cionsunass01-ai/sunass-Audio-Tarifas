const fs = require('fs');
let html = fs.readFileSync('sunass-plus---sunassplus/web-pages/empssapal/content-pages/EMPSSAPAL.es-ES.webpage.copy.html', 'utf8');

// Header and Title
html = html.replace(/EMAPA HUARAL S.A\./g, 'EPS EMPSSAPAL S.A.');
html = html.replace(/Emapa Huaral/g, 'EMPSSAPAL');
html = html.replace(/EMAPA Huaral/g, 'EMPSSAPAL');
html = html.replace(/Huaral/g, 'Sicuani y Santo Tomás');

// Context
html = html.replace(
  /<p class="text-slate-600 leading-relaxed mb-6">[\s\S]*?<\/p>/,
  '<p class="text-slate-600 leading-relaxed mb-6">La <strong>EMPSSAPAL S.A.</strong> brinda servicios en Sicuani y Santo Tomás. Entre sus mayores desafíos operativos se encuentran la peligrosa presencia de arsénico natural en las fuentes de Sicuani (superando límites permisibles) y la extrema antigüedad de sus líneas de conducción (hasta 78 años). Adicionalmente, enfrenta un grave conflicto social en Santo Tomás por una "Junta Transitoria" ilegal que ha causado el retiro masivo de usuarios activos, sumado a un parque de medidores obsoleto con 52% de agua no facturada.</p>'
);

// Periodo Regulatorio
html = html.replace(/2025-2027/g, '2023-2028'); // Quinquenio 5 años

// Mejoras Esperadas
html = html.replace(
  /<ul class="space-y-3 text-slate-600 text-sm mb-6">[\s\S]*?<\/ul>/,
  `<ul class="space-y-3 text-slate-600 text-sm mb-6">
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Salud Pública e Infraestructura:</strong> Estudios definitivos para la vital remoción de arsénico y rehabilitación de las añosas líneas de conducción.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Reducción de pérdidas:</strong> Reemplazo masivo de 6,000 medidores obsoletos en Sicuani para controlar el ANF y recuperar ingresos.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Conservación Hídrica:</strong> Reforestación y zanjas de infiltración en la comunidad Conde Kjerca (MRSE) para asegurar las fuentes.</span></li>
  </ul>`
);

// Poblacion
html = html.replace(/86,220/g, '63,221'); // Población servida AP (Año 5)
html = html.replace(/98,168/g, '50,470'); // Población servida ALC (Año 5)

// Metas de Gestión (Gráficos)
html = html.replace(/const anFData = \[35, 29\];/, 'const anFData = [52.0, 47.0]; // Ref Sicuani');
html = html.replace(/const contData = \[18\.2, 19\];/, 'const contData = [23.1, 23.6]; // Ref Sicuani (C+0.5)'); 
html = html.replace(/const microData = \[95, 98\];/, 'const microData = [95.3, 100]; // Ref Sicuani');
html = html.replace(/const presData = \[8\.5, 10\];/, 'const presData = [24.5, 24.5]; // Ref Sicuani P'); 

// Metas a Nivel de Localidad
html = html.replace(/<table class="data-table glass-card rounded-2xl overflow-hidden">[\s\S]*?<\/table>/, `<table class="data-table glass-card rounded-2xl overflow-hidden">
        <thead><tr><th>Localidad</th><th>Continuidad (h/d)</th><th>Presión (m.c.a.)</th><th>Micromedición (%)</th></tr></thead>
        <tbody>
          <tr><td>Sicuani</td><td>C + 0.5 (Ref. 23.1)</td><td>P (Ref. 24.5)</td><td>100.0</td></tr>
          <tr><td>Santo Tomás</td><td>C (Ref. 15.1)</td><td>P (Ref. 13.8)</td><td>ND (Conflictos sociales)</td></tr>
        </tbody>
      </table>`);

// Brechas y Acceso
html = html.replace(/makeCoverageDonut\('covApChart', 83\.8\);/, "makeCoverageDonut('covApChart', 91.0);"); // Sicuani base ref
html = html.replace(/makeCoverageDonut\('covSaneamientoChart', 76\.7\);/, "makeCoverageDonut('covSaneamientoChart', 79.0);"); // Sicuani base ref

// Sostenibilidad
html = html.replace(/<p class="text-3xl font-bold mt-2">100%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Micromedición<\/p>/, '<p class="text-3xl font-bold mt-2">95.3%</p>\n<p class="text-xs text-slate-400 mt-1">Micromedición (Sicuani)</p>');
html = html.replace(/<p class="text-3xl font-bold mt-2">75%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Catastro comercial<\/p>/, '<p class="text-3xl font-bold mt-2">100%</p>\n<p class="text-xs text-slate-400 mt-1">Catastro GIS Sicuani</p>');

// Económico-Financiero
html = html.replace(/S\/ 4\.1 millones/g, 'S/ 3 108 738'); // Saldo inicial total reservas
html = html.replace(/S\/ 448 240/g, 'S/ 0'); // Deuda nueva
html = html.replace(/62\.3%/g, '17.3%'); // Incremento Sicuani nominal acumulado
html = html.replace(/6\.50%/g, '0.0%'); // Incremento año 1

// Inversiones
html = html.replace(/S\/ 13 642 987/g, 'S/ 6 240 736'); // Total unificado
html = html.replace(/S\/ 12 415 790/g, 'S/ 4 924 806'); // Agua y saneamiento
html = html.replace(/S\/ 535 380/g, 'S/ 116 800'); // MRSE
html = html.replace(/S\/ 418 223/g, 'S/ 858 130'); // PCC PAS VMA
html = html.replace(/S\/ 273 593/g, 'S/ 118 500'); // GRD

html = html.replace(/data: \[6743600, 3951190, 1721000, 535380, 418223, 273593\]/, 'data: [0, 0, 4924806, 116800, 858130, 118500]');

html = html.replace(/const projects = \[[\s\S]*?\];/, `const projects = [
  { name: "Renovación masiva de micromedidores (Sicuani)", category: "Comercial", amount: 1412267, year: '2023-2028' },
  { name: "Implementación y actualización del catastro técnico", category: "Comercial", amount: 571749, year: '2023-2028' },
  { name: "Mejoramiento en la PTAR Sicuani", category: "Obras", amount: 374385, year: '2023-2028' }
];`);

// Tarifas
html = html.replace(/<p id="currentBill" class="text-2xl font-bold text-slate-600">S\/ 0\.00<\/p>/, '<p id="currentBill" class="text-2xl font-bold text-slate-600">S/ 34.30</p>'); // Ref base sin IGV (Sicuani 16m3)
html = html.replace(/<p id="newBill1" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill1" class="text-3xl font-bold text-cyan-700">S/ 34.80</p>'); // Ref año 1 sin IGV
html = html.replace(/<p id="newBill3" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill3" class="text-3xl font-bold text-cyan-700">S/ 0.00</p>'); // Ref año 3 (ND)

fs.writeFileSync('sunass-plus---sunassplus/web-pages/empssapal/content-pages/EMPSSAPAL.es-ES.webpage.copy.html', html, 'utf8');
console.log("Done");
