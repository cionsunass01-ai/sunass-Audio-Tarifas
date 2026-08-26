const fs = require('fs');
let html = fs.readFileSync('sunass-plus---sunassplus/web-pages/moyobamba/content-pages/MOYOBAMBA.es-ES.webpage.copy.html', 'utf8');

// Header and Title
html = html.replace(/EMAPA HUARAL S.A\./g, 'EPS MOYOBAMBA S.A.');
html = html.replace(/Emapa Huaral/g, 'MOYOBAMBA');
html = html.replace(/EMAPA Huaral/g, 'MOYOBAMBA');
html = html.replace(/Huaral/g, 'Moyobamba');

// Context
html = html.replace(
  /<p class="text-slate-600 leading-relaxed mb-6">[\s\S]*?<\/p>/,
  '<p class="text-slate-600 leading-relaxed mb-6">La <strong>EPS MOYOBAMBA S.A.</strong> opera en Moyobamba. Su problemática principal está impulsada por un acelerado crecimiento poblacional que desborda la capacidad operativa actual. Esto genera una insuficiencia en la captación y tratamiento de agua, agudizada por altos niveles de turbidez en época de lluvias. Adicionalmente, la ciudad padece la ausencia de una PTAR activa, obligando al vertimiento directo de aguas servidas al río Mayo y a las quebradas locales.</p>'
);

// Periodo Regulatorio
html = html.replace(/2025-2027/g, '2021-2026');

// Mejoras Esperadas
html = html.replace(
  /<ul class="space-y-3 text-slate-600 text-sm mb-6">[\s\S]*?<\/ul>/,
  `<ul class="space-y-3 text-slate-600 text-sm mb-6">
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Reducción de pérdidas:</strong> Disminuir progresivamente el Agua No Facturada desde 33% hasta 31%.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Catastro Técnico:</strong> Alcanzar el 100% de actualización georreferenciada a partir del Año 3.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Renovación de medidores:</strong> Instalar más de 1,500 medidores anuales a partir del Año 2 para asegurar la medición.</span></li>
  </ul>`
);

// Poblacion
html = html.replace(/86,220/g, '51,651'); // inicio servida AP
html = html.replace(/98,168/g, '59,511'); // final servida AP

// Metas de Gestión (Gráficos)
html = html.replace(/const anFData = \[35, 29\];/, 'const anFData = [33, 31];');
html = html.replace(/const contData = \[18\.2, 19\];/, 'const contData = [20.8, 21.0];'); 
html = html.replace(/const microData = \[95, 98\];/, 'const microData = [96, 0]; // 0 = meta física en ud.');
html = html.replace(/const presData = \[8\.5, 10\];/, 'const presData = [0, 0]; // Presión no regulada formalmente en MGB'); 

// Metas a Nivel de Localidad
html = html.replace(/<table class="data-table glass-card rounded-2xl overflow-hidden">[\s\S]*?<\/table>/, `<table class="data-table glass-card rounded-2xl overflow-hidden">
        <thead><tr><th>Localidad</th><th>Continuidad (h/d)</th><th>Presión (m.c.a.)</th><th>Micromedición (%)</th></tr></thead>
        <tbody>
          <tr><td>Moyobamba</td><td>21.0</td><td>ND</td><td>Metas físicas anuales</td></tr>
        </tbody>
      </table>`);

// Brechas y Acceso
html = html.replace(/makeCoverageDonut\('covApChart', 83\.8\);/, "makeCoverageDonut('covApChart', 83.2);");
html = html.replace(/makeCoverageDonut\('covSaneamientoChart', 76\.7\);/, "makeCoverageDonut('covSaneamientoChart', 58.0);");

// Sostenibilidad
html = html.replace(/<p class="text-3xl font-bold mt-2">100%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Micromedición<\/p>/, '<p class="text-3xl font-bold mt-2">96%</p>\n<p class="text-xs text-slate-400 mt-1">Micromedición (Base)</p>');
html = html.replace(/<p class="text-3xl font-bold mt-2">75%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Catastro comercial<\/p>/, '<p class="text-3xl font-bold mt-2">100%</p>\n<p class="text-xs text-slate-400 mt-1">Catastro Comercial (Sostenido)</p>');

// Económico-Financiero
html = html.replace(/S\/ 4\.1 millones/g, 'S/ 7 534 143'); // Saldo inicial total
html = html.replace(/S\/ 448 240/g, 'S/ 1 568 790'); // Deudas Fonavi
html = html.replace(/62\.3%/g, '21.7%'); // Incremento acumulado
html = html.replace(/6\.50%/g, '0.0%'); // Incremento año 1

// Inversiones
html = html.replace(/S\/ 13 642 987/g, 'S/ 19 133 372');
html = html.replace(/S\/ 12 415 790/g, 'S/ 16 930 406'); // Agua y saneamiento
html = html.replace(/S\/ 535 380/g, 'S/ 1 700 296'); // MRSE
html = html.replace(/S\/ 418 223/g, 'S/ 15 000'); // PCC
html = html.replace(/S\/ 273 593/g, 'S/ 487 670'); // GRD

html = html.replace(/data: \[6743600, 3951190, 1721000, 535380, 418223, 273593\]/, 'data: [0, 0, 16930406, 1700296, 15000, 487670]');

html = html.replace(/const projects = \[[\s\S]*?\];/, `const projects = [
  { name: "Construcción de un pozo tubular en el sector 2 (Moyobamba)", category: "Producción", amount: 3017977, year: '2021-2026' },
  { name: "Mej. captación, aducción, desarenador y reservorio Almendra", category: "Producción", amount: 2370781, year: '2021-2026' },
  { name: "Renovación de 6,619 micromedidores de 1/2''", category: "Comercial", amount: 2053954, year: '2021-2026' }
];`);

// Tarifas
html = html.replace(/<p id="currentBill" class="text-2xl font-bold text-slate-600">S\/ 0\.00<\/p>/, '<p id="currentBill" class="text-2xl font-bold text-slate-600">S/ 35.70</p>');
html = html.replace(/<p id="newBill1" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill1" class="text-3xl font-bold text-cyan-700">S/ 35.70</p>'); // No benef sin IGV
html = html.replace(/<p id="newBill3" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill3" class="text-3xl font-bold text-cyan-700">S/ 39.27</p>'); // Año 3 (+10%)

fs.writeFileSync('sunass-plus---sunassplus/web-pages/moyobamba/content-pages/MOYOBAMBA.es-ES.webpage.copy.html', html, 'utf8');
console.log("Done");
