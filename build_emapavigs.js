const fs = require('fs');
let html = fs.readFileSync('sunass-plus---sunassplus/web-pages/emapavigs/content-pages/EMAPAVIGS.es-ES.webpage.copy.html', 'utf8');

// Header and Title
html = html.replace(/EMAPA HUARAL S.A\./g, 'EPS EMAPAVIGS S.A.');
html = html.replace(/Emapa Huaral/g, 'EMAPAVIGS');
html = html.replace(/EMAPA Huaral/g, 'EMAPAVIGS');
html = html.replace(/Huaral/g, 'Nasca y Vista Alegre');

// Context
html = html.replace(
  /<p class="text-slate-600 leading-relaxed mb-6">[\s\S]*?<\/p>/,
  '<p class="text-slate-600 leading-relaxed mb-6">La <strong>EPS EMAPAVIGS S.A.</strong> presta servicios en Nasca y Vista Alegre. Enfrenta problemáticas agudas como un elevado nivel de pérdidas físicas por muy baja micromedición (22.5%) y un severo estrés hídrico por el descenso del acuífero que alimenta sus pozos, lo cual ha provocado una caída crítica de la continuidad del servicio a promedios de 3.47 a 3.7 horas al día.</p>'
);

// Periodo Regulatorio
html = html.replace(/2025-2027/g, '2024-2027');

// Mejoras Esperadas
html = html.replace(
  /<ul class="space-y-3 text-slate-600 text-sm mb-6">[\s\S]*?<\/ul>/,
  `<ul class="space-y-3 text-slate-600 text-sm mb-6">
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Ampliación de la micromedición:</strong> Instalación de 1,800 medidores nuevos para sincerar pérdidas.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Incremento de continuidad y presión:</strong> Sectorización en Nasca Cercado y perforación de un nuevo pozo.</span></li>
    <li class="flex items-start"><svg class="w-5 h-5 text-cyan-500 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong>Conservación de fuentes (MRSE):</strong> Proyectos en la subcuenca del río Aja (bofedales).</span></li>
  </ul>`
);

// Poblacion
html = html.replace(/86,220/g, '49,831'); // inicio 
html = html.replace(/98,168/g, '52,752'); // final 

// Metas de Gestión (Gráficos)
html = html.replace(/const anFData = \[35, 29\];/, 'const anFData = [0, 0]; // ND - No disponible como porcentaje base/meta obligatoria');
html = html.replace(/const contData = \[18\.2, 19\];/, 'const contData = [3.47, 9.47]; // 3.47 base. Meta sector Nasca: C+6 h/d'); 
html = html.replace(/const microData = \[95, 98\];/, 'const microData = [24, 98]; // 24% base, 98% meta sector Nasca');
html = html.replace(/const presData = \[8\.5, 10\];/, 'const presData = [11.39, 9.6]; // 11.39 base, meta Rango P (>9.6 m.c.a)'); 

// Metas a Nivel de Localidad
html = html.replace(/<table class="data-table glass-card rounded-2xl overflow-hidden">[\s\S]*?<\/table>/, `<table class="data-table glass-card rounded-2xl overflow-hidden">
        <thead><tr><th>Sector / Localidad</th><th>Continuidad (h/d)</th><th>Presión (m.c.a.)</th><th>Micromedición (%)</th></tr></thead>
        <tbody>
          <tr><td>Sector Nasca Cercado</td><td>Base + 6.0 h/d</td><td>9.6 a 50.0</td><td>98.0</td></tr>
          <tr><td>Sector San Carlos</td><td>Base + 1.8 h/d</td><td>ND</td><td>Meta física</td></tr>
          <tr><td>Sector Vista Alegre</td><td>Base + 1.9 h/d</td><td>ND</td><td>Meta física</td></tr>
          <tr><td>Sector Cajuca</td><td>Base + 1.7 h/d</td><td>ND</td><td>Meta física</td></tr>
        </tbody>
      </table>`);

// Brechas y Acceso
html = html.replace(/makeCoverageDonut\('covApChart', 83\.8\);/, "makeCoverageDonut('covApChart', 67.4);");
html = html.replace(/makeCoverageDonut\('covSaneamientoChart', 76\.7\);/, "makeCoverageDonut('covSaneamientoChart', 89.8);");

// Sostenibilidad
html = html.replace(/<p class="text-3xl font-bold mt-2">100%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Micromedición<\/p>/, '<p class="text-3xl font-bold mt-2">24.0%</p>\n<p class="text-xs text-slate-400 mt-1">Micromedición Base</p>');
html = html.replace(/<p class="text-3xl font-bold mt-2">75%<\/p>\s*<p class="text-xs text-slate-400 mt-1">Catastro comercial<\/p>/, '<p class="text-3xl font-bold mt-2">100%</p>\n<p class="text-xs text-slate-400 mt-1">Catastro (Meta Año 1-4)</p>');

// Económico-Financiero
html = html.replace(/S\/ 4\.1 millones/g, 'S/ 1 027 511'); // Saldo inicial
html = html.replace(/S\/ 448 240/g, 'S/ 9 400 000'); // Deudas (Fonavi)
html = html.replace(/62\.3%/g, '18.27%'); // Incremento acumulado
html = html.replace(/6\.50%/g, '1.7%'); // Incremento año 1 por reordenamiento

// Inversiones
html = html.replace(/S\/ 13 642 987/g, 'S/ 4 253 201');
html = html.replace(/S\/ 12 415 790/g, 'S/ 3 884 673'); // Agua y saneamiento
html = html.replace(/S\/ 535 380/g, 'S/ 169 001'); // MRSE
html = html.replace(/S\/ 418 223/g, 'S/ 0'); // PCC
html = html.replace(/S\/ 273 593/g, 'S/ 199 527'); // GRD

html = html.replace(/data: \[6743600, 3951190, 1721000, 535380, 418223, 273593\]/, 'data: [0, 0, 3884673, 169001, 0, 199527]');

html = html.replace(/const projects = \[[\s\S]*?\];/, `const projects = [
  { name: "Pozo Nasca: Perforación de un pozo, estudio hidrogeológico", category: "Producción", amount: 1478960, year: '2024-2027' },
  { name: "Equipos de Bombeo: Renovación cámaras R100 y Pajonal N°2", category: "Equipamiento", amount: 810700, year: '2024-2027' },
  { name: "Micromedición: Suministro e instalación de 1,800 micromedidores", category: "Comercial", amount: 413156, year: '2024-2027' }
];`);

// Tarifas
html = html.replace(/<p id="currentBill" class="text-2xl font-bold text-slate-600">S\/ 0\.00<\/p>/, '<p id="currentBill" class="text-2xl font-bold text-slate-600">S/ 31.06</p>');
html = html.replace(/<p id="newBill1" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill1" class="text-3xl font-bold text-cyan-700">S/ 31.30</p>');
html = html.replace(/<p id="newBill3" class="text-3xl font-bold text-cyan-700">S\/ 0\.00<\/p>/, '<p id="newBill3" class="text-3xl font-bold text-cyan-700">S/ 34.49</p>');

fs.writeFileSync('sunass-plus---sunassplus/web-pages/emapavigs/content-pages/EMAPAVIGS.es-ES.webpage.copy.html', html, 'utf8');
console.log("Done");
