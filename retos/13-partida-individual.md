# 13 · Juega una partida individual

**Tu misión:** Crea una partida de cinco preguntas y responde una a una. El backend elegirá las preguntas, comprobará las respuestas y calculará los puntos.

**Antes:** El [reto 12](12-autenticacion-permisos.md) debe estar aprobado e integrado en develop.

**Aprenderás:** Reglas de negocio, estado de partida y datos públicos frente a internos.

## Trabajo por bloques

1. Crea Game, GamePlayer, GameQuestion y Answer mediante migraciones. Usa participantes relacionados incluso en modo individual para poder ampliar después.

2. POST /api/games crea una partida individual privada, GET /api/games/:id devuelve su estado y POST /api/games/:id/answers recibe la pregunta de partida y opción elegida. Devuelve 409 si no hay cinco preguntas disponibles.

3. Guarda el orden y una copia de las preguntas, opciones y soluciones seleccionadas. Cambiar o borrar una pregunta del catálogo no debe alterar una partida existente.

## Comprueba tu entrega

- [ ] La partida contiene cinco preguntas sin repetición y pertenece al usuario autenticado.
- [ ] La respuesta pública de la partida no revela soluciones de preguntas pendientes.
- [ ] El backend verifica que la pregunta corresponde al turno y que la opción pertenece a esa pregunta.
- [ ] Cada respuesta correcta suma un punto; el cliente no puede enviar ni modificar su puntuación.
- [ ] Responder dos veces no suma dos veces; completar las cinco preguntas finaliza la partida.
- [ ] Usuario ajeno recibe 403 y una partida inexistente devuelve 404; Swagger refleja el contrato.
- [ ] `npm run typecheck` y `npm run build` pasan; he comprobado que lo anterior sigue funcionando.
- [ ] He actualizado `APRENDIZAJE.md`, anotado las pruebas y abierto el PR hacia `develop` sin hacer merge.

## Demostración al tutor

Juega una partida completa. ¿Por qué guardar una copia de las preguntas evita que una edición del catálogo cambie una partida?

## Pistas

Mantén toda la lógica en servicios. Distingue el ID de la pregunta del catálogo del ID de la pregunta guardada en una partida.

## Documentación

- [Modelado con Prisma](https://www.prisma.io/docs/orm/prisma-schema/data-model/models)

## Registro de entrega y revisión

Estado inicial: **Pendiente**. Los checks son la autoevaluación del alumno; el cierre lo confirma el tutor.

- PR y commit revisado: pendiente.
- Prueba correcta (petición/acción y resultado): pendiente.
- Prueba inválida o fallo (petición/acción y resultado): pendiente.
- Comandos y resultados: pendiente.
- Dudas o correcciones: pendiente.
- Revisión y aprobación del tutor: pendiente.
- Merge en `develop`: pendiente.

No empieces el siguiente reto hasta que este PR esté aprobado e integrado. Las correcciones van en la misma rama y el mismo PR.

[Volver al README](../README.md) · [Reto 12](12-autenticacion-permisos.md) · [Reto 14](14-historial.md)
