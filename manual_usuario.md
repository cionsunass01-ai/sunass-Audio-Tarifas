# Manual de Usuario
## Sunass Plus — Portal de Estudios Tarifarios

**Institución:** Superintendencia Nacional de Servicios de Saneamiento (SUNASS) — Equipo CION  
**Plataforma Pública:** GitHub Pages + Integración en Vivo con Microsoft Dataverse  
**Enlace de Acceso:** [https://cionsunass01-ai.github.io/sunass-estudios-tarifarios/](https://cionsunass01-ai.github.io/sunass-estudios-tarifarios/)  
**Versión del manual:** 2.5 · 2026-08-25  

---

## 1. Introducción

**Sunass Plus** es la plataforma ciudadana oficial donde cualquier persona puede consultar, de forma totalmente gratuita y sin necesidad de crear una cuenta ni instalar aplicaciones, los **Estudios Tarifarios oficiales** de las 50 Entidades Prestadoras de Servicios de Saneamiento (EPS) del Perú.

Desde este portal usted puede:
- **Consultar la vigencia del estudio:** Ver el **Periodo Regulatorio Oficial** de cada EPS (ej. `2020-2025`, `2023-2027`, `2025-2027`, `2025-2029`).
- **Explorar las Fichas Regulatorias:** Conocer diagnósticos de continuidad, calidad del agua potable, metas de gestión y obras de inversión.
- **Escuchar Audiorresúmenes:** Reproducir podcasts ejecutivos explicativos directamente en la página.
- **Descargar el PDF Oficial:** Obtener el documento técnico completo aprobado por SUNASS.
- **Filtrar y Buscar:** Encontrar su EPS por nombre, departamento o macro región en tiempo real.
- **Usar desde Celular o PC:** Visualizar la interfaz con diseño responsivo optimizado para pantallas táctiles.

---

## 2. Acceso y Navegación Principal

Para ingresar al portal, abra su navegador web (Chrome, Edge, Safari, Firefox) y acceda al enlace institucional:  
👉 **[https://cionsunass01-ai.github.io/sunass-estudios-tarifarios/](https://cionsunass01-ai.github.io/sunass-estudios-tarifarios/)**

---

## 3. Catálogo Nacional de EPS (Página Principal)

En la pantalla principal encontrará los siguientes controles interactivos:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│  [CION | Estudio Tarifario]     [Todas las regiones ⌵]  [Todas las macroregiones ⌵]   │
│                                 [🔍 Buscar EPS, región...]                             │
├────────────────────────────────────────────────────────────────────────────────────────┤
│  Catálogo de Estudios                                                                  │
│  [📄 50 Archivos]  [🔍 50 resultados]                                                  │
│                                                                                        │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐  │
│  │ [LOGO]  EMAPA HUARAL S.A.  [📅 Periodo 2025 - 2027]                              │  │
│  │         [Ver resumen ⌵]   ⏱️ 6:47   📥 20 descargas                              │  │
│  │         [▶ Escuchar audio]   [📊 Reporte informativo]   [📥 Descargar PDF]       │  │
│  └──────────────────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 3.1 Componentes de cada tarjeta:
1. **Logo / Portada Oficial:**  
   * Al hacer **clic sobre la imagen**, se abre el visor **Lightbox** con opciones para ver la portada en tamaño completo con botones de aumento (+/-) y enlace directo a *"Ver PDF"*.
2. **Nombre de la EPS e Insignia de Periodo:**  
   * Muestra la razón social y la etiqueta azul destacada con el **periodo regulatorio aprobado por SUNASS** (ej. `Periodo 2023 - 2027`).
3. **Botón *"Ver resumen" / "Ocultar resumen"*:**  
   * Al hacer clic, se despliega una síntesis con las principales conclusiones del estudio, diagnóstico y proyectos sin salir de la página.
4. **Metadatos Rápidos:**  
   * ⏱️ **Duración del Audio:** Indica los minutos y segundos del podcast explicativo.  
   * 📥 **Contador de Descargas:** Muestra el número acumulado de descargas registrado en la base de datos oficial.
5. **Botones de Acción Inmediata:**  
   * 🎧 **"Escuchar audio":** Inicia la reproducción en la barra flotante inferior.  
   * 📊 **"Reporte informativo":** Abre en una nueva pestaña la **Ficha Regulatoria Interactiva (SPA)** con todos los gráficos y tablas.  
   * 📄 **"Descargar PDF":** Descarga el informe técnico oficial del estudio y suma +1 al contador de descargas en tiempo real.

---

## 4. Uso de Buscadores y Filtros

### 4.1 Buscador por texto en tiempo real
* Escriba cualquier término en la casilla **"Buscar EPS, región..."** (por ejemplo: *"Cusco"*, *"Chimbote"*, *"Arequipa"* o siglas como *"SEDAPAL"*).
* El catálogo filtrará instantáneamente las tarjetas que coincidan, ignorando acentos o mayúsculas.

### 4.2 Filtro por Región y Macro Región
* **Selector "Todas las regiones":** Permite elegir entre los 24 departamentos del Perú (ej. *Áncash, Cusco, Ica, Junín, Lima, Puno, etc.*).
* **Selector "Todas las macroregiones":** Permite segmentar por *Norte, Sur, Centro, Oriente o Central (Lima)*.

---

## 5. Fichas Regulatorias Interactivas (Reporte Informativo)

Al hacer clic en **"Reporte informativo"** en cualquier EPS, se abrirá un panel interactivo con 5 secciones especializadas:

1. **Datos Generales:** Resolución de aprobación de SUNASS, localidad, tamaño de empresa y periodo de vigencia.
2. **Diagnósticos:** Indicadores de cobertura de agua potable, alcantarillado, continuidad promedio (horas/día) y porcentaje de agua no facturada.
3. **Mi Recibo (Calculadora Tarifaria):** Simulador donde el usuario puede seleccionar su categoría (Social, Doméstica, Comercial, Industrial, Estatal) e ingresar su consumo en m³ para calcular su facturación estimada.
4. **Inversión y Costos O&M:** Desglose del presupuesto de inversiones en obras de ampliación, plantas de tratamiento, micromedición y mecanismos de retribución por servicios ecosistémicos (MRSE).
5. **Metas de Gestión y Tarifas:** Compromisos anuales obligatorios que la EPS debe cumplir ante el regulador.

---

## 6. Experiencia en Celulares y Dispositivos Móviles

El portal ha sido diseñado con tecnología **Mobile-First**:
* **Logos protegidos:** Los recuadros de los logos no se comprimen ni se deforman en pantallas pequeñas.
* **Botones táctiles:** Los botones *"Escuchar audio"*, *"Reporte informativo"* y *"Descargar PDF"* se adaptan al ancho completo de la pantalla para una pulsación cómoda con una sola mano.
* **Reproductor de audio adaptable:** La barra inferior flotante se reorganiza verticalmente en móviles para que los controles de reproducción no tapen ningún botón.

---

## 7. Catálogo Completo de las 50 EPS

| # | EPS | Región | Macro Región | Periodo Regulatorio |
|---|---|---|---|:---:|
| 1 | EMAPA HUARAL S.A. | Lima | Central (Lima) | 2025 - 2027 |
| 2 | EPS AGUAS DE LIMA NORTE SA | Lima | Norte | 2025 - 2029 |
| 3 | EMAPA HVCA S.A. | Huancavelica | Centro | 2025 - 2028 |
| 4 | EMAPACOP S.A. | Ucayali | Oriente | 2025 - 2029 |
| 5 | EPS NOR PUNO S.A. | Puno | Sur | 2025 - 2029 |
| 6 | EPS SEDAJULIACA S.A. | Puno | Sur | 2025 - 2029 |
| 7 | EMAPA-Y | Puno | Sur | 2025 - 2029 |
| 8 | EMAPA CAÑETE S.A. | Lima | Sur | 2025 - 2027 |
| 9 | AGUAS DEL ALTIPLANO | Puno | Sur | 2025 - 2029 |
| 10 | EPS SIERRA CENTRAL | Junín | Centro | 2025 - 2029 |
| 11 | EPS EMSAPA CALCA S.A. | Cusco | Sur | 2025 - 2027 |
| 12 | EPSEL S.A. | Lambayeque | Norte | 2025 - 2028 |
| 13 | EMAPA SAN MARTÍN | San Martín | Oriente | 2025 - 2029 |
| 14 | EMAPA PASCO S.A. | Pasco | Centro | 2025 - 2027 |
| 15 | SEDACAJ S.A. | Cajamarca | Norte | 2025 - 2029 |
| 16 | EPS ILO S.A. | Moquegua | Sur | 2025 - 2028 |
| 17 | EPS BARRANCA S.A. | Lima | Central (Lima) | 2025 - 2028 |
| 18 | EPS MARAÑÓN S.A. | Cajamarca | Norte | 2023 - 2028 |
| 19 | Unidad 002 Tumbes | Tumbes | Norte | 2023 - 2027 |
| 20 | EPS GRAU S.A. | Piura | Norte | 2022 - 2027 |
| 21 | SEDALIB S.A. | La Libertad | Norte | 2021 - 2026 |
| 22 | SEDACHIMBOTE S.A. | Áncash | Norte | 2023 - 2028 |
| 23 | EPS CHAVIN S.A. | Áncash | Norte | 2015 - 2020 |
| 24 | SEDAPAL S.A. | Lima | Central (Lima) | 2022 - 2027 |
| 25 | SEDA AYACUCHO S.A. | Ayacucho | Centro | 2022 - 2027 |
| 26 | EPS EMAPICA S.A. | Ica | Sur | 2023 - 2028 |
| 27 | EMAPAVIGS S.A. | Ica | Sur | 2024 - 2027 |
| 28 | EMAPISCO S.A. | Ica | Sur | 2024 - 2026 |
| 29 | EPS SEMAPACH S.A. | Ica | Sur | 2024 - 2028 |
| 30 | EMUSAP S.A. | Amazonas | Oriente | 2021 - 2026 |
| 31 | EMAPAB S.A. | Amazonas | Oriente | 2023 - 2027 |
| 32 | EPSSMU S.A. | Amazonas | Oriente | 2023 - 2028 |
| 33 | SEDALORETO S.A. | Loreto | Oriente | 2022 - 2027 |
| 34 | EPS RIOJA S.A. | San Martín | Oriente | 2022 - 2027 |
| 35 | EPS MOYOBAMBA S.A. | San Martín | Oriente | 2021 - 2026 |
| 36 | EPS SEDA HUÁNUCO S.A. | Huánuco | Centro | 2023 - 2028 |
| 37 | EMSAPA YAULI LA OROYA S.R.L. | Junín | Centro | 2022 - 2027 |
| 38 | EPS MANTARO S.A. | Junín | Centro | 2023 - 2028 |
| 39 | EPS SEDAM HUANCAYO S.A. | Junín | Centro | 2023 - 2028 |
| 40 | EPS SELVA CENTRAL S.A. | Junín | Centro | 2023 - 2027 |
| 41 | EPS EMAPAT S.A. | Madre de Dios | Oriente | 2023 - 2027 |
| 42 | SEDACUSCO S.A. | Cusco | Sur | 2020 - 2025 |
| 43 | EPS EMAQ S.A. | Cusco | Sur | 2024 - 2027 |
| 44 | EMPSSAPAL S.A. | Cusco | Sur | 2023 - 2028 |
| 45 | EMUSAP ABANCAY S.A. | Apurímac | Sur | 2019 - 2024 |
| 46 | EMSAP CHANKA S.A. | Apurímac | Sur | 2023 - 2027 |
| 47 | SEDAPAR S.A. | Arequipa | Sur | 2021 - 2026 |
| 48 | EPS MOQUEGUA S.A. | Moquegua | Sur | 2023 - 2027 |
| 49 | EPS TACNA S.A. | Tacna | Sur | 2024 - 2028 |
| 50 | EMSAPUNO S.A. | Puno | Sur | 2023 - 2027 |
