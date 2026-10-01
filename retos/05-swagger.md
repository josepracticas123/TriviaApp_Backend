# 05 · Prueba las rutas en Swagger

**Tu misión:** Publica una página donde puedas leer el contrato de la API y enviar peticiones sin crear todavía un frontend.

**Antes:** El [reto 04](04-validacion-errores.md) debe estar aprobado e integrado en develop.

**Aprenderás:** OpenAPI, Swagger UI, esquemas de entrada y salida y ejemplos.

## Trabajo por bloques

1. Instala swagger-jsdoc y swagger-ui-express, y sus tipos si la versión los requiere. Guarda la configuración en src/docs/.

2. Monta /docs y GET /api/openapi.json. Documenta las rutas existentes, sus parámetros, datos y errores.

3. Prueba POST, GET, PUT y DELETE desde Swagger. Configura la generación para que funcione en desarrollo y con el código compilado; compruébalo, no asumas que dist contiene src.

## Comprueba tu entrega

- [ ] /docs carga y /api/openapi.json devuelve un documento OpenAPI válido.
- [ ] Todas las rutas existentes tienen método, descripción, entrada y respuestas coherentes con el servidor.
- [ ] Puedo completar el CRUD y reproducir un 400 y un 404 desde Swagger.
- [ ] Los ejemplos de respuesta no incluyen respuestaCorrecta; el esquema de entrada sí permite enviarla al crear o editar.
- [ ] La documentación funciona tanto con npm run dev como con npm run build y npm start.
- [ ] `npm run typecheck` y `npm run build` pasan; he comprobado que lo anterior sigue funcionando.
- [ ] He actualizado `APRENDIZAJE.md`, anotado las pruebas y abierto el PR hacia `develop` sin hacer merge.

## Demostración al tutor

¿Qué diferencia hay entre documentar una validación y ejecutarla? ¿Qué pasa si cambia una ruta y no cambia su documentación?

## Pistas

Los comentarios de swagger-jsdoc y Zod no se sincronizan automáticamente. Revisa ambos cuando cambie el contrato.

## Documentación

- [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc)
- [Swagger UI para Express](https://github.com/scottie1984/swagger-ui-express)

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

[Volver al README](../README.md) · [Reto 04](04-validacion-errores.md) · [Reto 06](06-postgres-prisma.md)
