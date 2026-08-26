const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const uuidv4 = () => crypto.randomUUID();

const baseDir = "c:\\Users\\Usuario Legal\\Documents\\carpetas de escritorio\\Proyectos Software de sunass para continuar y programar y probar localmente\\sunass-portal\\sunass-plus---sunassplus\\web-pages\\eps-maranon";
const contentDir = path.join(baseDir, "content-pages");

// 1. Rename root files
fs.readdirSync(baseDir).forEach(file => {
    if (file.startsWith("Emapa-Huaral")) {
        const oldPath = path.join(baseDir, file);
        const newName = file.replace("Emapa-Huaral", "Eps-Maranon");
        const newPath = path.join(baseDir, newName);
        fs.renameSync(oldPath, newPath);
    }
});

const newRootId = uuidv4();
const newContentId = uuidv4();

// 2. Update root yml
const rootYml = path.join(baseDir, "Eps-Maranon.webpage.yml");
if (fs.existsSync(rootYml)) {
    let content = fs.readFileSync(rootYml, "utf8");
    content = content.replace(/adx_name: .*/, "adx_name: Eps Maranon");
    content = content.replace(/adx_partialurl: .*/, "adx_partialurl: eps-maranon");
    content = content.replace(/adx_title: .*/, "adx_title: EPS Marañón S.A.");
    content = content.replace(/adx_webpageid: .*/, "adx_webpageid: " + newRootId);
    fs.writeFileSync(rootYml, content, "utf8");
}

// 3. Update content yml
const contentYml = path.join(contentDir, "Eps-Maranon.es-ES.webpage.yml");
if (fs.existsSync(contentYml)) {
    let content = fs.readFileSync(contentYml, "utf8");
    content = content.replace(/adx_name: .*/, "adx_name: Eps Maranon");
    content = content.replace(/adx_title: .*/, "adx_title: EPS Marañón S.A.");
    content = content.replace(/adx_rootwebpageid: .*/, "adx_rootwebpageid: " + newRootId);
    content = content.replace(/adx_webpageid: .*/, "adx_webpageid: " + newContentId);
    fs.writeFileSync(contentYml, content, "utf8");
}

console.log("Renamed and updated eps-maranon files");
