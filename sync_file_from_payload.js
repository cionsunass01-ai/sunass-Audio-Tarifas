const fs = require('fs');
const path = require('path');

console.log('=== PROCESANDO ARCHIVO DESDE SHAREPOINT / ONEDRIVE ===');

// 1. Leer el archivo de evento completo de GitHub Actions
let clientPayload = {};
const eventPath = process.env.GITHUB_EVENT_PATH;
if (eventPath && fs.existsSync(eventPath)) {
  try {
    const eventData = JSON.parse(fs.readFileSync(eventPath, 'utf8'));
    clientPayload = eventData.client_payload || {};
    console.log('Evento de GitHub cargado.');
  } catch (e) {
    console.log('Error al leer GITHUB_EVENT_PATH:', e.message);
  }
}

// Función auxiliar para buscar valores recursivamente en objetos de Power Automate
function findValue(obj, keys) {
  if (!obj || typeof obj !== 'object') return null;
  for (const k of Object.keys(obj)) {
    if (keys.some(searchKey => k.toLowerCase().includes(searchKey.toLowerCase()))) {
      if (typeof obj[k] === 'string' && obj[k].trim() !== '') return obj[k];
    }
    if (typeof obj[k] === 'object') {
      const nested = findValue(obj[k], keys);
      if (nested) return nested;
    }
  }
  return null;
}

// Extraer Path, Name y Content
let rawFilePath = findValue(clientPayload, ['Path', '{FullPath}', 'path', 'filepath']) || process.env.FILE_PATH || '';
let fileName = findValue(clientPayload, ['Name', '{FilenameWithExtension}', 'filename', 'name']) || process.env.FILE_NAME || '';
let rawContent = clientPayload.file_content || findValue(clientPayload, ['$content', 'content', 'file_content']) || process.env.FILE_CONTENT_BASE64 || '';

console.log('Ruta detectada en OneDrive:', rawFilePath);
console.log('Nombre de archivo detectado:', fileName);

if (!rawContent) {
  console.log('⚠️ No se encontró contenido en el payload. Recompilando catálogo existente...');
  process.exit(0);
}

// Resolver contenido
let fileBuffer = null;
let contentString = '';

if (typeof rawContent === 'string') {
  try {
    const decoded = Buffer.from(rawContent, 'base64');
    const str = decoded.toString('utf8');
    if (str.includes('{') || str.includes('<') || str.includes('Ficha') || str.includes('DOCTYPE')) {
      fileBuffer = decoded;
      contentString = str;
    } else {
      fileBuffer = decoded;
    }
  } catch (e) {
    fileBuffer = Buffer.from(rawContent, 'utf8');
    contentString = rawContent;
  }
} else if (typeof rawContent === 'object') {
  contentString = JSON.stringify(rawContent, null, 2);
  fileBuffer = Buffer.from(contentString, 'utf8');
}

if (!fileBuffer) {
  console.log('⚠️ No se pudo procesar el buffer del archivo.');
  process.exit(0);
}

// Mapeo de carpetas de EPS
const epsDir = path.join(__dirname, 'eps');
const epsFolders = fs.readdirSync(epsDir).filter(f => fs.statSync(path.join(epsDir, f)).isDirectory());

function normalize(str) {
  return (str || '').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

let targetFolder = '';

// Estrategia 1: Por ruta de OneDrive
if (rawFilePath) {
  const normPath = normalize(rawFilePath);
  for (const folder of epsFolders) {
    const normFolder = normalize(folder);
    if (normPath.includes(normFolder) || normFolder.includes(normPath)) {
      targetFolder = folder;
      break;
    }
  }
}

// Estrategia 2: Si es un JSON, leer el nombre de la EPS del JSON
if (!targetFolder && contentString && (contentString.trim().startsWith('{') || contentString.includes('"nombre"'))) {
  try {
    const parsedJson = JSON.parse(contentString);
    const epsNameInJson = parsedJson.nombre || '';
    if (epsNameInJson) {
      const normName = normalize(epsNameInJson);
      for (const folder of epsFolders) {
        const normFolder = normalize(folder);
        if (normName.includes(normFolder) || normFolder.includes(normName)) {
          targetFolder = folder;
          break;
        }
      }
    }
  } catch (e) {}
}

// Estrategia 3: Buscar coincidencias en partes de la ruta
if (!targetFolder && rawFilePath) {
  const parts = rawFilePath.split(/[\\/]/).filter(p => p.trim() !== '');
  for (const part of parts) {
    const cleanPart = normalize(part.replace(/^[0-9]+\.\s*/, ''));
    for (const folder of epsFolders) {
      const normFolder = normalize(folder);
      if (cleanPart && (cleanPart.includes(normFolder) || normFolder.includes(cleanPart))) {
        targetFolder = folder;
        break;
      }
    }
    if (targetFolder) break;
  }
}

// Estrategia 4: Buscar mención de la EPS en el contenido HTML
if (!targetFolder && contentString) {
  for (const folder of epsFolders) {
    const normFolder = normalize(folder);
    if (normalize(contentString).includes(normFolder)) {
      targetFolder = folder;
      break;
    }
  }
}

console.log('Carpeta EPS identificada:', targetFolder);

// Determinar extensión y tipo de archivo
const isHtml = (fileName && fileName.toLowerCase().endsWith('.html')) ||
               (rawFilePath && rawFilePath.toLowerCase().endsWith('.html')) ||
               (contentString && /<[a-z][\s\S]*>/i.test(contentString) && !contentString.trim().startsWith('{'));

const isJson = (fileName && fileName.toLowerCase().endsWith('.json')) ||
               (rawFilePath && rawFilePath.toLowerCase().endsWith('.json')) ||
               (contentString && contentString.trim().startsWith('{'));

if (!fileName || typeof fileName !== 'string' || !fileName.includes('.')) {
  if (isJson) {
    fileName = 'info.json';
  } else if (isHtml) {
    fileName = `${targetFolder || 'index'}.html`;
  } else {
    fileName = 'info.json';
  }
}

if (targetFolder) {
  const targetDir = path.join(epsDir, targetFolder);
  const destPath = path.join(targetDir, fileName);

  // Si es info.json, fusionar datos
  if (fileName === 'info.json' && isJson) {
    try {
      const incomingJson = JSON.parse(contentString);
      let existingJson = {};
      if (fs.existsSync(destPath)) {
        try { existingJson = JSON.parse(fs.readFileSync(destPath, 'utf8')); } catch(e) {}
      }
      
      const mergedJson = {
        key: existingJson.key || targetFolder.toLowerCase().replace(/[^a-z0-9]/g, ''),
        slug: existingJson.slug || targetFolder,
        nombre: incomingJson.nombre || existingJson.nombre || targetFolder,
        region: incomingJson.region || existingJson.region || '',
        macroregion: incomingJson.macroregion || existingJson.macroregion || '',
        periodo: incomingJson.periodo || existingJson.periodo || '',
        resumen: incomingJson.resumen || existingJson.resumen || '',
        html_archivo: existingJson.html_archivo || `${targetFolder}.html`,
        audio_url: incomingJson.audio_url || existingJson.audio_url || '',
        pdf_url: incomingJson.pdf_url || existingJson.pdf_url || '',
        logo_url: incomingJson.logo_url || existingJson.logo_url || ''
      };

      fs.writeFileSync(destPath, JSON.stringify(mergedJson, null, 2), 'utf8');
      console.log(`🎉 ¡ÉXITO! info.json fusionado y guardado en: eps/${targetFolder}/info.json`);
    } catch (e) {
      fs.writeFileSync(destPath, fileBuffer);
    }
  } else {
    // Si es HTML, imagen, audio u otro
    fs.writeFileSync(destPath, fileBuffer);
    console.log(`🎉 ¡ÉXITO! Archivo ${fileName} guardado en: eps/${targetFolder}/${fileName} (${fileBuffer.length} bytes)`);
  }
} else {
  console.log('⚠️ No se pudo determinar la EPS destino. Recompilando catálogo general...');
}
