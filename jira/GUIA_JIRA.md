   Cómo armar el Jira del proyecto (Scrum) — 10 minutos

   Archivo a importar: **`control_pagos_jira.csv`** (en esta misma carpeta).

   Contiene:

   | Tipo | Cantidad | Detalle |
   |------|----------|---------|
   | Épica | 1 | Control de gastos variables |
   | Historias | 10 | HU-01 a HU-08 en el **CP Sprint 1** · HU-09 y HU-10 en el **Backlog** |
   | Subtareas | 24 | Tareas técnicas de cada historia |
   | Story points | 21 en el sprint | HU-01 2 · HU-02 3 · HU-03 3 · HU-04 3 · HU-05 2 · HU-06 2 · HU-07 1 · HU-08 5 |

   Cada historia trae su frase *"Como… quiero… para…"*, sus **criterios de aceptación**, prioridad, puntos y estado
   (HU-01 a HU-07 **Listo**, HU-08 **En curso, HU-09 y HU-10 **Por hacer**).

   ---

   ## Paso 1 · Crear tu Jira gratis (si no tienes)
   1. Entra a **https://www.atlassian.com/es/software/jira/free** → **Regístrate gratis** con tu correo.
   2. Ponle nombre a tu sitio, por ejemplo `davidnarvaez` → queda `davidnarvaez.atlassian.net`.

   ## Paso 2 · Crear el proyecto Scrum
   1. **Proyectos → Crear proyecto**.
   2. Plantilla **Desarrollo de software → Scrum**.
   3. Tipo: **Gestionado por el equipo** (team-managed).
   4. Nombre: **Control de Pagos** · Clave: **CP** → **Crear proyecto**.

   ## Paso 3 · Activar los Story points (si no aparecen)
   En el proyecto: **⚙ Configuración del proyecto → Funciones** → activa **Estimación** (Story points).

   ## Paso 4 · Importar el CSV
   1. Ve a **⚙ (arriba a la derecha) → Sistema → Importación de sistemas externos → CSV**.
      (También puedes buscar "Importar elementos de trabajo" en el menú **⋯** del Backlog.)
   2. Sube **`control_pagos_jira.csv`**. En opciones avanzadas: **codificación UTF-8**, separador **coma**.
   3. Proyecto destino: **Control de Pagos (CP)**.
   4. Relaciona las columnas así:

   | Columna del CSV | Campo de Jira |
   |-----------------|---------------|
   | Issue ID | Issue ID (ID de elemento) |
   | Parent ID | Parent ID (ID principal) |
   | Summary | Resumen |
   | Issue Type | Tipo de elemento |
   | Description | Descripción |
   | Priority | Prioridad |
   | Story Points | Estimación de puntos de historia |
   | Sprint | Sprint |
   | Status | Estado |
   | Labels | Etiquetas |

   5. Marca **"Asignar valores de campo"** y relaciona los valores si Jira los muestra en inglés:
      - Tipo: `Historia` → Historia/Story · `Subtarea` → Subtarea/Subtask · `Epic` → Epic
      - Estado: `Listo` → Listo/Done · `En curso` → En curso/In Progress · `Por hacer` → Por hacer/To Do
      - Prioridad: `Alta` → High · `Media` → Medium · `Baja` → Low
   6. **Validar** → **Comenzar importación**. Deben entrar **35 elementos**.

   ## Paso 5 · Ordenar el sprint
   1. Abre el **Backlog**: verás **CP Sprint 1** con HU-01 a HU-08 (21 puntos) y abajo el backlog con HU-09 y HU-10.
   2. En el sprint: **⋯ → Editar sprint** → fechas **14/10/2026 al 20/10/2026** · Objetivo:
      *"Entregar el MVP: registrar, ver, pagar y corregir los gastos variables del mes."*
   3. **Iniciar sprint**.
   4. Después de la Sprint Review: **Completar sprint** (HU-08 pasa al siguiente sprint porque está En curso).

   ## Si algo no entra bien
   - **Las subtareas no quedan dentro de su historia:** revisa que *Issue ID* y *Parent ID* estén relacionados en el paso 4.
   - **No aparece la columna Sprint:** el sprint se crea al importar si el proyecto es Scrum; si no, crea "CP Sprint 1"
   en el Backlog y arrastra HU-01 a HU-08.
   - **Los estados salen todos en "Por hacer":** en el tablero, mueve las historias a **Listo** (HU-08 a **En curso**).

   ## Qué mostrarle al profe
   - **Backlog:** la épica, las 10 historias priorizadas y estimadas en puntos.
   - **Sprint 1:** compromiso de 21 puntos, 7 historias terminadas y HU-08 en curso.
   - **Cada historia:** su frase de usuario y sus criterios de aceptación (los mismos de la demo).
