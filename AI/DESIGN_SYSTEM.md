# MiMatheu — Design System

## Estado

Documento inicial. Debe evolucionar a medida que se rediseñe la app.

## Objetivo visual

MiMatheu debe tener una identidad moderna, limpia, clara y consistente.

No debe parecer una plantilla genérica ni una app hecha pantalla por pantalla sin coherencia.

## Principios visuales

- Mucho aire visual.
- Jerarquía clara.
- Bordes suaves.
- Sombras sutiles.
- Colores vivos usados con intención.
- Acciones principales muy visibles.
- Fondos suaves, no blanco puro en toda la pantalla.
- Componentes reutilizables.

## Colores

### Primarios

- Fucsia: `#ec168f`.
- Fucsia hover: `#d91580`.
- Azul vivo: `#0066ff`.
- Azul hover: `#0052cc`.

### Texto

- Texto principal: `#071b4d`.
- Texto secundario: `#64748b`.
- Texto suave: `#94a3b8`.

### Superficies

- Fondo app: `#f7f9fc`.
- Card/superficie: `#ffffff`.
- Borde suave: `#e6edf5`.

### Estados

- Éxito: `#16a34a`.
- Advertencia: `#f59e0b`.
- Error: `#ef4444`.
- Info: `#0066ff`.

## Tipografía

Para web: `Plus Jakarta Sans`.

Para React Native/Expo, usar la fuente equivalente si está cargada. Si todavía no está cargada, usar el sistema nativo y planificar incorporación de fuente.

Escala recomendada:

- Hero: 44–56px / 800.
- Título pantalla: 32–40px / 800.
- Título sección: 24–30px / 700.
- Card title: 20–24px / 700.
- Texto normal: 15–17px / 500.
- Texto secundario: 13–14px / 500.
- Botón: 15–16px / 700.

## Espaciado

Usar sistema de 8 puntos:

- 4.
- 8.
- 12.
- 16.
- 24.
- 32.
- 40.
- 48.
- 64.
- 80.

## Radios

- Small: 10–12px.
- Medium: 16px.
- Large: 22–24px.
- Extra large: 28–32px.
- Pill: 999px.

## Sombras

Sombras suaves. Evitar sombras negras duras.

- Soft: `0 8px 30px rgba(20, 40, 80, 0.06)`.
- Card: `0 14px 40px rgba(20, 40, 80, 0.08)`.
- Hover: `0 20px 50px rgba(20, 40, 80, 0.10)`.

## Botones

### Primary

- Fondo fucsia.
- Texto blanco.
- Radio pill o 16–18px.
- Peso 700.

### Secondary

- Fondo blanco.
- Borde suave.
- Texto azul oscuro o azul vivo.

### Ghost

- Fondo transparente.
- Texto azul oscuro.
- Hover con fondo suave.

### Danger

- Fondo rojo.
- Texto blanco.

## Cards

Todas las cards deben tener:

- Fondo blanco.
- Border radius grande.
- Borde suave opcional.
- Padding generoso.
- Sombra muy suave.
- Jerarquía clara.

## Inputs y selects

- Altura cómoda.
- Bordes suaves.
- Texto claro.
- Placeholder gris.
- Focus con borde azul o fucsia.

## Iconografía

- Web: preferir `lucide-react` si el proyecto web lo permite.
- Expo: usar `@expo/vector-icons`, ya presente en el proyecto.

Íconos simples, lineales y consistentes.

## Movimiento

Transiciones suaves:

- 180ms–250ms.
- Easing natural.
- Hover sutil.
- No abusar de animaciones.

## Regla clave

Toda pantalla nueva debe construirse usando este sistema visual. Si se necesita un patrón nuevo, debe agregarse acá antes de implementarse en múltiples lugares.
