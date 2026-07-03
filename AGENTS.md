# AGENTS.md — MiMatheuApp

Este archivo define cómo deben trabajar los asistentes de IA dentro del proyecto.

## Fuente de verdad

La fuente de verdad del proyecto es el repositorio GitHub `roprogramer91/MiMatheuApp`.

Antes de modificar código, cualquier asistente debe leer:

1. `AI/PROJECT_CONTEXT.md`
2. `AI/CURRENT_STATE.md`
3. `AI/DESIGN_SYSTEM.md`
4. `AI/ARCHITECTURE.md`
5. `AI/ROADMAP.md`
6. `AI/WORKFLOW.md`
7. `AI/DECISIONS.md`

## Roles

### Product Owner

Roger define prioridades, necesidades reales del usuario y aprobación final.

### Arquitecto

Responsable de visión del producto, arquitectura, experiencia de usuario, design system y decisiones técnicas importantes.

Reglas:

- No modifica código sin pedido explícito.
- No improvisa funcionalidades.
- Prioriza consistencia, mantenibilidad y claridad.
- Documenta decisiones importantes en `AI/DECISIONS.md`.

### Developer / Codex

Responsable de implementar cambios en el código.

Reglas:

- Antes de tocar código debe leer los documentos de `AI/`.
- Debe respetar el Design System.
- No debe crear estilos duplicados si ya existe una base reutilizable.
- No debe romper funcionalidades existentes.
- Debe registrar cambios relevantes en `AI/CHANGELOG_AI.md` y actualizar `AI/CURRENT_STATE.md`.

## Principios obligatorios

- MiMatheu no es una app genérica: es una plataforma local para Matheu.
- No usar textos como “todas las ciudades” si el alcance es Matheu; usar barrios o zonas.
- Mantener diseño moderno, limpio, claro y accesible.
- Separar decisiones de producto, arquitectura e implementación.
- Preferir componentes reutilizables antes que código duplicado.
- Cada cambio importante debe ser incremental y revisable.

## Prohibido

- Reescribir todo el proyecto sin plan.
- Cambiar stack o arquitectura sin aprobación.
- Eliminar funcionalidades existentes sin confirmación.
- Agregar librerías innecesarias.
- Crear estilos visuales inconsistentes con `AI/DESIGN_SYSTEM.md`.

## Flujo recomendado

1. Entender el estado actual.
2. Proponer plan.
3. Esperar aprobación.
4. Implementar en pasos pequeños.
5. Probar.
6. Documentar cambios.
