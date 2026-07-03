# MiMatheu — Workflow

## Roles

### Roger

Product Owner. Decide prioridades y aprueba cambios importantes.

### ChatGPT / Arquitecto

Define visión, diseño, arquitectura, roadmap y decisiones técnicas.

### Codex / Developer

Implementa cambios sobre el código en VS Code.

## Flujo recomendado

1. Roger plantea objetivo.
2. Arquitecto define plan.
3. Roger aprueba.
4. Codex implementa.
5. Codex actualiza `AI/CURRENT_STATE.md` y `AI/CHANGELOG_AI.md`.
6. Roger revisa visualmente.
7. Arquitecto revisa decisiones o ajustes.
8. Se hace commit.

## Antes de modificar código

Codex debe leer:

- `AGENTS.md`.
- `AI/PROJECT_CONTEXT.md`.
- `AI/CURRENT_STATE.md`.
- `AI/DESIGN_SYSTEM.md`.
- `AI/ARCHITECTURE.md`.
- `AI/ROADMAP.md`.
- `AI/DECISIONS.md`.

## Reglas de implementación

- Hacer cambios pequeños y reversibles.
- No mezclar rediseño con cambios funcionales grandes.
- No eliminar funcionalidad existente sin aprobación.
- No instalar dependencias sin justificar.
- No duplicar componentes.
- No duplicar estilos.
- Documentar cambios importantes.

## Regla de diseño

Si una pantalla nueva necesita un componente que podría repetirse, primero crear componente reutilizable.

## Regla de comunicación

Cuando Codex termine una tarea, debe entregar:

- Archivos modificados.
- Qué cambió.
- Qué no cambió.
- Cómo probarlo.
- Riesgos o pendientes.
