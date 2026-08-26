# PDR — Documento de Requisitos del Producto
## Sunass Plus — Portal de Estudios Tarifarios

**Producto:** Sunass Plus — Portal de Estudios Tarifarios  
**Plataforma de Origen:** Microsoft Power Pages (Power Platform / Dataverse)  
**Plataforma de Despliegue Público:** GitHub Pages + Webhook Power Automate a Dataverse  
**URL Pública:** [https://cionsunass01-ai.github.io/sunass-estudios-tarifarios/](https://cionsunass01-ai.github.io/sunass-estudios-tarifarios/)  
**Institución:** Superintendencia Nacional de Servicios de Saneamiento (SUNASS) — Equipo CION  
**Versión del documento:** 2.5  
**Fecha de actualización:** 2026-08-25  
**Documentos relacionados:** [arquitectura_sistema.md](arquitectura_sistema.md), [diagrama_arquitectura_flujo_datos.md](diagrama_arquitectura_flujo_datos.md), [manual_usuario.md](manual_usuario.md)  

---

## 1. Propósito y alcance

### 1.1 Propósito
Sunass Plus es un portal público ciudadano de alto impacto visual y técnico que centraliza el acceso a los **Estudios Tarifarios oficiales** de las 50 Entidades Prestadoras de Servicios de Saneamiento (EPS) del Perú. Presenta la información técnica, diagnósticos operativos, metas de gestión, planes de inversión y evolución tarifaria mediante **fichas regulatorias interactivas (SPAs)**, complementadas con documentos PDF oficiales, audiorresúmenes ejecutivos y una calculadora interactiva ("Mi Recibo").

### 1.2 Alcance actual (In-Scope, 100% Implementado)
- **Catálogo Nacional de 50 EPS:** Catálogo completo con las 50 empresas prestadoras del Perú clasificadas por Región y Macro Región (Norte, Sur, Centro, Oriente, Central/Lima).
- **Fichas Regulatorias Interactivas (50 de 50 EPS):** Cada EPS cuenta con su reporte interactivo con diagnósticos, indicadores de cobertura, agua no facturada, continuidad, proyectos de inversión y metas de gestión.
- **Insignias de Periodo Regulatorio (50 de 50 EPS):** Cada tarjeta del catálogo muestra junto al nombre de la EPS su **Periodo Regulatorio Oficial exacto** (ej. `2020-2025`, `2021-2026`, `2022-2027`, `2023-2027`, `2023-2028`, `2024-2028`, `2025-2027`, `2025-2029`) en concordancia con su resolución de aprobación del Consejo Directivo de SUNASS y portada del estudio.
- **Diseño Móvil 100% Responsivo:** Interfaz optimizada para celulares y tablets; contenedores de logos con tamaño protegido (`60x60px` con `flex-shrink: 0`), badges adaptables (`flex-wrap`), botones táctiles de ancho completo y cabecera compacta.
- **Contador de Descargas en Tiempo Real (Dataverse):** Conexión híbrida en vivo que registra cada clic de descarga enviando una solicitud HTTP asíncrona mediante un **Flujo Cloud de Power Automate** que actualiza la tabla `cr138_contadordedescargas` en Microsoft Dataverse sin requerir costos de licenciamiento de capacidad anónima en Power Pages.
- **Reproducción de Audio en Vivo (50 de 50 EPS):** Reproducción de audiorresúmenes con barra flotante inferior interactiva y cálculo dinámico de duración desde los metadatos del archivo.
- **Descarga Directa de PDF (50 de 50 EPS):** Enlace directo al documento oficial alojado en SharePoint/OneDrive institucional.
- **Buscador en Tiempo Real:** Filtrado instantáneo por nombre de EPS, provincia, distrito, región y macro región con normalización de tildes y diacríticos.
- **Filtros por Región y Macro Región:** Selectores funcionales que permiten segmentar el catálogo al instante.
- **Visor Lightbox de Portadas:** Ampliación modal de imágenes en alta resolución con controles de zoom (−/1:1/+) y enlace directo al visor de PDF.
- **Footer Institucional Oficial:** Pie de página con degradado azul-verde de SUNASS/CION (`#005B9F` a `#4BAF18`), logos vectoriales y derechos reservados.
- **Compilador Estático Automatizado (`build_static_site.js`):** Generador que compila todo el sitio en la carpeta `dist/` listo para su despliegue continuo en GitHub Pages.

### 1.3 Fuera de alcance (Decisiones de diseño)
- Autenticación obligatoria para consulta ciudadana (el acceso libre y sin barreras es un requerimiento central del producto).
- Alojamiento de archivos pesados en el repositorio git (se delegan a SharePoint/OneDrive institucional mediante enlaces optimizados).

---

## 2. Usuarios y roles

| Perfil | Descripción | Permisos / Acceso |
|---|---|---|
| **Ciudadano / Usuario General** | Visitante que consulta tarifas, descarga estudios o escucha audios desde PC o celular. | Acceso anónimo total, lectura de fichas, descarga de PDFs, escucha de audios e incremento de contador vía Webhook. |
| **Equipo Técnico CION / SUNASS** | Administradores y desarrolladores encargados de compilar datos y mantener el portal. | Edición de código, ejecución de scripts de compilación, gestión de flujos Power Automate y despliegue en GitHub. |
| **Empresa Prestadora (EPS)** | Entidad supervisada por SUNASS. | Objeto de la regulación; sus datos son consolidados por el equipo técnico. |

---

## 3. Matriz de Requisitos Funcionales (RF)

| ID | Requisito Funcional | Estado | Evidencia / Implementación |
|---|---|:---:|---|
| **RF-01** | Catálogo con 50 EPS con logo, nombre, periodo oficial, botón de resumen, duración de audio y descargas. | ✅ 100% | `dist/index.html` con 50 tarjetas completas. |
| **RF-02** | Insignia de Periodo Regulatorio visible junto al nombre de la EPS. | ✅ 100% | Badges con ícono de calendario (ej. `Periodo 2023 - 2027`). |
| **RF-03** | Buscador en vivo por texto (nombre, región, macro región, siglas). | ✅ 100% | Función `filterEpsCards()` con normalización Unicode. |
| **RF-04** | Filtros desplegables por Región y Macro Región. | ✅ 100% | Selectores de 24 regiones y 5 macro regiones sincronizados. |
| **RF-05** | Fichas regulatorias completas e interactivas por cada EPS. | ✅ 100% | 50 archivos `.html` independientes con navegación SPA y Chart.js. |
| **RF-06** | Reproductor de audio flotante con reproducción continua. | ✅ 100% | Barra `#audio-player-bar` con `<audio controls>` y duración real. |
| **RF-07** | Descarga oficial de PDF con seguimiento en tiempo real. | ✅ 100% | Función `trackDownload()` conectada a Power Automate. |
| **RF-08** | Sincronización del contador de descargas con Microsoft Dataverse. | ✅ 100% | Endpoint HTTP POST seguro que actualiza `cr138_descargas` en Dataverse. |
| **RF-09** | Visor Lightbox con zoom para inspección de portadas de estudios. | ✅ 100% | Modal con controles de zoom (−/1:1/+) y botón "Ver PDF". |
| **RF-10** | Calculadora tarifaria interactiva "Mi Recibo". | ✅ 100% | Implementada en dashboards piloto con cálculo por bloque de consumo. |
| **RF-11** | Adaptabilidad móvil fluida (Responsive Design). | ✅ 100% | Reglas `@media (max-width: 640px)`, clases `.eps-logo-box` y botones táctiles. |
| **RF-12** | Pie de página institucional oficial. | ✅ 100% | Footer con gradiente corporativo SUNASS/CION. |

---

## 4. Requisitos No Funcionales (RNF)

| ID | Requisito | Estado | Detalle técnico |
|---|---|:---:|---|
| **RNF-01** | **Cero costo de licenciamiento de acceso público** | ✅ Cumplido | Despliegue estático en GitHub Pages que elimina el costo por vista de página de Power Pages. |
| **RNF-02** | **Persistencia empresarial en Dataverse** | ✅ Cumplido | Flujo HTTP Instant Cloud en Power Automate que ejecuta operaciones directas sobre la base de datos oficial. |
| **RNF-03** | **Rendimiento y velocidad de carga** | ✅ Cumplido | HTML/CSS estático optimizado con Tailwind CSS, sin dependencias pesadas de servidor. |
| **RNF-04** | **Compatibilidad multidispositivo y móvil** | ✅ Cumplido | Totalmente testeado en navegadores móviles Android/iOS y escritorios modernos. |
| **RNF-05** | **Identidad visual institucional** | ✅ Cumplido | Paleta oficial SUNASS (`#0071CE`, `#005B9F`, `#5DB92E`, `#0B2341`, `#E0F7FA`, `#EBF7FF`). |
| **RNF-06** | **Trazabilidad y auditoría de datos** | ✅ Cumplido | Todos los periodos y metas provienen de las Resoluciones de Consejo Directivo de SUNASS. |

---

## 5. Arquitectura de Despliegue

```
  [Repositorio Local] ──(node build_static_site.js)──> [dist/ (51 HTMLs + Assets)]
                                                              │
                                                              ▼ (git push / upload)
                                                    [GitHub Pages (Hosting Público)]
                                                              │
                                                    (POST /trackDownload)
                                                              ▼
                                              [Power Automate Cloud Flow (Webhook)]
                                                              │
                                                              ▼
                                              [Microsoft Dataverse: cr138_contadordedescargas]
```
