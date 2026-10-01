# 22 · Entrega y revisión final

**Tu misión:** Comprueba que otra persona puede arrancar el proyecto y jugar sin depender de tu ordenador. Entrega una API documentada y un recorrido multijugador reproducible.

**Antes:** El [reto 21](21-despliegue.md) debe estar aprobado e integrado en develop.

**Aprenderás:** Pruebas de integración, documentación reproducible y revisión de entrega.

## Trabajo por bloques

1. Desde un clon limpio, sigue el README: dependencias, entorno, DB, migraciones, seed local, compilación y arranque. Corrige instrucciones que no funcionen.

2. Completa pruebas de auth, permisos, preguntas, partidas, concurrencia y recuperación con DB de pruebas. Añade una limitación razonable de intentos de login y tamaño de body antes de la entrega pública; documenta 429 y límites.

3. Revisa Swagger y eventos, ejecuta una partida pública con dos cuentas y prepara una explicación de arquitectura. Deja los PR abiertos para el tutor y registra los merges y la versión publicada cuando se aprueben.

## Comprueba tu entrega

- [ ] Un clon limpio arranca con los pasos documentados y sin archivos privados del autor.
- [ ] typecheck, build y las pruebas acordadas pasan en una DB independiente.
- [ ] Las pruebas cubren acceso ajeno, token inválido/caducado, respuestas simultáneas y puntuación.
- [ ] Login tiene límite de intentos comprobado; cuerpos demasiado grandes se rechazan sin romper el servidor.
- [ ] Swagger coincide con entradas, salidas, errores y permisos; eventos están documentados.
- [ ] El recorrido público individual y multijugador funciona, incluidos empate, reconexión y reinicio.
- [ ] README identifica URLs, versiones, limitaciones y cómo recuperar el entorno.
- [ ] Tutor revisa, aprueba e integra los PR; producción corresponde a main.
- [ ] `npm run typecheck` y `npm run build` pasan; he comprobado que lo anterior sigue funcionando.
- [ ] He actualizado `APRENDIZAJE.md`, anotado las pruebas y abierto el PR hacia `develop` sin hacer merge.

## Demostración al tutor

Explica una petición completa, una transacción de turno y un evento. ¿Qué necesitarías cambiar si hubiera varias instancias del backend?

## Pistas

La entrega usa una instancia del backend. Redis, varias réplicas, emparejamiento automático, temporizadores y refresh tokens son ampliaciones; no son requisitos ocultos.

## Documentación

- [Pruebas Node](https://nodejs.org/api/test.html)
- [Despliegue Prisma](https://www.prisma.io/docs/orm/prisma-migrate/workflows/development-and-production)

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

[Volver al README](../README.md) · [Reto 21](21-despliegue.md)
