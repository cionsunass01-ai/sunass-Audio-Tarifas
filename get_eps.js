const fs = require('fs');

try {
    const content = fs.readFileSync('c:/Users/Usuario Legal/Documents/carpetas de escritorio/Proyectos Software de sunass para continuar y programar y probar localmente/sunass-portal/sunass-plus---sunassplus/web-pages/página-principal/content-pages/Página-principal.es-ES.webpage.copy.html', 'utf-8');
    
    const regex = /<h3 class="text-lg font-bold"[^>]*>(.*?)<\/h3>/g;
    let match;
    const epsList = [];
    
    while ((match = regex.exec(content)) !== null) {
        epsList.push(match[1].trim());
    }
    
    console.log("Total found:", epsList.length);
    console.log(epsList.join('\n'));
} catch(e) {
    console.error(e);
}
