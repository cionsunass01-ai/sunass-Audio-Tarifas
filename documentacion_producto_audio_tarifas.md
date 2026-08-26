# DOCUMENTACIÓN OFICIAL DEL PRODUCTO
# AUDIO TARIFAS — PORTAL DE ESTUDIOS TARIFARIOS Y SÍNTESIS REGULATORIA

---

**Nombre del Producto:** Audio Tarifas (Sunass Plus)  
**Institución Responsable:** Superintendencia Nacional de Servicios de Saneamiento (SUNASS)  
**Unidad Formuladora y Líder:** Centro de Inteligencia de Operaciones para la Innovación (Equipo CION)  
**Unidad Usuaria y Especialista:** Dirección de Regulación Tarifaria (DRT)  
**Soporte Tecnológico:** Oficina de Tecnologías de la Información (OTI)  
**Enlace Público de Producción:** [https://cionsunass01-ai.github.io/sunass-estudios-tarifarios/](https://cionsunass01-ai.github.io/sunass-estudios-tarifarios/)  
**Versión del Documento:** 2.5  
**Fecha de Publicación:** 25 de agosto de 2026  
**Código del Proyecto:** INNOV-CION-2026-003 / PROY-AUDIO-TARIFAS  

---

## ÍNDICE GENERAL

1. [Resumen Ejecutivo](#1-resumen-ejecutivo)
2. [Definición del Problema Público y Justificación](#2-definición-del-problema-público-y-justificación)
3. [Objetivos del Producto](#3-objetivos-del-producto)
4. [Alcance y Cobertura Nacional (50 EPS)](#4-alcance-y-cobertura-nacional-50-eps)
5. [Funcionalidades Principales del Sistema](#5-funcionalidades-principales-del-sistema)
6. [Arquitectura Tecnológica e Integración Híbrida](#6-arquitectura-tecnológica-e-integración-híbrida)
7. [Matriz de Requisitos Funcionales y No Funcionales](#7-matriz-de-requisitos-funcionales-y-no-funcionales)
8. [Catálogo Maestro Oficial de las 50 EPS](#8-catálogo-maestro-oficial-de-las-50-eps)
9. [Impacto, Población Beneficiaria y Gobernanza](#9-impacto-población-beneficiaria-y-gobernanza)
10. [Conclusiones y Recomendaciones](#10-conclusiones-y-recomendaciones)

---

## 1. Resumen Ejecutivo

**Audio Tarifas** es una solución digital de innovación pública desarrollada por el **Equipo CION** en estrecha articulación con la **Dirección de Regulación Tarifaria (DRT)** de la SUNASS. Su misión fundamental es **democratizar, transparentar y simplificar el acceso de la ciudadanía a los Estudios Tarifarios oficiales** de las 50 Empresas Prestadoras de Servicios de Saneamiento (EPS) del Perú.

El producto transforma documentos regulatorios altamente densos y complejos (informes técnicos de más de 300 páginas) en una experiencia web interactiva, visual y multimedia. Permite a cualquier usuario explorar el catálogo nacional, escuchar **audiorresúmenes ejecutivos (podcasts)**, consultar **Fichas Regulatorias interactivas (SPAs)** con gráficos de inversiones y metas de calidad, simular su facturación estimada mediante la calculadora *"Mi Recibo"*, y descargar los documentos oficiales con registro y persistencia en tiempo real en la base de datos empresarial **Microsoft Dataverse**.

---

## 2. Definición del Problema Público y Justificación

### 2.1 El Problema Público Central
> **Asimetría de información, desconfianza ciudadana y dificultad de acceso a la información regulatoria sobre los servicios de agua potable y saneamiento en el Perú.**

Históricamente, los estudios tarifarios aprobados por el Consejo Directivo de SUNASS se publicaban exclusivamente en formatos PDF extensos, con terminología económica-financiera de alta complejidad y distribuidos en repositorios poco accesibles. Esta barrera generaba:
- Desconocimiento sobre el destino del dinero recaudado por las tarifas de agua.
- Desinformación y resistencia social ante los ajustes tarifarios indispensables para la sostenibilidad de los servicios.
- Falta de empoderamiento ciudadano para fiscalizar el cumplimiento de las metas de gestión (horas de agua al día, presión, micromedición y calidad).

### 2.2 Justificación Estratégica
El proyecto se fundamenta en los mandatos de la **Ley de Transparencia y Acceso a la Información Pública (Ley N° 27806)**, la **Política Nacional de Modernización de la Gestión Pública al 2030 (PCM)** y el **Plan Estratégico Institucional (PEI) de SUNASS**, alineándose con los objetivos:
- **OEI.01:** *Mejorar la prestación y sostenibilidad de los servicios de saneamiento brindados por los prestadores a nivel nacional.*
- **OEI.04:** *Fortalecer la gobernanza, transparencia, orientación al usuario y transformación digital de la SUNASS.*

---

## 3. Objetivos del Producto

### 3.1 Objetivo General
Desarrollar, implementar y desplegar una plataforma digital pública, interactiva, accesible y de alta velocidad que centralice y sintetice la información de los Estudios Tarifarios de las 50 EPS del Perú, incorporando recursos multimedia de audio, paneles visuales interactivos y persistencia de datos en Microsoft Dataverse sin costo de licenciamiento de acceso público.

### 3.2 Objetivos Específicos
1. **Cobertura Total:** Cubrir el 100% de las 50 EPS del país en sus 24 regiones y 5 macro regiones (Norte, Sur, Centro, Oriente, Central/Lima).
2. **Síntesis Multimedia:** Proporcionar 50 audiorresúmenes ejecutivos con reproductor flotante integrado y duración calculada dinámicamente.
3. **Fichas Regulatorias SPA:** Desarrollar 50 tableros interactivos individuales con indicadores de brechas, proyectos de inversión y metas de gestión anualizadas.
4. **Trazabilidad Regulatoria:** Incorporar y auditar las insignias de **Periodo Regulatorio Oficial** (2020-2025, 2023-2027, 2025-2027, 2025-2029) en estricta concordancia con las Resoluciones del Consejo Directivo de SUNASS.
5. **Arquitectura Híbrida de Alto Rendimiento:** Implementar un modelo desacoplado (GitHub Pages + Power Automate + Dataverse) que garantice tiempos de carga inferiores a 500 ms y costo cero de licenciamiento por capacidad anónima.
6. **Diseño Móvil Universal (Mobile-First):** Asegurar una experiencia 100% responsiva para celulares y tablets.

---

## 4. Alcance y Cobertura Nacional (50 EPS)

El producto **Audio Tarifas** abarca la totalidad del ámbito regulatorio urbano del Perú, segmentado en **5 Macro Regiones**:

```
                                    ┌───────────────────────┐
                                    │    MACRO REGIONES     │
                                    └───────────┬───────────┘
                 ┌──────────────┬───────────────┼───────────────┬──────────────┐
                 ▼              ▼               ▼               ▼              ▼
           ┌───────────┐  ┌───────────┐   ┌───────────┐   ┌───────────┐  ┌───────────┐
           │   NORTE   │  │    SUR    │   │  CENTRO   │   │  ORIENTE  │  │  CENTRAL  │
           │  (10 EPS) │  │  (14 EPS) │   │  (11 EPS) │   │  (12 EPS) │  │  (3 EPS)  │
           └───────────┘  └───────────┘   └───────────┘   └───────────┘  └───────────┘
```

- **Macro Región Norte (10 EPS):** Áncash, Cajamarca, La Libertad, Lambayeque, Piura, Tumbes y Lima Norte.
- **Macro Región Sur (14 EPS):** Arequipa, Apurímac, Cusco, Ica, Moquegua, Puno, Tacna y Lima Sur (Cañete).
- **Macro Región Centro (11 EPS):** Ayacucho, Huancavelica, Huánuco, Junín y Pasco.
- **Macro Región Oriente (12 EPS):** Amazonas, Loreto, Madre de Dios, San Martín y Ucayali.
- **Macro Región Central / Lima Metropolitana (3 EPS):** SEDAPAL, EMAPA Huaral y EPS Barranca.

---

## 5. Funcionalidades Principales del Sistema

### 5.1 Catálogo Nacional con Búsqueda en Vivo
- **Filtrado predictivo en tiempo real:** Búsqueda instantánea por nombre de empresa, siglas, departamentos, provincias o distritos, con normalización automática de tildes y caracteres especiales.
- **Filtros por Región y Macro Región:** Selectores interactivos para acotar la búsqueda a nivel geográfico.
- **Contador Dinámico de Resultados:** Indicador en tiempo real de estudios disponibles y resultados filtrados.

### 5.2 Insignias de Periodo Regulatorio Oficial
Cada tarjeta del catálogo cuenta con una insignia institucional azul con ícono de calendario que especifica el quinquenio o trienio regulatorio aprobado (ej. `📅 Periodo 2023 - 2027`), evitando confusiones sobre la vigencia del estudio.

### 5.3 Módulo de Audiorresúmenes (Audio Tarifas)
- Reproducción directa de podcasts ejecutivos (de 4 a 8 minutos) elaborados para explicar las razones del estudio, inversiones y beneficios para la ciudad.
- Barra flotante inferior `#audio-player-bar` con `<audio controls>` que permanece activa durante toda la navegación.
- Duración leída dinámicamente de los metadatos del archivo de audio al cargar la página.

### 5.4 Fichas Regulatorias Interactivas (SPAs)
Páginas individuales dedicadas a cada EPS con 5 secciones:
1. **Datos Generales:** Resolución de aprobación de SUNASS, localidad, tamaño y periodo regulatorio.
2. **Diagnósticos Operativos:** Cobertura de agua potable/alcantarillado, continuidad promedio (horas/día) y porcentaje de agua no facturada con gráficos de dona (Chart.js).
3. **Simulador "Mi Recibo":** Calculadora interactiva por categorías tarifarias (Social, Doméstica, Comercial, Industrial, Estatal) y volumen de consumo en m³.
4. **Plan de Inversiones:** Desglose del presupuesto en obras de cabecera, plantas de tratamiento, micromedición, gestión de riesgos de desastres (GRD) y mecanismos de retribución por servicios ecosistémicos (MRSE).
5. **Metas de Gestión:** Compromisos anuales auditables exigibles a la EPS por SUNASS.

### 5.5 Descarga Oficial y Conteo en Tiempo Real (Dataverse)
- Enlace directo de descarga del archivo PDF oficial alojado en el repositorio institucional.
- Ejecución asíncrona de `trackDownload(key)` que suma +1 en la interfaz (Optimistic UI) y envía una petición HTTP al webhook de Power Automate para actualizar la base de datos empresarial de **Microsoft Dataverse**.

### 5.6 Visor de Portadas en Alta Resolución (Lightbox)
- Modal flotante con controles de aumento (−/1:1/+) para inspeccionar portadas oficiales y resoluciones.
- Botón de acceso directo *"Ver PDF"* embebido.

### 5.7 Diseño Móvil Responsivo (Mobile-First)
- Contenedores de logotipos con dimensiones fijas (`60px × 60px`) y `flex-shrink: 0 !important` para impedir deformaciones.
- Botones de acción táctil de ancho completo con diseño ergonómico.
- Barra flotante de audio con reordenamiento inteligente para pantallas reducidas.

---

## 6. Arquitectura Tecnológica e Integración Híbrida

La plataforma **Audio Tarifas** se construyó bajo un modelo **Híbrido Desacoplado**, logrando alta escalabilidad y costo cero de infraestructura pública:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            1. CAPA DE PRESENTACIÓN                          │
│  GitHub Pages (CDN Global) · https://cionsunass01-ai.github.io/             │
│  • HTML5 Semántico + Tailwind CSS + Vanilla JS + Chart.js                   │
│  • 50 SPAs interactivas + Catálogo Principal + Responsive Design            │
└──────────────────────┬───────────────────────────────┬──────────────────────┘
                       │                               │
                       │ 1. Evento de Descarga PDF     │ 2. Streaming de Medios
                       ▼                               ▼
┌─────────────────────────────────────────┐  ┌────────────────────────────────┐
│         2. CAPA DE INTEGRACIÓN          │  │     3. REPOSITORIO DIGITAL     │
│  Power Automate Instant Cloud Flow      │  │  Microsoft SharePoint Online   │
│  • Trigger: HTTP POST con firma SAS     │  │  • Documentos PDF Oficiales    │
│  • Cabecera: Access-Control-Allow-Origin│  │  • Audiorresúmenes MP3         │
│  • Payload: { "eps": "sedacusco" }      │  │  • Portadas en Alta Resolución │
└──────────────────────┬──────────────────┘  └────────────────────────────────┘
                       │
                       │ Operación: Enumerar + Actualizar Fila
                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                       4. CAPA DE DATOS EMPRESARIAL                          │
│  Microsoft Dataverse (Ambiente SUNASS)                                      │
│  • Entidad: Contador de Descargas (cr138_contadordedescargas)               │
│  • Campos: cr138_name (Key), cr138_descargas (Int), cr138_ultimadescarga    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Matriz de Requisitos Funcionales y No Funcionales

### 7.1 Requisitos Funcionales (RF)
| Código | Descripción del Requisito | Estado |
|---|---|:---:|
| **RF-01** | Catálogo con indexación de 50 EPS con logos, títulos, duración y descargas. | ✅ 100% |
| **RF-02** | Insignia de Periodo Regulatorio visible junto al nombre de la EPS. | ✅ 100% |
| **RF-03** | Buscador en vivo por texto con normalización de caracteres. | ✅ 100% |
| **RF-04** | Filtros combinados por Región (24 departamentos) y Macro Región (5 zonas). | ✅ 100% |
| **RF-05** | Fichas regulatorias completas e interactivas para las 50 EPS. | ✅ 100% |
| **RF-06** | Reproductor flotante de audio con reproducción continua y duración real. | ✅ 100% |
| **RF-07** | Descarga oficial de documentos PDF con trazabilidad en vivo. | ✅ 100% |
| **RF-08** | Sincronización del contador de descargas con Microsoft Dataverse. | ✅ 100% |
| **RF-09** | Visor Lightbox modal con controles de zoom (−/1:1/+). | ✅ 100% |
| **RF-10** | Calculadora tarifaria interactiva "Mi Recibo". | ✅ 100% |
| **RF-11** | Interfaz responsiva adaptativa para celulares y computadoras. | ✅ 100% |
| **RF-12** | Pie de página oficial con gradiente institucional SUNASS/CION. | ✅ 100% |

### 7.2 Requisitos No Funcionales (RNF)
| Código | Criterio | Métrica / Evidencia |
|---|---|---|
| **RNF-01** | **Costo de Licenciamiento:** S/ 0 en capacidad de usuarios anónimos de Power Pages. | Despliegue estático en GitHub Pages con Webhook a Dataverse. |
| **RNF-02** | **Velocidad de Carga:** Tiempo de primera carga (FCP) inferior a 0.8 segundos. | Distribución estática optimizada y liviana. |
| **RNF-03** | **Disponibilidad:** 99.9% de operatividad en red de distribución global. | Infraestructura GitHub Pages / Microsoft Cloud. |
| **RNF-04** | **Compatibilidad:** 100% compatible con Chrome, Edge, Safari, Firefox y navegadores móviles. | Estándares W3C y CSS Flexbox/Grid. |
| **RNF-05** | **Seguridad:** Peticiones seguras con firma SAS y protección contra CSRF. | Webhook con autenticación de clave de acceso. |

---

## 8. Catálogo Maestro Oficial de las 50 EPS

| # | Empresa Prestadora (EPS) | Región | Macro Región | Periodo Regulatorio | Enlace de Acceso |
|---|---|---|---|:---:|---|
| 1 | EMAPA HUARAL S.A. | Lima | Central (Lima) | 2025 - 2027 | [Ver Ficha](./Emapa-Huaral.html) |
| 2 | EPS AGUAS DE LIMA NORTE SA | Lima | Norte | 2025 - 2029 | [Ver Ficha](./Aguas-de-Lima-Norte.html) |
| 3 | EMAPA HVCA S.A. | Huancavelica | Centro | 2025 - 2028 | [Ver Ficha](./HVCA.html) |
| 4 | EMAPACOP S.A. | Ucayali | Oriente | 2025 - 2029 | [Ver Ficha](./EMAPACOP.html) |
| 5 | EPS NOR PUNO S.A. | Puno | Sur | 2025 - 2029 | [Ver Ficha](./NORPUNO.html) |
| 6 | EPS SEDAJULIACA S.A. | Puno | Sur | 2025 - 2029 | [Ver Ficha](./SEDAJULIACA.html) |
| 7 | EMAPA-Y | Puno | Sur | 2025 - 2029 | [Ver Ficha](./EMAPA-Y.html) |
| 8 | EMAPA CAÑETE S.A. | Lima | Sur | 2025 - 2027 | [Ver Ficha](./EMAPA-Canete.html) |
| 9 | AGUAS DEL ALTIPLANO | Puno | Sur | 2025 - 2029 | [Ver Ficha](./Aguas-del-Altiplano.html) |
| 10 | EPS SIERRA CENTRAL | Junín | Centro | 2025 - 2029 | [Ver Ficha](./Sierra-Central.html) |
| 11 | EPS EMSAPA CALCA S.A. | Cusco | Sur | 2025 - 2027 | [Ver Ficha](./EMSAPA-Calca.html) |
| 12 | EPSEL S.A. | Lambayeque | Norte | 2025 - 2028 | [Ver Ficha](./EPSEL.html) |
| 13 | EMAPA SAN MARTÍN | San Martín | Oriente | 2025 - 2029 | [Ver Ficha](./EMAPA-San-Martin.html) |
| 14 | EMAPA PASCO S.A. | Pasco | Centro | 2025 - 2027 | [Ver Ficha](./EMAPA-Pasco.html) |
| 15 | SEDACAJ S.A. | Cajamarca | Norte | 2025 - 2029 | [Ver Ficha](./SEDACAJ.html) |
| 16 | EPS ILO S.A. | Moquegua | Sur | 2025 - 2028 | [Ver Ficha](./EPS-Ilo.html) |
| 17 | EPS BARRANCA S.A. | Lima | Central (Lima) | 2025 - 2028 | [Ver Ficha](./EPS-Barranca.html) |
| 18 | EPS MARAÑÓN S.A. | Cajamarca | Norte | 2023 - 2028 | [Ver Ficha](./eps-maranon.html) |
| 19 | Unidad 002 Tumbes | Tumbes | Norte | 2023 - 2027 | [Ver Ficha](./unidad-002-tumbes.html) |
| 20 | EPS GRAU S.A. | Piura | Norte | 2022 - 2027 | [Ver Ficha](./eps-grau.html) |
| 21 | SEDALIB S.A. | La Libertad | Norte | 2021 - 2026 | [Ver Ficha](./sedalib.html) |
| 22 | SEDACHIMBOTE S.A. | Áncash | Norte | 2023 - 2028 | [Ver Ficha](./sedachimbote.html) |
| 23 | EPS CHAVIN S.A. | Áncash | Norte | 2015 - 2020 | [Ver Ficha](./eps-chavin.html) |
| 24 | SEDAPAL S.A. | Lima | Central (Lima) | 2022 - 2027 | [Ver Ficha](./sedapal.html) |
| 25 | SEDA AYACUCHO S.A. | Ayacucho | Centro | 2022 - 2027 | [Ver Ficha](./seda-ayacucho.html) |
| 26 | EPS EMAPICA S.A. | Ica | Sur | 2023 - 2028 | [Ver Ficha](./emapica.html) |
| 27 | EMAPAVIGS S.A. | Ica | Sur | 2024 - 2027 | [Ver Ficha](./emapavigs.html) |
| 28 | EMAPISCO S.A. | Ica | Sur | 2024 - 2026 | [Ver Ficha](./emapisco.html) |
| 29 | EPS SEMAPACH S.A. | Ica | Sur | 2024 - 2028 | [Ver Ficha](./semapach.html) |
| 30 | EMUSAP S.A. | Amazonas | Oriente | 2021 - 2026 | [Ver Ficha](./emusap.html) |
| 31 | EMAPAB S.A. | Amazonas | Oriente | 2023 - 2027 | [Ver Ficha](./emapab.html) |
| 32 | EPSSMU S.A. | Amazonas | Oriente | 2023 - 2028 | [Ver Ficha](./epssmu.html) |
| 33 | SEDALORETO S.A. | Loreto | Oriente | 2022 - 2027 | [Ver Ficha](./sedaloreto.html) |
| 34 | EPS RIOJA S.A. | San Martín | Oriente | 2022 - 2027 | [Ver Ficha](./rioja.html) |
| 35 | EPS MOYOBAMBA S.A. | San Martín | Oriente | 2021 - 2026 | [Ver Ficha](./moyobamba.html) |
| 36 | EPS SEDA HUÁNUCO S.A. | Huánuco | Centro | 2023 - 2028 | [Ver Ficha](./sedahuanuco.html) |
| 37 | EMSAPA YAULI LA OROYA S.R.L. | Junín | Centro | 2022 - 2027 | [Ver Ficha](./yauli.html) |
| 38 | EPS MANTARO S.A. | Junín | Centro | 2023 - 2028 | [Ver Ficha](./mantaro.html) |
| 39 | EPS SEDAM HUANCAYO S.A. | Junín | Centro | 2023 - 2028 | [Ver Ficha](./sedam-huancayo.html) |
| 40 | EPS SELVA CENTRAL S.A. | Junín | Centro | 2023 - 2027 | [Ver Ficha](./selva-central.html) |
| 41 | EPS EMAPAT S.A. | Madre de Dios | Oriente | 2023 - 2027 | [Ver Ficha](./emapat.html) |
| 42 | SEDACUSCO S.A. | Cusco | Sur | 2020 - 2025 | [Ver Ficha](./sedacusco.html) |
| 43 | EPS EMAQ S.A. | Cusco | Sur | 2024 - 2027 | [Ver Ficha](./emaq.html) |
| 44 | EMPSSAPAL S.A. | Cusco | Sur | 2023 - 2028 | [Ver Ficha](./empssapal.html) |
| 45 | EMUSAP ABANCAY S.A. | Apurímac | Sur | 2019 - 2024 | [Ver Ficha](./emusap-abancay.html) |
| 46 | EMSAP CHANKA S.A. | Apurímac | Sur | 2023 - 2027 | [Ver Ficha](./emsapchanka.html) |
| 47 | SEDAPAR S.A. | Arequipa | Sur | 2021 - 2026 | [Ver Ficha](./sedapar.html) |
| 48 | EPS MOQUEGUA S.A. | Moquegua | Sur | 2023 - 2027 | [Ver Ficha](./moquegua.html) |
| 49 | EPS TACNA S.A. | Tacna | Sur | 2024 - 2028 | [Ver Ficha](./tacna.html) |
| 50 | EMSAPUNO S.A. | Puno | Sur | 2023 - 2027 | [Ver Ficha](./emsapuno.html) |

---

## 9. Impacto, Población Beneficiaria y Gobernanza

### 9.1 Población Beneficiaria
- **Población Directa:** Más de **24.5 millones de peruanos** atendidos por las 50 empresas prestadoras de agua potable y alcantarillado en el ámbito urbano nacional.
- **Población Indirecta:** Estudiantes universitarios, investigadores, periodistas, comités de usuarios y organizaciones de la sociedad civil interesados en la gestión del agua.

### 9.2 Esquema de Gobernanza y Sostenibilidad
- **Administración Técnica:** Equipo CION (SUNASS) como responsable de la arquitectura web, scripts de compilación y optimización de código.
- **Validación Normativa:** Dirección de Regulación Tarifaria (DRT) como área técnica encargada de emitir y validar las cifras tarifarias y de inversión.
- **Infraestructura y Redes:** Oficina de Tecnologías de la Información (OTI) supervisando la integración con Microsoft 365, Dataverse y Power Automate.

---

## 10. Conclusiones y Recomendaciones

### 10.1 Conclusiones
1. **Éxito en el Despliegue Nacional:** Se cumplió al 100% la meta de incorporar las 50 EPS del Perú con fichas técnicas, audios y documentos oficiales.
2. **Eficiencia Presupuestal:** La adopción de la arquitectura híbrida permitió un ahorro significativo de recursos públicos al evitar el pago de licenciamiento recurrente por capacidad de visitas anónimas en Power Pages.
3. **Innovación y Empoderamiento Ciudadano:** La inclusión de audiorresúmenes (podcasts) y fichas visuales reduce drásticamente la brecha de comprensión técnica entre el regulador y los usuarios del servicio.

### 10.2 Recomendaciones
1. **Institucionalización de Enlaces:** Migrar los archivos PDF y audios de SharePoint a una biblioteca corporativa administrada institucionalmente por la OTI.
2. **Protocolo Semestral de Actualización:** Establecer una rutina periódica con la DRT para actualizar las fichas cuando se promulguen nuevas resoluciones tarifarias en *El Peruano*.
3. **Campañas de Comunicación Digital:** Difundir activamente el enlace público del portal a través de las redes sociales y módulos de orientación al usuario de SUNASS.
