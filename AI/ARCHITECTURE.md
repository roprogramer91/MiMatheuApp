# MiMatheu — Architecture

## Estado

Documento inicial. Todavía falta una revisión completa del árbol de carpetas.

## Stack detectado inicialmente

Desde `package.json`:

- Expo.
- Expo Router.
- React Native.
- TypeScript.
- React 19.
- React Native 0.81.

## Principio de arquitectura

La app debe crecer por módulos/secciones, no como un conjunto de pantallas aisladas.

Cada sección importante debe tener:

- Pantalla o ruta.
- Componentes propios.
- Datos mock o servicio.
- Tipos.
- Estilos reutilizando el Design System.

## Secciones previstas

- Home.
- Farmacias de turno.
- Mascotas perdidas/encontradas.
- Servicios.
- Comercios.
- Novedades.
- Eventos.

## Organización recomendada inicial

La estructura final debe definirse después de revisar el proyecto, pero se recomienda una separación similar a:

```txt
app/
  (tabs)/
  mascotas/
  farmacias/

src/
  components/
    ui/
    layout/
  features/
    mascotas/
    farmacias/
  styles/
  constants/
  data/
  types/
  services/
```

## Componentes UI base recomendados

- Button.
- Card.
- Badge.
- Chip.
- Input.
- Select.
- Tabs.
- EmptyState.
- SectionHeader.
- ScreenContainer.

## Regla de escalabilidad

Si un componente puede ser usado por más de una sección, debe ir a `components/ui` o equivalente.

Si es específico de una sección, debe vivir dentro del módulo correspondiente.

## Regla de diseño

La arquitectura visual debe depender del Design System, no de estilos improvisados en cada pantalla.

## Pendiente

- Revisar árbol real del proyecto.
- Detectar rutas actuales.
- Detectar pantallas existentes.
- Detectar estilos actuales.
- Proponer refactor incremental.
