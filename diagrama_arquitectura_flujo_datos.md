# Diagramas de Arquitectura del Sistema y Flujo de Datos
## Sunass Plus — Portal de Estudios Tarifarios (SUNASS)

**Institución:** Superintendencia Nacional de Servicios de Saneamiento (SUNASS) — Equipo CION  
**Versión del documento:** 2.5  
**Fecha de actualización:** 2026-08-25  

Este documento contiene las representaciones visuales y técnicas de la arquitectura de la solución tecnológica y los flujos de datos e interacción entre los componentes clave: **GitHub Pages**, **Microsoft Power Automate**, **Microsoft Dataverse** y el **Repositorio Documental (SharePoint)**.

---

## 1. Diagrama de Arquitectura General del Sistema

El siguiente diagrama ilustra las capas arquitectónicas del portal, desde el acceso ciudadano y roles de usuario, pasando por la distribución estática de alta velocidad, hasta el puente de integración con Power Automate y la base de datos empresarial Dataverse.

```mermaid
flowchart TB
    %% ====================================================
    %% CAPA 1: USUARIOS Y CLIENTES
    %% ====================================================
    subgraph CAPA_USUARIOS ["👤 1. Capa de Clientes y Ciudadanía"]
        U_PUB["Ciudadano / Usuario General<br/>(Acceso Público / Móvil y PC)"]
        U_ADM["Equipo Técnico SUNASS / CION<br/>(Mantenimiento y Publicación)"]
    end

    %% ====================================================
    %% CAPA 2: GITHUB PAGES (HOSTING PÚBLICO Y CDN)
    %% ====================================================
    subgraph CAPA_HOSTING ["🌐 2. Hosting Público y Distribución (GitHub Pages)"]
        direction TB
        
        subgraph MOD_FRONTEND ["Componentes de Interfaz y Lógica (Client-Side)"]
            CATALOG["Catálogo Nacional de 50 EPS<br/>(Buscador + Filtros de Región y Macro Región)"]
            BADGES["Insignias de Periodo Regulatorio<br/>(Periodo oficial 2020-2025, 2023-2027, etc.)"]
            DASHBOARDS["Fichas Regulatorias Interactivas (50 SPAs)<br/>(Diagnósticos, Inversiones, Indicadores)"]
            AUDIO_PLAYER["Reproductor de Audio Flotante<br/>(Duración Dinámica de Podcasts)"]
            VIEWERS["Visor Lightbox con Zoom (Portadas)<br/>y Previsualizador PDF"]
            COUNTER_UI["Controlador de Descargas<br/>(Optimistic UI + Fetch Webhook)"]
        end
    end

    %% ====================================================
    %% CAPA 3: PUENTE DE INTEGRACIÓN (POWER AUTOMATE)
    %% ====================================================
    subgraph CAPA_INTEGRACION ["⚡ 3. Capa de Integración en Tiempo Real"]
        WEBHOOK["Power Automate HTTP Cloud Flow<br/>• Endpoint seguro con firma SAS<br/>• Manejo de CORS (Access-Control-Allow-Origin: *)<br/>• Extracción de payload { eps: '...' }"]
    end

    %% ====================================================
    %% CAPA 4: BACKEND EMPRESARIAL (MICROSOFT DATAVERSE)
    %% ====================================================
    subgraph CAPA_DATAVERSE ["🗄️ 4. Microsoft Dataverse (Persistencia de Datos)"]
        direction TB
        
        subgraph TABLAS_CUSTOM ["Entidades Personalizadas"]
            E_DOWNLOADS[("Contador de Descargas (cr138_contadordedescargas)<br/>• cr138_name (Identificador único EPS)<br/>• cr138_descargas (Entero acumulado)<br/>• cr138_ultimadescarga (Timestamp)")]
        end
        
        DV_ACTION["Conector Dataverse nativo:<br/>1. Enumerar filas (Filtro por cr138_name)<br/>2. Actualizar fila (Incremento +1)"]
    end

    %% ====================================================
    %% CAPA 5: REPOSITORIO DOCUMENTAL Y MULTIMEDIA
    %% ====================================================
    subgraph CAPA_DOCS ["📁 5. Repositorio Documental y Multimedia (SharePoint)"]
        DOCS_PDF["Estudios Tarifarios Oficiales<br/>(Documentos PDF con enlaces de descarga)"]
        DOCS_AUDIO["Resúmenes de Audio MP3<br/>(Archivos multimedia institucionales)"]
        DOCS_IMG["Portadas y Logos de EPS<br/>(Imágenes de alta resolución)"]
    end

    %% ====================================================
    %% CONEXIONES Y RELACIONES
    %% ====================================================
    U_PUB -->|Navega desde PC o Celular| CATALOG
    U_ADM -->|Compila y sube cambios git| CAPA_HOSTING

    CATALOG --> BADGES
    CATALOG --> DASHBOARDS
    CATALOG --> AUDIO_PLAYER
    CATALOG --> VIEWERS
    CATALOG --> COUNTER_UI

    COUNTER_UI -->|Petición POST asíncrona al descargar PDF| WEBHOOK
    WEBHOOK -->|Ejecuta conector| DV_ACTION
    DV_ACTION -->|Actualiza fila transaccional| E_DOWNLOADS

    VIEWERS -.->|Streaming y visualización| DOCS_IMG
    AUDIO_PLAYER -.->|Streaming de audio| DOCS_AUDIO
    DOCS_PDF -.->|Descarga directa al navegador| U_PUB
```

---

## 2. Diagrama de Secuencia: Flujo de Descarga y Conteo en Vivo

El siguiente diagrama detalla la secuencia exacta que se produce cada vez que un ciudadano descarga el estudio tarifario de una EPS:

```mermaid
sequenceDiagram
    autonumber
    actor Ciudadano as 👤 Visitante (Navegador)
    participant UI as 🖥️ Catálogo Web (GitHub Pages)
    participant Webhook as ⚡ Power Automate (HTTP Flow)
    participant Dataverse as 🗄️ Microsoft Dataverse
    participant SharePoint as 📁 SharePoint Online

    Ciudadano->>UI: Clic en "Descargar PDF" (ej. SEDACUSCO)
    activate UI
    UI->>UI: Incremento instantáneo en pantalla (Optimistic UI)
    UI->>SharePoint: Inicia descarga directa del archivo PDF
    activate SharePoint
    SharePoint-->>Ciudadano: Entrega archivo oficial del estudio tarifario
    deactivate SharePoint
    
    UI->>Webhook: POST https://...api.powerplatform.com/paths/invoke { "eps": "sedacusco" }
    activate Webhook
    Webhook->>Dataverse: Enumerar filas (cr138_name eq 'sedacusco')
    activate Dataverse
    Dataverse-->>Webhook: Retorna registro actual (descargas = 15)
    Webhook->>Dataverse: Actualizar fila (cr138_descargas = 16)
    Dataverse-->>Webhook: Confirmación de actualización
    deactivate Dataverse
    Webhook-->>UI: HTTP 200 OK { "status": "ok" }
    deactivate Webhook
    deactivate UI
```

---

## 3. Diagrama del Pipeline de Compilación Estática (`build_static_site.js`)

```mermaid
flowchart LR
    subgraph FUENTES ["📂 Código Fuente Original"]
        SRC_PAGES["web-pages/ (50 carpetas de EPS + Principal)"]
        SRC_FILES["web-files/ (CSS, Logos e Imágenes)"]
        SRC_TMPL["web-templates/ (Footer institucional)"]
    end

    subgraph COMPILADOR ["⚙️ Motor Node.js (build_static_site.js)"]
        PARSE["1. Mapeo y parsing de YAML/HTML"]
        TRANSFORM["2. Normalización de URLs a relativas (.html)"]
        RESPONSIVE["3. Inyección de reglas CSS Responsivas Móviles"]
        PERIODS["4. Inyección de Badges de Periodo Oficial"]
        FOOTER["5. Ensamble de Footer Institucional"]
        SYNC["6. Conexión de Webhook Power Automate"]
    end

    subgraph DIST ["🚀 Directorio de Salida (dist/)"]
        DIST_INDEX["index.html (Página Principal)"]
        DIST_EPS["50 archivos <slug>.html (Fichas Individuales)"]
        DIST_ASSETS["Archivos CSS e imágenes optimizadas"]
    end

    FUENTES --> COMPILADOR
    COMPILADOR --> DIST
```
