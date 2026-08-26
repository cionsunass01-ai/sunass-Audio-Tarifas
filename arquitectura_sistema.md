# Sunass Plus — Portal de Estudios Tarifarios
## Documento de Arquitectura del Sistema

**Producto:** Sunass Plus — Portal de Estudios Tarifarios  
**Plataforma de Origen:** Microsoft Power Pages (Power Platform / Dataverse)  
**Plataforma de Producción Pública:** GitHub Pages + Webhook Power Automate a Dataverse  
**URL Pública:** [https://cionsunass01-ai.github.io/sunass-estudios-tarifarios/](https://cionsunass01-ai.github.io/sunass-estudios-tarifarios/)  
**Institución:** Superintendencia Nacional de Servicios de Saneamiento (SUNASS) — Equipo CION  
**Versión del documento:** 2.5  
**Fecha de actualización:** 2026-08-25  

---

## 1. Visión general de la solución

**Sunass Plus** es la plataforma institucional de SUNASS que centraliza y democratiza el acceso ciudadano a los **Estudios Tarifarios oficiales** de las 50 Entidades Prestadoras de Servicios de Saneamiento (EPS) del Perú.

El sistema proporciona:
1. **Catálogo Nacional Interactivo:** Indexación y visualización de las 50 EPS con buscador en vivo, filtros por región y macro región, y etiquetas de periodo regulatorio oficial.
2. **Fichas Regulatorias Interactivas (SPAs):** Páginas individuales con diagnósticos operacionales, metas de gestión, programas de inversión y simulador tarifario ("Mi Recibo").
3. **Reproducción de Audiorresúmenes:** Podcasts ejecutivos con duración calculada dinámicamente.
4. **Descarga Oficial de PDFs con Conteo en Tiempo Real:** Enlaces directos con registro de descargas sincronizado con Microsoft Dataverse mediante Power Automate.
5. **Visor de Portadas con Zoom (Lightbox):** Modal de alta resolución para inspección técnica de portadas y resoluciones.
6. **Diseño Móvil 100% Responsivo:** Interfaz adaptativa optimizada para pantallas táctiles y celulares.

---

## 2. Catálogo Oficial de las 50 EPS

| # | EPS | Región | Macro Región | Periodo Oficial | URL de Ficha |
|---|---|---|---|---|---|
| 1 | EMAPA HUARAL S.A. | Lima | Central (Lima) | 2025 - 2027 | `./Emapa-Huaral.html` |
| 2 | EPS AGUAS DE LIMA NORTE SA | Lima | Norte | 2025 - 2029 | `./Aguas-de-Lima-Norte.html` |
| 3 | EMAPA HVCA S.A. | Huancavelica | Centro | 2025 - 2028 | `./HVCA.html` |
| 4 | EMAPACOP S.A. | Ucayali | Oriente | 2025 - 2029 | `./EMAPACOP.html` |
| 5 | EPS NOR PUNO S.A. | Puno | Sur | 2025 - 2029 | `./NORPUNO.html` |
| 6 | EPS SEDAJULIACA S.A. | Puno | Sur | 2025 - 2029 | `./SEDAJULIACA.html` |
| 7 | EMAPA-Y | Puno | Sur | 2025 - 2029 | `./EMAPA-Y.html` |
| 8 | EMAPA CAÑETE S.A. | Lima | Sur | 2025 - 2027 | `./EMAPA-Canete.html` |
| 9 | AGUAS DEL ALTIPLANO | Puno | Sur | 2025 - 2029 | `./Aguas-del-Altiplano.html` |
| 10 | EPS SIERRA CENTRAL | Junín | Centro | 2025 - 2029 | `./Sierra-Central.html` |
| 11 | EPS EMSAPA CALCA S.A. | Cusco | Sur | 2025 - 2027 | `./EMSAPA-Calca.html` |
| 12 | EPSEL S.A. | Lambayeque | Norte | 2025 - 2028 | `./EPSEL.html` |
| 13 | EMAPA SAN MARTÍN | San Martín | Oriente | 2025 - 2029 | `./EMAPA-San-Martin.html` |
| 14 | EMAPA PASCO S.A. | Pasco | Centro | 2025 - 2027 | `./EMAPA-Pasco.html` |
| 15 | SEDACAJ S.A. | Cajamarca | Norte | 2025 - 2029 | `./SEDACAJ.html` |
| 16 | EPS ILO S.A. | Moquegua | Sur | 2025 - 2028 | `./EPS-Ilo.html` |
| 17 | EPS BARRANCA S.A. | Lima | Central (Lima) | 2025 - 2028 | `./EPS-Barranca.html` |
| 18 | EPS MARAÑÓN S.A. | Cajamarca | Norte | 2023 - 2028 | `./eps-maranon.html` |
| 19 | Unidad 002 Tumbes | Tumbes | Norte | 2023 - 2027 | `./unidad-002-tumbes.html` |
| 20 | EPS GRAU S.A. | Piura | Norte | 2022 - 2027 | `./eps-grau.html` |
| 21 | SEDALIB S.A. | La Libertad | Norte | 2021 - 2026 | `./sedalib.html` |
| 22 | SEDACHIMBOTE S.A. | Áncash | Norte | 2023 - 2028 | `./sedachimbote.html` |
| 23 | EPS CHAVIN S.A. | Áncash | Norte | 2015 - 2020 | `./eps-chavin.html` |
| 24 | SEDAPAL S.A. | Lima | Central (Lima) | 2022 - 2027 | `./sedapal.html` |
| 25 | SEDA AYACUCHO S.A. | Ayacucho | Centro | 2022 - 2027 | `./seda-ayacucho.html` |
| 26 | EPS EMAPICA S.A. | Ica | Sur | 2023 - 2028 | `./emapica.html` |
| 27 | EMAPAVIGS S.A. | Ica | Sur | 2024 - 2027 | `./emapavigs.html` |
| 28 | EMAPISCO S.A. | Ica | Sur | 2024 - 2026 | `./emapisco.html` |
| 29 | EPS SEMAPACH S.A. | Ica | Sur | 2024 - 2028 | `./semapach.html` |
| 30 | EMUSAP S.A. | Amazonas | Oriente | 2021 - 2026 | `./emusap.html` |
| 31 | EMAPAB S.A. | Amazonas | Oriente | 2023 - 2027 | `./emapab.html` |
| 32 | EPSSMU S.A. | Amazonas | Oriente | 2023 - 2028 | `./epssmu.html` |
| 33 | SEDALORETO S.A. | Loreto | Oriente | 2022 - 2027 | `./sedaloreto.html` |
| 34 | EPS RIOJA S.A. | San Martín | Oriente | 2022 - 2027 | `./rioja.html` |
| 35 | EPS MOYOBAMBA S.A. | San Martín | Oriente | 2021 - 2026 | `./moyobamba.html` |
| 36 | EPS SEDA HUÁNUCO S.A. | Huánuco | Centro | 2023 - 2028 | `./sedahuanuco.html` |
| 37 | EMSAPA YAULI LA OROYA S.R.L. | Junín | Centro | 2022 - 2027 | `./yauli.html` |
| 38 | EPS MANTARO S.A. | Junín | Centro | 2023 - 2028 | `./mantaro.html` |
| 39 | EPS SEDAM HUANCAYO S.A. | Junín | Centro | 2023 - 2028 | `./sedam-huancayo.html` |
| 40 | EPS SELVA CENTRAL S.A. | Junín | Centro | 2023 - 2027 | `./selva-central.html` |
| 41 | EPS EMAPAT S.A. | Madre de Dios | Oriente | 2023 - 2027 | `./emapat.html` |
| 42 | SEDACUSCO S.A. | Cusco | Sur | 2020 - 2025 | `./sedacusco.html` |
| 43 | EPS EMAQ S.A. | Cusco | Sur | 2024 - 2027 | `./emaq.html` |
| 44 | EMPSSAPAL S.A. | Cusco | Sur | 2023 - 2028 | `./empssapal.html` |
| 45 | EMUSAP ABANCAY S.A. | Apurímac | Sur | 2019 - 2024 | `./emusap-abancay.html` |
| 46 | EMSAP CHANKA S.A. | Apurímac | Sur | 2023 - 2027 | `./emsapchanka.html` |
| 47 | SEDAPAR S.A. | Arequipa | Sur | 2021 - 2026 | `./sedapar.html` |
| 48 | EPS MOQUEGUA S.A. | Moquegua | Sur | 2023 - 2027 | `./moquegua.html` |
| 49 | EPS TACNA S.A. | Tacna | Sur | 2024 - 2028 | `./tacna.html` |
| 50 | EMSAPUNO S.A. | Puno | Sur | 2023 - 2027 | `./emsapuno.html` |

---

## 3. Arquitectura Tecnológica Híbrida

La solución adopta una **Arquitectura Híbrida Desacoplada** que combina lo mejor de dos mundos:
1. **Despliegue Estático de Alto Rendimiento (GitHub Pages):** Distribución global gratuita, tiempos de carga inferiores a 500 ms, sin costos de licenciamiento de capacidad por vista anónima de Power Pages.
2. **Backend Transaccional en Microsoft Dataverse (Power Automate):** Persistencia empresarial de descargas y auditoría mediante un Flujo HTTP Instant Cloud.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CAPA DE CLIENTE                                │
│  Navegador Web (PC / Móvil) · https://cionsunass01-ai.github.io/             │
│  • Catálogo Nacional (50 EPS)     • Badges de Periodo Regulatorio           │
│  • Fichas Regulatorias (SPAs)     • Barra Flotante de Audio                 │
│  • Buscador y Filtros Dinámicos   • Visor Lightbox Portadas                 │
└──────────────────────┬───────────────────────────────┬──────────────────────┘
                       │                               │
                       │ 1. Descarga PDF               │ 2. Streaming Audio / PDF
                       ▼                               ▼
┌─────────────────────────────────────────┐  ┌────────────────────────────────┐
│      POWER AUTOMATE CLOUD FLOW          │  │     MICROSOFT SHAREPOINT       │
│  Trigger: Solicitud HTTP POST           │  │  Repositorio Oficial SUNASS    │
│  Body: { "eps": "sedacusco" }           │  │  • PDFs Oficiales de Estudios  │
│  CORS: Access-Control-Allow-Origin: *   │  │  • Audiorresúmenes MP3/WAV     │
│  Auth: Clave de Firma SAS Segura        │  │  • Portadas en Alta Resolución │
└──────────────────────┬──────────────────┘  └────────────────────────────────┘
                       │
                       │ Operación: Enumerar + Actualizar Fila
                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                       MICROSOFT DATAVERSE (BACKEND)                         │
│  Entorno: PowerPagesDeveloper-072425-092315                                 │
│  Tabla: Contador de Descargas (cr138_contadordedescargas)                   │
│  • cr138_name: Clave única de la EPS                                        │
│  • cr138_descargas: Contador entero acumulado (+1 por descarga)             │
│  • cr138_ultimadescarga: Marca de tiempo ISO-8601                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Componentes y Flujos Clave

### 4.1 Flujo de Registro de Descargas en Tiempo Real
1. El usuario hace clic en **"Descargar PDF"** de cualquier EPS.
2. Se dispara la función JavaScript `trackDownload(key)`:
   * **Optimistic UI:** Incrementa inmediatamente el contador visual en pantalla y en `localStorage`.
   * **Petición HTTP Asíncrona:** Realiza un `fetch(FLOW_WEBHOOK_URL, { method: 'POST', body: JSON.stringify({ eps: key }) })`.
3. El webhook de **Power Automate** recibe la petición:
   * Ejecuta la acción *Enumerar filas* en Dataverse filtrando por `cr138_name eq '@{triggerBody()?['eps']}'`.
   * Ejecuta la acción *Actualizar una fila*, sumando `+1` a `cr138_descargas`.
   * Retorna una respuesta `HTTP 200 OK` con cabeceras CORS.

### 4.2 Sistema de Diseño Responsivo Móvil
* **Contenedor `.eps-logo-box`:** Tamaño forzado `60px × 60px` con `flex-shrink: 0 !important` para impedir cualquier deformación o compresión por texto largo en celulares.
* **Badges con `.card-meta-row`:** Disposición flexible (`flex-wrap gap-2`) para evitar desbordamientos en pantallas menores a 380px.
* **Botones `.btn-action` Táctiles:** En móviles (`@media (max-width: 640px)`), los botones se expanden al ancho completo con tipografía centrada y espaciado táctil óptimo.
* **Barra Flotante `#audio-player-bar`:** Reordenamiento vertical adaptativo (Título → Botón Cerrar → Controles de Audio).

### 4.3 Motor de Compilación Estática (`build_static_site.js`)
* Lee las fuentes YAML y HTML de `sunass-plus---sunassplus/web-pages/`.
* Transforma los enlaces relativos de Power Pages (`href="/Emapa-Huaral"`) en enlaces estáticos limpios (`href="./Emapa-Huaral.html"`).
* Inyecta el **Footer Institucional Oficial** y los estilos de fondo `#ebf7ff !important`.
* Genera la distribución completa en la carpeta `dist/`.
