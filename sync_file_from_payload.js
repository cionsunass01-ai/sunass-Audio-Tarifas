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
    console.log('Evento de GitHub cargado. Payload keys:', Object.keys(clientPayload));
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

console.log('Ruta detectada:', rawFilePath);
console.log('Nombre de archivo detectado:', fileName);

if (!rawContent) {
  console.log('⚠️ No se encontró contenido en el payload. Recompilando catálogo existente...');
  process.exit(0);
}

// Resolver contenido (si es base64 o texto directo o JSON)
let fileBuffer = null;
let contentString = '';

if (typeof rawContent === 'string') {
  // Intentar decodificar como base64
  try {
    const decoded = Buffer.from(rawContent, 'base64');
    const str = decoded.toString('utf8');
    // Si contiene caracteres legibles o es JSON
    if (str.includes('{') || str.includes('<!DOCTYPE') || str.includes('<html')) {
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
  // Si vino como objeto JSON directo
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

// Estrategia 1: Si es un JSON, leer el campo "nombre" de la EPS directamente del archivo!
if (contentString && (contentString.trim().startsWith('{') || contentString.includes('"nombre"'))) {
  try {
    const parsedJson = JSON.parse(contentString);
    const epsNameInJson = parsedJson.nombre || '';
    if (epsNameInJson) {
      console.log('EPS identificada directamente desde el contenido del JSON:', epsNameInJson);
      const normName = normalize(epsNameInJson);
      for (const folder of epsFolders) {
        const normFolder = normalize(folder);
        if (normName.includes(normFolder) || normFolder.includes(normName)) {
          targetFolder = folder;
          break;
        }
      }
    }
  } catch (e) {
    console.log('El contenido no es JSON parseable, intentando por nombre de ruta.');
  }
}

// Estrategia 2: Por ruta de OneDrive
if (!targetFolder && rawFilePath) {
  const normPath = normalize(rawFilePath);
  for (const folder of epsFolders) {
    const normFolder = normalize(folder);
    if (normPath.includes(normFolder)) {
      targetFolder = folder;
      break;
    }
  }
}

// Estrategia 3: Buscar coincidencias por palabras clave en la ruta
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

// Determinar nombre de archivo final
if (!fileName || typeof fileName !== 'string' || !fileName.includes('.')) {
  if (contentString && contentString.trim().startsWith('{')) {
    fileName = 'info.json';
  } else if (contentString && contentString.includes('<html')) {
    fileName = `${targetFolder || 'index'}.html`;
  } else {
    fileName = 'info.json';
  }
}

if (targetFolder) {
  const destPath = path.join(epsDir, targetFolder, fileName);
  fs.writeFileSync(destPath, fileBuffer);
  console.log(`🎉 ¡ÉXITO! Archivo guardado en: eps/${targetFolder}/${fileName} (${fileBuffer.length} bytes)`);
} else {
  console.log('⚠️ No se pudo determinar la EPS destino. Recompilando catálogo general...');
}
