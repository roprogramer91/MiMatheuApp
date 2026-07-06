# MiMatheu - Architecture Decision Records

Este archivo registra decisiones importantes de producto, arquitectura y flujo de trabajo del proyecto MiMatheu.

---

# D-001 - GitHub como fuente de verdad

Fecha: 2026-07-03

Estado:
Aprobada

Contexto:
MiMatheu va a crecer durante varios años y necesita una referencia única para evitar diferencias entre archivos locales, conversaciones con asistentes y versiones parciales del proyecto.

Decisión:
El repositorio GitHub `roprogramer91/MiMatheuApp` pasa a ser la única fuente de verdad del proyecto.

Motivo:
Centralizar el estado del producto y del código reduce ambigüedad, facilita revisiones, permite historial trazable y evita que decisiones importantes queden dispersas fuera del repositorio.

Consecuencias:
Toda modificación relevante debe terminar reflejada en el repositorio. Las conversaciones con IA pueden orientar el trabajo, pero no reemplazan el estado versionado del proyecto.

Archivos afectados:
- `AGENTS.md`
- `AI/PROJECT_CONTEXT.md`
- `AI/WORKFLOW.md`

---

# D-002 - ChatGPT como Arquitecto de Software y Producto

Fecha: 2026-07-03

Estado:
Aprobada

Contexto:
El proyecto necesita una visión consistente de producto, experiencia de usuario, arquitectura, roadmap y decisiones técnicas antes de crecer en funcionalidades.

Decisión:
ChatGPT asume el rol de Arquitecto de Software y Producto.

Motivo:
Separar la definición de visión y arquitectura de la implementación ayuda a evitar improvisaciones, cambios inconexos y crecimiento desordenado.

Consecuencias:
ChatGPT debe priorizar claridad, consistencia, mantenibilidad, experiencia de usuario y documentación de decisiones importantes. No debe modificar código sin pedido explícito.

Archivos afectados:
- `AGENTS.md`
- `AI/WORKFLOW.md`
- `AI/ARCHITECTURE.md`
- `AI/ROADMAP.md`

---

# D-003 - Codex como Senior Developer

Fecha: 2026-07-03

Estado:
Aprobada

Contexto:
La implementación del proyecto requiere criterio técnico, cuidado con el código existente y respeto por las decisiones de arquitectura y producto.

Decisión:
Codex asume el rol de Senior Developer del proyecto.

Motivo:
El proyecto necesita que los cambios de código se hagan con mirada de largo plazo, evitando soluciones frágiles, duplicación innecesaria y modificaciones no alineadas con la arquitectura definida.

Consecuencias:
Codex debe leer la documentación obligatoria antes de modificar código, implementar cambios pequeños y revisables, respetar el Design System y documentar cambios relevantes.

Archivos afectados:
- `AGENTS.md`
- `AI/WORKFLOW.md`
- `AI/CURRENT_STATE.md`
- `AI/CHANGELOG_AI.md`

---

# D-004 - Lectura obligatoria de AGENTS.md antes de modificar código

Fecha: 2026-07-03

Estado:
Aprobada

Contexto:
Los asistentes de IA necesitan una entrada común que explique reglas, roles, alcance del producto y restricciones de trabajo antes de operar sobre el código.

Decisión:
Toda IA debe leer `AGENTS.md` antes de modificar código.

Motivo:
`AGENTS.md` define las reglas generales de colaboración, la fuente de verdad, los roles y las prohibiciones principales. Leerlo antes de modificar código reduce el riesgo de acciones fuera de alcance.

Consecuencias:
Ningún asistente debe asumir reglas implícitas ni empezar a editar sin revisar primero las instrucciones del proyecto. Si una tarea requiere cambios de código, la lectura de `AGENTS.md` es obligatoria.

Archivos afectados:
- `AGENTS.md`

---

# D-005 - Prioridad de la documentacion de AI

Fecha: 2026-07-03

Estado:
Aprobada

Contexto:
El proyecto usa la carpeta `AI/` para coordinar contexto, arquitectura, diseño, roadmap, estado actual, workflow y decisiones. A medida que el proyecto crezca, pueden existir instrucciones anteriores o conversaciones desactualizadas.

Decisión:
La documentación de la carpeta `AI/` es obligatoria y tiene prioridad sobre instrucciones anteriores cuando exista conflicto.

Motivo:
Mantener una fuente documental versionada permite que las decisiones vigentes estén disponibles para todos los asistentes y colaboradores, sin depender de memoria conversacional o indicaciones antiguas.

Consecuencias:
Antes de implementar cambios importantes, los asistentes deben revisar la documentación relevante en `AI/`. Si una conversación previa contradice la documentación actual, debe prevalecer la documentación versionada salvo aprobación explícita de Roger.

Archivos afectados:
- `AI/PROJECT_CONTEXT.md`
- `AI/CURRENT_STATE.md`
- `AI/DESIGN_SYSTEM.md`
- `AI/ARCHITECTURE.md`
- `AI/ROADMAP.md`
- `AI/WORKFLOW.md`
- `AI/DECISIONS.md`

---

# D-006 - Cambios pequenos e incrementales

Fecha: 2026-07-03

Estado:
Aprobada

Contexto:
MiMatheu está en una etapa inicial, pero se proyecta como una plataforma local que crecerá durante años. Los refactors masivos o cambios amplios sin planificación pueden romper funcionalidades existentes y dificultar la revisión.

Decisión:
El proyecto crecerá mediante cambios pequeños e incrementales, evitando refactors masivos sin planificación.

Motivo:
Los cambios acotados son más fáciles de revisar, probar, revertir y documentar. Esta forma de trabajo protege el valor existente mientras permite mejorar la arquitectura gradualmente.

Consecuencias:
Las mejoras grandes deben dividirse en pasos revisables. No se debe reescribir el proyecto, cambiar el stack ni reorganizar grandes partes de la arquitectura sin una propuesta previa y aprobación explícita.

Archivos afectados:
- `AGENTS.md`
- `AI/WORKFLOW.md`
- `AI/ROADMAP.md`
- `AI/ARCHITECTURE.md`

---

# D-007 - src/ui como implementacion del Design System

Fecha: 2026-07-06

Estado:
Aprobada

Contexto:
MiMatheu necesita una base visual reutilizable antes de avanzar con nuevas pantallas. La documentacion oficial vive en `AI/DESIGN_SYSTEM.md`, pero el codigo necesita una ubicacion corta y natural para componentes, tokens y helpers de UI.

Decision:
La implementacion reutilizable del Design System vive en `src/ui`.

Motivo:
`Design System` es el concepto de arquitectura y documentacion. En codigo, `src/ui` permite imports simples como `import { Button } from "@/ui"` y evita rutas largas o nombres demasiado conceptuales.

Consecuencias:
Las nuevas pantallas deben consumir tokens y componentes desde `src/ui` cuando corresponda. No se deben crear estilos duplicados ni componentes globales innecesarios. La carpeta `AI/DESIGN_SYSTEM.md` sigue siendo la fuente documental del sistema visual.

Archivos afectados:
- `AI/DESIGN_SYSTEM.md`
- `src/ui`
- `tsconfig.json`
