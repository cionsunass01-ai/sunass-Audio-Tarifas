const fs = require('fs');
const path = require('path');

console.log('=== PROCESANDO ACTUALIZACIÓN DESDE SHAREPOINT / ONEDRIVE ===');

// 1. Leer el evento de GitHub Actions
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

// Función auxiliar para buscar valores en objetos de Power Automate
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

// Extraer campos del payload
let rawFilePath = findValue(clientPayload, ['Path', '{FullPath}', 'path', 'filepath']) || process.env.FILE_PATH || '';
let fileName = findValue(clientPayload, ['Name', '{FilenameWithExtension}', 'filename', 'name']) || process.env.FILE_NAME || '';
let fileUrl = findValue(clientPayload, ['file_url', 'WebUrl', 'Link', '{Link}', 'share_url', 'url', 'webUrl']) || '';
let rawContent = clientPayload.file_content || findValue(clientPayload, ['$content', 'content', 'file_content']) || process.env.FILE_CONTENT_BASE64 || '';

console.log('📁 Ruta en OneDrive:', rawFilePath);
console.log('📄 Nombre de archivo:', fileName);
console.log('🔗 URL compartida de SharePoint:', fileUrl);

// Identificar carpetas de EPS
const epsDir = path.join(__dirname, 'eps');
const epsFolders = fs.readdirSync(epsDir).filter(f => fs.statSync(path.join(epsDir, f)).isDirectory());

function normalize(str) {
  return (str || '').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

let targetFolder = '';

// Buscar carpeta EPS por ruta
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

// Buscar carpeta EPS por partes de la ruta
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

if (!targetFolder) {
  console.log('⚠️ No se pudo asociar la ruta a una carpeta de EPS local.');
  process.exit(0);
}

const targetDir = path.join(epsDir, targetFolder);
const infoJsonPath = path.join(targetDir, 'info.json');

// Cargar info.json existente
let existingJson = {};
if (fs.existsSync(infoJsonPath)) {
  try {
    existingJson = JSON.parse(fs.readFileSync(infoJsonPath, 'utf8'));
  } catch (e) {}
}

const isImage = /\.(png|jpe?g|webp|svg|gif)$/i.test(fileName || rawFilePath);
const isAudio = /\.(m4a|mp3|wav|ogg)$/i.test(fileName || rawFilePath);
const isPdf = /\.pdf$/i.test(fileName || rawFilePath);
const isHtml = /\.html$/i.test(fileName || rawFilePath);
const isJson = /\.json$/i.test(fileName || rawFilePath);

// CASO 1: Es un Logo / Imagen -> Actualizar logo_url con el link de SharePoint
if (isImage && fileUrl) {
  // Asegurar formato de descarga directa si es de SharePoint
  let finalImageUrl = fileUrl;
  if (!finalImageUrl.includes('&download=1') && !finalImageUrl.includes('?download=1')) {
    finalImageUrl += (finalImageUrl.includes('?') ? '&' : '?') + 'download=1';
  }
  existingJson.logo_url = finalImageUrl;
  fs.writeFileSync(infoJsonPath, JSON.stringify(existingJson, null, 2), 'utf8');
  console.log(`🎉 ¡ÉXITO! Logo actualizado para ${targetFolder} con URL: ${finalImageUrl}`);
}

// CASO 2: Es un Audio -> Actualizar audio_url con el link de SharePoint
else if (isAudio && fileUrl) {
  existingJson.audio_url = fileUrl;
  fs.writeFileSync(infoJsonPath, JSON.stringify(existingJson, null, 2), 'utf8');
  console.log(`🎉 ¡ÉXITO! Audio actualizado para ${targetFolder} con URL: ${fileUrl}`);
}

// CASO 3: Es un PDF -> Actualizar pdf_url con el link de SharePoint
else if (isPdf && fileUrl) {
  let finalPdfUrl = fileUrl;
  if (!finalPdfUrl.includes('&download=1') && !finalPdfUrl.includes('?download=1')) {
    finalPdfUrl += (finalPdfUrl.includes('?') ? '&' : '?') + 'download=1';
  }
  existingJson.pdf_url = finalPdfUrl;
  fs.writeFileSync(infoJsonPath, JSON.stringify(existingJson, null, 2), 'utf8');
  console.log(`🎉 ¡ÉXITO! PDF oficial actualizado para ${targetFolder} con URL: ${finalPdfUrl}`);
}

// CASO 4: Es info.json o HTML -> Procesar contenido
else if (rawContent) {
  let fileBuffer = null;
  let contentString = '';
  try {
    const decoded = Buffer.from(rawContent, 'base64');
    contentString = decoded.toString('utf8');
    fileBuffer = decoded;
  } catch (e) {
    contentString = String(rawContent);
    fileBuffer = Buffer.from(contentString, 'utf8');
  }

  if (isJson || contentString.trim().startsWith('{')) {
    try {
      const incomingJson = JSON.parse(contentString);
      const mergedJson = {
        ...existingJson,
        ...incomingJson
      };
      fs.writeFileSync(infoJsonPath, JSON.stringify(mergedJson, null, 2), 'utf8');
      console.log(`🎉 ¡ÉXITO! info.json actualizado para ${targetFolder}`);
    } catch (e) {
      console.log('Error al fusionar JSON:', e.message);
    }
  } else if (isHtml || contentString.includes('<div') || contentString.includes('<!DOCTYPE')) {
    const destHtml = path.join(targetDir, fileName || `${targetFolder}.html`);
    fs.writeFileSync(destHtml, fileBuffer);
    console.log(`🎉 ¡ÉXITO! HTML actualizado para ${targetFolder} en ${destHtml}`);
  }
}
