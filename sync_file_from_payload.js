const fs = require('fs');
const path = require('path');

console.log('=== PROCESANDO ARCHIVO DESDE SHAREPOINT / ONEDRIVE ===');

// Leer el archivo de evento completo de GitHub Actions si existe
let clientPayload = {};
const eventPath = process.env.GITHUB_EVENT_PATH;
if (eventPath && fs.existsSync(eventPath)) {
  try {
    const eventData = JSON.parse(fs.readFileSync(eventPath, 'utf8'));
    clientPayload = eventData.client_payload || {};
    console.log('Evento de GitHub cargado correctamente.');
  } catch (e) {
    console.log('No se pudo leer GITHUB_EVENT_PATH:', e.message);
  }
}

// Extraer campos con soporte para múltiples formatos de Power Automate
let rawFilePath = clientPayload.file_path || process.env.FILE_PATH || '';
let fileName = clientPayload.file_name || process.env.FILE_NAME || '';
let base64Content = clientPayload.file_content || process.env.FILE_CONTENT_BASE64 || '';

// Si los objetos vienen anidados desde Power Automate
if (typeof rawFilePath === 'object' && rawFilePath !== null) {
  rawFilePath = rawFilePath.Path || rawFilePath['{FullPath}'] || rawFilePath.path || '';
}
if (typeof fileName === 'object' && fileName !== null) {
  fileName = fileName.Name || fileName['{FilenameWithExtension}'] || fileName.name || '';
}
if (typeof base64Content === 'object' && base64Content !== null) {
  base64Content = base64Content['$content'] || base64Content.content || '';
}

// Si el nombre del archivo está vacío pero está en la ruta
if (!fileName && rawFilePath) {
  const parts = rawFilePath.split(/[\\/]/).filter(p => p.trim() !== '');
  if (parts.length > 0 && parts[parts.length - 1].includes('.')) {
    fileName = parts[parts.length - 1];
  }
}

// Por defecto, si aún está vacío
if (!fileName) {
  fileName = 'info.json';
}

console.log('Ruta OneDrive:', rawFilePath);
console.log('Nombre Archivo:', fileName);

if (!base64Content) {
  console.log('⚠️ No se recibió contenido base64 para escribir. Recompilando portal existente...');
  process.exit(0);
}

// Decodificar el contenido
let fileBuffer;
try {
  fileBuffer = Buffer.from(base64Content, 'base64');
} catch (e) {
  console.error('Error al decodificar base64:', e.message);
  process.exit(0);
}

// Mapeo de carpetas de OneDrive a las carpetas en eps/
const epsDir = path.join(__dirname, 'eps');
const epsFolders = fs.readdirSync(epsDir).filter(f => fs.statSync(path.join(epsDir, f)).isDirectory());

function normalize(str) {
  return (str || '').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

// Extraer el nombre de la carpeta de la EPS de la ruta
let oneDriveFolderName = '';
const parts = (rawFilePath || '').split(/[\\/]/).filter(p => p.trim() !== '');
if (parts.length >= 2) {
  // Si el último elemento es el archivo, la carpeta es el penúltimo
  if (parts[parts.length - 1].includes('.')) {
    oneDriveFolderName = parts[parts.length - 2];
  } else {
    oneDriveFolderName = parts[parts.length - 1];
  }
}

console.log('Carpeta detectada en OneDrive:', oneDriveFolderName);

// Buscar la carpeta correspondiente en eps/
let targetFolder = '';
const normOneDrive = normalize(oneDriveFolderName);

if (normOneDrive) {
  for (const folder of epsFolders) {
    const normFolder = normalize(folder);
    if (normOneDrive.includes(normFolder) || normFolder.includes(normOneDrive)) {
      targetFolder = folder;
      break;
    }
  }

  if (!targetFolder) {
    const cleanOneDrive = oneDriveFolderName.replace(/^[0-9]+\.\s*/, '');
    for (const folder of epsFolders) {
      if (normalize(cleanOneDrive).includes(normalize(folder)) || normalize(folder).includes(normalize(cleanOneDrive))) {
        targetFolder = folder;
        break;
      }
    }
  }
}

// Si aún no se encuentra pero hay mención en fileName o ruta
if (!targetFolder && rawFilePath) {
  for (const folder of epsFolders) {
    if (normalize(rawFilePath).includes(normalize(folder))) {
      targetFolder = folder;
      break;
    }
  }
}

// Fallback: si no se detectó EPS específica, buscar en las 50
if (targetFolder) {
  const targetDir = path.join(epsDir, targetFolder);
  const destPath = path.join(targetDir, fileName);

  // Asegurar que destPath sea un archivo y no un directorio
  if (fs.existsSync(destPath) && fs.statSync(destPath).isDirectory()) {
    console.error('Destino es un directorio, asignando nombre de archivo por defecto.');
    fs.writeFileSync(path.join(destPath, 'info.json'), fileBuffer);
  } else {
    fs.writeFileSync(destPath, fileBuffer);
    console.log(`✅ Archivo guardado con éxito en: eps/${targetFolder}/${fileName} (${fileBuffer.length} bytes)`);
  }
} else {
  console.log(`⚠️ No se pudo asociar la carpeta "${oneDriveFolderName}" a una EPS local. Continuando compilación...`);
}
