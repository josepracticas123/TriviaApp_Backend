# 01 · Arranca tu backend

**Tu misión:** El proyecto ya arranca. Tu primer trabajo es entender la base y añadir una ruta que permita comprobar si el servidor está disponible.

**Antes:** Lee la preparación y el flujo de ramas del README.

**Aprenderás:** Node, npm, Express, petición y respuesta HTTP, tipos básicos y variables de entorno.

## Trabajo por bloques

1. Arranca la base siguiendo el README y localiza qué hace app.ts y qué hace server.ts. No vuelvas a generar el proyecto.

2. Añade GET /health con estado 200 y JSON { "status": "ok" }. Conserva la bienvenida en GET /.

3. Prueba otro puerto con PORT en .env, vuelve al puerto habitual y escribe qué significa cada script.

## Comprueba tu entrega

- [x] GET / devuelve la bienvenida y GET /health devuelve el JSON acordado con estado 200.
- [x] npm run dev recarga al guardar; npm run typecheck y npm run build terminan sin errores.
- [x] npm start ejecuta la versión compilada; puedo detenerla con Ctrl+C.
- [x] Cambiar PORT en .env y reiniciar cambia el puerto; un valor inválido da un error comprensible.
- [x] .env está ignorado y .env.example conserva solo valores de ejemplo.
- [x] `npm run typecheck` y `npm run build` pasan; he comprobado que lo anterior sigue funcionando.
- [x] He actualizado `APRENDIZAJE.md`, anotado las pruebas y abierto el PR hacia `develop` sin hacer merge.

## Demostración al tutor

¿Qué diferencia hay entre ejecutar TypeScript con tsx y comprobarlo con tsc? ¿Por qué app.ts no abre el puerto?

-"tsx me permite ejecutar mi TypeScript durante el desarrollo. tsc analiza y comprueba que el código TypeScript sea correcto, y con npm run build además genera el JavaScript que después ejecutamos con Node."

## Pistas

Prueba curl -i http://localhost:3000/health. El navegador basta para GET, pero no para construir cualquier petición.

## Documentación

- [Express: primera aplicación](https://expressjs.com/en/starter/hello-world/)
- [TypeScript: tipos cotidianos](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

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

[Volver al README](../README.md) · [Reto 02](02-listar-preguntas.md)
