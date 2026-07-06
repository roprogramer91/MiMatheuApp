# MiMatheu - Design System

## Estado

Design System oficial de MiMatheu para implementar pantallas, componentes y estados visuales en Expo / React Native.

Este documento define reglas concretas. No es una guia teorica ni una coleccion de inspiracion visual.

## Filosofia visual

MiMatheu debe sentirse como una app local premium para vecinos de Matheu: clara, limpia, cercana, util y confiable.

La interfaz debe priorizar informacion antes que botones. Las acciones existen para resolver necesidades concretas, pero la experiencia principal debe ayudar al usuario a entender rapidamente que pasa hoy en Matheu.

La estetica general debe ser moderna, aireada y cuidada, con mucho espacio en blanco, fondos claros, cards grandes, bordes redondeados y sombras suaves.

La Home no debe parecer un menu. Debe sentirse como un resumen inteligente del dia: clima, alertas, informacion local relevante, conexiones utiles, novedades y accesos contextuales segun importancia.

## Principios visuales

- Local primero: hablar de Matheu, barrios y zonas, no de ciudades genericas.
- Informacion antes que navegacion.
- Cards como unidad principal de contenido.
- Jerarquia clara: cada pantalla debe explicar que importa primero.
- Mucho aire visual.
- Pocas cosas por pantalla, bien elegidas.
- Acciones visibles, pero no invasivas.
- Estetica premium sin perder cercania comunitaria.
- Nada debe sentirse improvisado pantalla por pantalla.

## Paleta oficial

### Brand

| Token | Valor | Uso |
|---|---:|---|
| `color.brand.blue` | `#0066ff` | Accion principal, navegacion, informacion relevante |
| `color.brand.blueAlt` | `#0077ff` | Variacion viva para highlights o estados activos |
| `color.brand.blueDark` | `#071b4d` | Texto fuerte, titulos, identidad |
| `color.brand.fuchsia` | `#ec168f` | Marca, llamados destacados, alertas suaves, momentos emocionales |
| `color.brand.fuchsiaDark` | `#c91178` | Pressed / emphasis fucsia |

### Fondos y superficies

| Token | Valor | Uso |
|---|---:|---|
| `color.background.app` | `#f7f9fc` | Fondo general de pantalla |
| `color.background.soft` | `#f3f6fb` | Bloques suaves o areas secundarias |
| `color.surface.card` | `#ffffff` | Cards y superficies principales |
| `color.surface.raised` | `#ffffff` | Elementos flotantes |
| `color.border.soft` | `#e6edf5` | Bordes sutiles |
| `color.border.focus` | `#0066ff` | Foco activo |

### Texto

| Token | Valor | Uso |
|---|---:|---|
| `color.text.primary` | `#071b4d` | Titulos y texto principal |
| `color.text.secondary` | `#526174` | Descripciones |
| `color.text.muted` | `#7b8aa0` | Metadatos, horarios, captions |
| `color.text.inverse` | `#ffffff` | Texto sobre fondos de marca |

### Estados

| Token | Valor | Uso |
|---|---:|---|
| `color.state.success` | `#16a34a` | Confirmaciones, disponible, resuelto |
| `color.state.warning` | `#f59e0b` | Atencion, precaucion |
| `color.state.error` | `#ef4444` | Error, urgente, peligro |
| `color.state.info` | `#0066ff` | Informacion general |

## Reglas de uso de color

El azul es el color principal funcional: navegacion, informacion, acciones primarias y estados activos.

El fucsia es el color emocional y de marca: highlights, acciones especiales, alertas suaves, enfasis de comunidad y momentos que necesitan llamar la atencion sin parecer error.

No usar colores aleatorios por pantalla. Si una seccion necesita un color propio, debe derivar de estos tokens o documentarse primero.

No abusar de degradados. MiMatheu puede usar degradados suaves solo en casos puntuales de marca, como hero visual, clima destacado o card premium. La UI base debe apoyarse en superficies blancas, fondos claros y sombras suaves.

No usar rojo para alertas suaves. El rojo queda reservado para error, peligro o urgencia real.

## Tipografia

Fuente recomendada: `Plus Jakarta Sans`.

Si todavia no esta cargada en Expo, usar fuente nativa del sistema hasta incorporarla. No mezclar familias tipograficas sin decision documentada.

### Escala tipografica

| Token | Tamano | Peso | Uso |
|---|---:|---:|---|
| `font.logo` | 32 | 800 | Marca MiMatheu |
| `font.display` | 34-40 | 800 | Momentos hero o mensajes principales |
| `font.screenTitle` | 28-32 | 800 | Titulo de pantalla |
| `font.sectionTitle` | 20-22 | 700 | Titulo de seccion |
| `font.cardTitle` | 17-20 | 700 | Titulo de card |
| `font.body` | 15-16 | 500 | Texto normal |
| `font.bodyStrong` | 15-16 | 700 | Texto importante dentro de card |
| `font.secondary` | 13-14 | 500 | Texto secundario |
| `font.caption` | 11-12 | 500 | Metadatos, fecha, distancia |
| `font.button` | 15-16 | 700 | Botones |
| `font.badge` | 11-12 | 700 | Badges y chips compactos |

## Espaciado

Usar sistema de 4 / 8 puntos.

Tokens oficiales:

- `space.1`: `4`
- `space.2`: `8`
- `space.3`: `12`
- `space.4`: `16`
- `space.5`: `20`
- `space.6`: `24`
- `space.8`: `32`
- `space.10`: `40`
- `space.12`: `48`
- `space.16`: `64`

Reglas:

- Padding minimo de pantalla mobile: `20`.
- Padding recomendado de card grande: `20` a `24`.
- Separacion entre secciones: `24` a `32`.
- Separacion entre cards: `12` a `16`.
- No compactar la Home para "mostrar todo". Debe respirar.

## Border radius

| Token | Valor | Uso |
|---|---:|---|
| `radius.xs` | `6` | Badges pequenos, indicadores |
| `radius.sm` | `10` | Inputs compactos, chips |
| `radius.md` | `14` | Botones, controles |
| `radius.lg` | `18` | Cards pequenas |
| `radius.xl` | `24` | Cards principales |
| `radius.full` | `999` | Pills, avatares, botones circulares |

## Sombras

Sombras suaves, nunca negras duras.

| Token | Valor |
|---|---|
| `shadow.card` | `0 10px 28px rgba(7, 27, 77, 0.07)` |
| `shadow.floating` | `0 16px 40px rgba(7, 27, 77, 0.10)` |
| `shadow.modal` | `0 24px 70px rgba(7, 27, 77, 0.18)` |
| `shadow.bottomNavigation` | `0 -10px 30px rgba(7, 27, 77, 0.08)` |

En React Native, adaptar con `shadowColor`, `shadowOpacity`, `shadowRadius`, `shadowOffset` y `elevation`.

## Componentes base

### ScreenContainer

Contenedor base de pantalla.

Debe usar fondo `color.background.app`, padding horizontal `20`, y respetar safe area. No debe centrar todo el contenido por defecto.

### SectionHeader

Encabezado de seccion con titulo, descripcion opcional y accion opcional.

Debe ser claro y compacto. La accion no debe competir con el contenido.

### Card

Unidad principal de contenido.

Debe usar fondo blanco, radius `xl`, padding generoso, sombra `card` y borde suave opcional. Una card debe comunicar una idea o necesidad concreta.

### Button

Accion clara.

Variantes:

- `primary`: azul o fucsia segun contexto.
- `secondary`: blanco con borde suave.
- `ghost`: sin fondo para acciones livianas.
- `danger`: rojo solo para acciones destructivas.

### IconButton

Boton compacto para iconos.

Debe tener area tactil comoda, minimo `44x44`, radius `full` o `md`, y estado activo visible.

### Badge

Indicador pequeno de estado.

Debe ser breve: "Abierto", "Hoy", "Cerca", "Urgente", "Nuevo". No usar frases largas.

### Chip

Filtro o selector liviano.

Debe usarse para barrios, categorias, estados o filtros simples.

### Avatar

Representacion de usuario, comercio, mascota o fuente.

Debe ser circular, con fallback visual consistente si no hay imagen.

### BottomNavigation

Navegacion principal mobile.

Debe ser limpia, con iconos simples, labels breves, estado activo azul y sombra superior suave. No debe parecer una barra pesada.

### WeatherCard

Card fija superior de la Home.

Debe mostrar clima actual de Matheu de forma clara: temperatura, condicion, sensacion o dato util. Puede incluir recomendacion breve si aporta valor.

### ConnectionCard

Card de vinculo comunitario.

Debe mostrar ayuda, conexion o validacion. Nunca debe mostrar ruido social generico. Ejemplos validos: vecino ofrece ayuda, comercio validado, aviso util cercano, contacto comunitario.

### RouteAlertCard

Card para cortes, demoras, accesos o alertas de movilidad.

Debe explicar que pasa, donde pasa y por que importa hoy.

### LostPetNearbyCard

Card para mascota perdida o encontrada cerca.

Debe priorizar foto, zona, estado y accion rapida. Debe sentirse urgente pero no alarmista.

### PharmacyCard

Card para farmacia de turno o farmacia relevante.

Debe mostrar nombre, estado, direccion/zona, horario y accion de contacto o como llegar cuando corresponda.

### NewsCard

Card de novedad local.

Debe mostrar fuente, fecha, titulo claro y resumen breve. No debe sentirse como feed infinito.

### EmptyState

Estado vacio.

Debe explicar que falta y que puede hacer el usuario. Tono humano, simple y local.

### LoadingState

Estado de carga.

Debe ser discreto, estable y no mover la pantalla innecesariamente. Preferir skeletons simples para cards.

### ErrorState

Estado de error.

Debe explicar el problema en lenguaje simple y ofrecer reintento cuando corresponda. No mostrar errores tecnicos crudos al usuario.

## Reglas para la Home

La Home es un resumen inteligente del dia en Matheu, no un menu de secciones.

El clima va fijo e inamovible arriba como primera card informativa.

Debajo del clima se muestran cards dinamicas segun relevancia: farmacia de turno, mascotas cercanas, alertas de ruta, novedades locales, conexiones utiles o eventos.

El orden puede cambiar segun importancia, cercania, urgencia o momento del dia.

La Home no debe saturarse. Si hay demasiada informacion, mostrar menos y priorizar mejor.

Cada card debe explicar por que importa ahora. No alcanza con mostrar un titulo y un boton.

Conexiones debe mostrar ayuda, conexion o validacion comunitaria. Nunca ruido, contenido generico ni actividad social sin valor.

La Home debe sentirse viva, util y local, pero tranquila.

## Reglas de implementacion

Toda pantalla nueva debe usar estos tokens.

Evitar estilos hardcodeados salvo casos excepcionales y justificados.

Si se repite un patron visual o funcional, evaluar crear componente reutilizable.

No crear componentes globales innecesarios. Si algo pertenece a una sola seccion, puede vivir dentro de esa feature.

No modificar funcionalidad al aplicar este Design System salvo que Roger lo pida explicitamente.

No agregar librerias visuales nuevas sin justificar.

Toda mejora visual importante debe ser incremental, revisable y consistente con este documento.

## Criterio final

Una pantalla de MiMatheu esta bien disenada si un vecino puede abrirla, entender que importa, confiar en la informacion y actuar sin esfuerzo.
