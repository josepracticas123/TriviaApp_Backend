# 17 · Juega por turnos mediante HTTP

**Tu misión:** Los dos jugadores responderán las mismas cinco preguntas por turnos. El servidor ordenará las acciones y cerrará la partida con ganador o empate.

**Antes:** El [reto 16](16-sala-dos-jugadores.md) debe estar aprobado e integrado en develop.

**Aprenderás:** Concurrencia, operaciones atómicas, conflictos y reintentos seguros.

## Trabajo por bloques

1. Por cada pregunta, responde primero el jugador 1 y después el 2; después avanza a la siguiente pregunta. La partida termina tras diez respuestas.

2. En una transacción, comprueba estado, participante, turno, pregunta y respuesta previa; guarda la respuesta y actualiza turno y puntuación juntos. Usa restricciones únicas y bloqueo o control de versión, con ayuda del tutor.

3. No reveles la solución ni si acertó el primer jugador hasta que ambos hayan respondido esa pregunta. Devuelve estado suficiente para seguir jugando sin calcular reglas en el frontend.

## Comprueba tu entrega

- [ ] Solo responde el jugador del turno; una respuesta fuera de turno o a otra pregunta da un conflicto documentado.
- [ ] Una respuesta por jugador y pregunta se garantiza también mediante restricción única en DB.
- [ ] Dos peticiones simultáneas no duplican puntos, saltan turnos ni dejan una partida a medio actualizar.
- [ ] Reintentar una respuesta ya aceptada se rechaza como duplicada sin modificar estado.
- [ ] Ninguna respuesta o puntuación intermedia revela el acierto del primer jugador antes de responder el segundo.
- [ ] Diez respuestas terminan la partida con puntuaciones y ganador o empate correctos.
- [ ] Hay pruebas automatizadas de duplicados, concurrencia, permisos y finalización; modo individual sigue funcionando.
- [ ] `npm run typecheck` y `npm run build` pasan; he comprobado que lo anterior sigue funcionando.
- [ ] He actualizado `APRENDIZAJE.md`, anotado las pruebas y abierto el PR hacia `develop` sin hacer merge.

## Demostración al tutor

Enseña un turno válido, otro inválido y dos peticiones simultáneas. ¿Qué partes deben guardarse juntas?

## Pistas

Este reto necesita acompañamiento del tutor. Una transacción aislada no garantiza por sí sola que dos lecturas concurrentes vean turnos distintos: hay que serializar o detectar conflictos.

## Documentación

- [Transacciones, aislamiento y concurrencia](https://www.prisma.io/docs/orm/prisma-client/queries/transactions)

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

[Volver al README](../README.md) · [Reto 16](16-sala-dos-jugadores.md) · [Reto 18](18-socket-io.md)
