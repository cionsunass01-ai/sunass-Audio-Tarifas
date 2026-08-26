const fs = require('fs');
const path = require('path');

const MAIN_PAGE_PATH = path.join(__dirname, 'sunass-plus---sunassplus', 'web-pages', 'página-principal', 'content-pages', 'Página-principal.es-ES.webpage.copy.html');

console.log('📱 Aplicando optimizaciones responsivas para móviles en Página Principal...');

let html = fs.readFileSync(MAIN_PAGE_PATH, 'utf-8');

// 1. Enhanced Responsive CSS
const responsiveStyles = `
  /* ════════════════════════════════════════════════════════════════
     REGLAS RESPONSIVAS MÓVILES (Celulares y Tablets)
     ════════════════════════════════════════════════════════════════ */
  
  /* Contenedor del logo de la EPS: NUNCA deformar ni encoger */
  .eps-logo-box {
    flex-shrink: 0 !important;
    width: 60px !important;
    height: 60px !important;
    min-width: 60px !important;
    min-height: 60px !important;
    background: #ffffff !important;
    border: 1px solid #E2E8F0 !important;
    border-radius: 10px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 6px !important;
    overflow: hidden !important;
  }
  .eps-logo-box img {
    max-width: 100% !important;
    max-height: 100% !important;
    object-fit: contain !important;
  }

  /* Ajustes en pantallas móviles (< 640px) */
  @media (max-width: 640px) {
    /* Tarjeta general */
    .glass-card {
      padding: 0.875rem 1rem !important;
      margin-bottom: 0.875rem !important;
      border-radius: 12px !important;
    }
    
    /* Layout principal de la tarjeta: logo + título */
    .card-top-row {
      display: flex !important;
      align-items: flex-start !important;
      gap: 12px !important;
      width: 100% !important;
    }
    .card-title-col {
      min-width: 0 !important;
      flex: 1 !important;
    }
    .card-title-col h3 {
      font-size: 0.95rem !important;
      line-height: 1.3 !important;
      margin-bottom: 4px !important;
      word-break: break-word !important;
    }
    
    /* Fila de metadatos (Ver resumen, duración, descargas) */
    .card-meta-row {
      display: flex !important;
      flex-wrap: wrap !important;
      align-items: center !important;
      gap: 6px 10px !important;
      margin-top: 4px !important;
      font-size: 0.75rem !important;
    }
    .card-meta-row span, .card-meta-row button {
      font-size: 0.75rem !important;
    }
    
    /* Botones de acción */
    .card-actions-row {
      display: flex !important;
      flex-direction: column !important;
      gap: 7px !important;
      width: 100% !important;
      margin-top: 10px !important;
      padding-top: 8px !important;
      border-top: 1px dashed #E8ECF1 !important;
    }
    .btn-action {
      width: 100% !important;
      justify-content: center !important;
      padding: 7px 12px !important;
      font-size: 0.825rem !important;
      border-radius: 8px !important;
    }

    /* Header del sitio en móvil */
    header.header-bg {
      padding: 10px 12px !important;
    }
    header.header-bg select, header.header-bg input {
      font-size: 0.85rem !important;
      padding-top: 8px !important;
      padding-bottom: 8px !important;
    }

    /* Barra flotante del reproductor de audio */
    #audio-player-bar {
      padding: 8px 12px !important;
    }
    #audio-player-bar .audio-bar-inner {
      flex-wrap: wrap !important;
      gap: 6px !important;
    }
    #audio-player-bar #audio-player-title {
      max-width: calc(100% - 40px) !important;
      font-size: 0.8rem !important;
      order: 1 !important;
    }
    #audio-player-bar button {
      order: 2 !important;
      margin-left: auto !important;
    }
    #audio-player-bar audio {
      order: 3 !important;
      width: 100% !important;
      height: 32px !important;
    }
  }
`;

// Insert or update responsive styles in <style>
if (!html.includes('eps-logo-box')) {
  html = html.replace('</style>', responsiveStyles + '\n</style>');
}

// 2. Wrap logo boxes with class eps-logo-box
html = html.replace(
  /<div class="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center p-2">/g,
  '<div class="eps-logo-box">'
);

// 3. Add responsive helper classes to card structures
// First, replace <div class="flex items-center space-x-5"> -> <div class="card-top-row">
html = html.replace(
  /<div class="flex items-center space-x-5">/g,
  '<div class="card-top-row flex items-start sm:items-center space-x-3 sm:space-x-4">'
);

// Add class to title column
html = html.replace(
  /<div class="card-top-row([^>]*)">\s*<div class="eps-logo-box">([\s\S]*?)<\/div>\s*<div>/g,
  '<div class="card-top-row$1"><div class="eps-logo-box">$2</div><div class="card-title-col">'
);

// Add class to meta row (badges: resumen, duration, downloads)
html = html.replace(
  /<div class="flex items-center space-x-3 mt-1">/g,
  '<div class="card-meta-row flex flex-wrap items-center gap-2 mt-1">'
);

// Add class to actions row
html = html.replace(
  /<div class="flex items-center space-x-2 flex-wrap gap-2">/g,
  '<div class="card-actions-row flex items-center space-x-2 flex-wrap gap-2">'
);

// Fix audio player bar inner container for mobile
html = html.replace(
  '<div class="max-w-5xl mx-auto flex items-center gap-4">',
  '<div class="audio-bar-inner max-w-5xl mx-auto flex items-center gap-3">'
);

fs.writeFileSync(MAIN_PAGE_PATH, html, 'utf-8');
console.log('✅ Página Principal optimizada exitosamente.');
