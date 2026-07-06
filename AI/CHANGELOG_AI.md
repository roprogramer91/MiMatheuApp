# MiMatheu - AI Changelog

## 2026-07-06

### Added

- Se creo `src/ui` como implementacion oficial reutilizable del Design System.
- Se agregaron tokens de theme para colores, tipografia, spacing, radios, sombras y tamanos.
- Se agregaron componentes base, layout, cards presentacionales, feedback states y hook `useTheme`.
- Se agregaron exports barrel para permitir imports desde `@/ui`.

### Changed

- Se actualizo `tsconfig.json` con alias `@/*` apuntando a `src/*`.

### Not changed

- No se modificaron pantallas existentes.
- No se modifico Home, navegacion, Farmacias, Mascotas, Noticias ni Perfil.
- No se cambio logica de negocio.
