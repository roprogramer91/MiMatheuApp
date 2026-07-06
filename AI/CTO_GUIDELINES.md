# MiMatheu - CTO Guidelines

Este documento define la filosofia de ingenieria de MiMatheu.

No describe tecnologias especificas. Describe como pensamos, decidimos, construimos y mantenemos el proyecto para que pueda crecer durante muchos anos sin volverse fragil, confuso o dificil de evolucionar.

---

## Nuestra filosofia de desarrollo

MiMatheu debe crecer con calma, criterio y continuidad.

No buscamos avanzar rapido a costa de romper la base del proyecto. Buscamos construir una plataforma local util, confiable y mantenible para la comunidad de Matheu.

Cada cambio debe tener una razon clara. Cada funcionalidad debe aportar valor real. Cada decision tecnica debe ayudar a que el proyecto sea mas facil de entender, modificar y sostener en el tiempo.

Preferimos una solucion simple, clara y bien integrada antes que una solucion sofisticada que aumente la complejidad sin necesidad.

El proyecto debe poder ser entendido por nuevos desarrolladores, revisado por asistentes de IA y evolucionado por etapas sin depender de memoria informal o decisiones escondidas en conversaciones.

---

## Como tomamos decisiones

Las decisiones importantes se toman mirando tres dimensiones:

1. Valor para el usuario.
2. Salud tecnica del proyecto.
3. Capacidad de mantenimiento a largo plazo.

Una decision no es buena solo porque resuelve el problema de hoy. Tambien debe dejar el proyecto en una posicion razonable para resolver los problemas de manana.

Cuando haya dudas, priorizamos:

- Claridad sobre ingenio.
- Consistencia sobre preferencia personal.
- Evolucion incremental sobre cambios grandes.
- Necesidades reales de Matheu sobre ideas genericas.
- Codigo entendible sobre abstracciones prematuras.

Las decisiones relevantes deben quedar documentadas. Si una decision cambia la arquitectura, el flujo de trabajo, el producto o la forma de implementar, debe registrarse.

---

## Como pensar antes de programar

Antes de escribir codigo, debemos entender:

- Que problema real queremos resolver.
- Para quien lo estamos resolviendo.
- Que parte del sistema se ve afectada.
- Si ya existe una solucion o patron similar.
- Que riesgo tiene el cambio.
- Como vamos a probar que funciona.
- Que documentacion hay que actualizar.

Programar sin contexto produce soluciones aisladas. MiMatheu no debe crecer como una suma de pantallas o parches sueltos, sino como un producto coherente.

Pensar antes de programar no significa frenar el avance. Significa evitar trabajo innecesario, duplicacion y deuda tecnica evitable.

---

## Que significa escribir codigo de calidad

Codigo de calidad es codigo que otra persona puede leer, entender, modificar y probar sin tener que adivinar intenciones.

Para MiMatheu, calidad significa:

- Nombres claros.
- Responsabilidades bien separadas.
- Funciones y componentes con un proposito reconocible.
- Estados de carga, error y vacio considerados.
- Comportamiento predecible.
- Reutilizacion razonable.
- Dependencias justificadas.
- Estilos y patrones consistentes.
- Cambios pequenos y revisables.
- Documentacion actualizada cuando corresponde.

El codigo de calidad no es necesariamente el mas corto ni el mas abstracto. Es el que mejor comunica la intencion y reduce el costo de mantenimiento.

---

## Como disenamos componentes

Un componente debe existir para representar una responsabilidad clara.

Antes de crear un componente, debemos preguntarnos:

- Que problema resuelve?
- Se usara en mas de un lugar?
- Tiene una responsabilidad unica?
- Depende de reglas de una pantalla especifica o es reutilizable?
- Su nombre explica bien su proposito?
- Su API es simple?
- Evita esconder demasiada logica?

Los componentes reutilizables deben ser predecibles, consistentes y faciles de combinar. No deben conocer detalles innecesarios del negocio.

Los componentes especificos de una funcionalidad pueden vivir cerca de esa funcionalidad. No todo debe convertirse en componente global.

---

## Cuando reutilizar codigo

Reutilizamos codigo cuando la repeticion representa el mismo concepto, la misma responsabilidad o el mismo patron de experiencia.

La reutilizacion es buena cuando:

- Reduce duplicacion real.
- Mejora la consistencia.
- Hace mas facil mantener cambios futuros.
- Evita que dos partes del producto evolucionen de forma contradictoria.
- No vuelve mas dificil entender el flujo.

No reutilizamos codigo solo porque dos bloques se parecen visualmente. A veces dos cosas parecidas tienen razones de cambio distintas y conviene mantenerlas separadas hasta entender mejor el patron.

---

## Cuando crear un componente nuevo

Creamos un componente nuevo cuando:

- Un patron se repite o probablemente se repetira.
- Una pantalla empieza a mezclar demasiadas responsabilidades.
- Una parte de la interfaz tiene identidad propia.
- La extraccion mejora la lectura.
- La extraccion permite probar o evolucionar mejor una parte del sistema.
- El componente representa una pieza del lenguaje visual o funcional del producto.

No creamos componentes nuevos para ocultar complejidad sin resolverla. Un componente mal nombrado o demasiado generico puede empeorar el proyecto.

---

## Cuando hacer refactors

Un refactor es correcto cuando mejora la estructura interna sin cambiar el comportamiento esperado.

Hacemos refactors cuando:

- El codigo actual dificulta implementar un cambio necesario.
- Hay duplicacion que ya tiene un patron claro.
- Una responsabilidad esta mezclada con otra.
- Una abstraccion existente quedo corta o confusa.
- Hay riesgo de errores por falta de estructura.
- La deuda tecnica esta frenando el avance.

Los refactors deben tener alcance claro. Idealmente deben ser pequenos, revisables y separados de cambios funcionales grandes.

Antes de refactorizar, debemos poder explicar que problema estamos corrigiendo y como vamos a verificar que no rompimos comportamiento existente.

---

## Cuando NO hacer refactors

No hacemos refactors cuando:

- Solo buscamos que el codigo se parezca a una preferencia personal.
- No entendemos suficientemente el comportamiento actual.
- El cambio no aporta valor tecnico o de producto claro.
- Mezcla demasiadas areas del sistema sin necesidad.
- No hay forma razonable de verificar que todo sigue funcionando.
- El proyecto necesita primero una decision de producto o arquitectura.
- El refactor se convierte en una reescritura encubierta.

Tambien evitamos refactors grandes mientras una funcionalidad critica esta inestable. Primero se estabiliza, luego se mejora la estructura.

---

## Como evitar deuda tecnica

La deuda tecnica no se evita buscando perfeccion. Se evita tomando decisiones conscientes.

Para reducir deuda tecnica:

- No duplicar patrones sin evaluar si deben abstraerse.
- No crear abstracciones antes de tiempo.
- No dejar decisiones importantes sin documentar.
- No ignorar errores conocidos.
- No mezclar cambios visuales, funcionales y arquitectonicos sin necesidad.
- No introducir dependencias sin motivo fuerte.
- No dejar estados incompletos si afectan al usuario.
- No asumir que "despues lo arreglamos" sin registrar el pendiente.

Cuando aceptamos deuda tecnica, debe ser una deuda explicita: sabemos que existe, por que se acepto y cuando podria resolverse.

---

## Como mantener el proyecto simple

La simplicidad es una decision activa.

Mantenemos MiMatheu simple cuando:

- Cada parte tiene una responsabilidad clara.
- Las rutas, pantallas y modulos tienen nombres entendibles.
- Las reglas de negocio estan separadas de la presentacion cuando corresponde.
- La informacion importante esta documentada.
- Los cambios se hacen en pasos pequenos.
- Evitamos soluciones genericas para problemas que todavia no existen.
- Priorizamos lo que el usuario necesita ahora.

Simple no significa incompleto. Simple significa que el sistema hace lo necesario sin cargar complejidad accidental.

---

## Como documentar

La documentacion debe ayudar a tomar mejores decisiones y a entender el estado real del proyecto.

Documentamos:

- Decisiones de arquitectura.
- Cambios importantes.
- Estado actual del producto.
- Reglas de diseno.
- Flujos de trabajo.
- Riesgos conocidos.
- Pendientes relevantes.
- Criterios que afecten futuras implementaciones.

La documentacion debe mantenerse cerca del proyecto y actualizarse cuando el sistema cambia.

No documentamos por burocracia. Documentamos para que el equipo, incluidos los asistentes de IA, pueda trabajar con memoria compartida.

---

## Como trabajar con IA

La IA es parte del flujo de trabajo, pero no reemplaza el criterio del proyecto.

Todo asistente debe:

- Leer el contexto antes de modificar codigo.
- Respetar la documentacion vigente.
- No improvisar funcionalidades.
- No cambiar arquitectura sin aprobacion.
- Proponer cambios incrementales.
- Explicar riesgos y supuestos.
- Mantener el foco en Matheu.
- Documentar cambios relevantes.
- Evitar refactors masivos no solicitados.

La IA debe actuar como colaborador responsable. Debe ayudar a acelerar el trabajo sin romper la coherencia del producto.

Si una instruccion nueva entra en conflicto con la documentacion vigente, se debe detectar el conflicto y pedir definicion o registrar la decision correspondiente.

---

## Que errores queremos evitar

Queremos evitar:

- Convertir MiMatheu en una app generica.
- Construir funcionalidades sin necesidad real.
- Duplicar estilos, componentes o logica.
- Reescribir partes grandes sin plan.
- Agregar dependencias innecesarias.
- Dejar decisiones importantes fuera del repositorio.
- Mezclar responsabilidades en una misma pantalla o modulo.
- Romper funcionalidades existentes por cambios visuales.
- Ignorar estados de error, carga o datos vacios.
- Crear codigo que solo entiende quien lo escribio.
- Priorizar velocidad aparente sobre mantenibilidad real.

Cada error evitado hoy ahorra tiempo, confianza y complejidad manana.

---

## Que significa terminado

Una tarea esta terminada cuando cumple su objetivo sin dejar el proyecto en peor estado.

Para considerar algo terminado, debe cumplirse:

- El cambio resuelve el problema solicitado.
- No rompe comportamiento existente.
- Respeta el diseno y la arquitectura definidos.
- Maneja estados relevantes.
- Fue probado de forma razonable segun el riesgo.
- No introduce duplicacion innecesaria.
- No deja codigo muerto o confuso.
- Actualiza documentacion si corresponde.
- Puede ser revisado por otra persona.

"Funciona en mi maquina" no es suficiente. Terminado significa integrado, comprensible y mantenible.

---

## Como queremos que evolucione MiMatheu

MiMatheu debe evolucionar como una plataforma local confiable para vecinos de Matheu.

Queremos que crezca por etapas:

- Primero, ordenar la base.
- Luego, fortalecer las funcionalidades de mayor valor.
- Despues, sumar nuevas secciones con arquitectura consistente.
- Mas adelante, incorporar datos reales, moderacion, administracion y capacidades comunitarias.

Cada nueva funcionalidad debe reforzar la identidad local del producto.

MiMatheu no debe perder su foco: informacion clara, util y cercana para la comunidad de Matheu.

La evolucion correcta no es hacer mas por hacer mas. Es construir una plataforma que pueda sostener valor durante anos sin volverse pesada, incoherente o dificil de mantener.
