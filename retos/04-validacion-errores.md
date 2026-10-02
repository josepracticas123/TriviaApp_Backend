# 04 · Valida las peticiones

**Tu misión:** Haz que la API rechace datos incorrectos de forma consistente. Los tipos ayudan al programar; Zod comprobará los datos recibidos mientras el servidor funciona.

**Antes:** El [reto 03](03-crud-memoria.md) debe estar aprobado e integrado en develop.

**Aprenderás:** Esquemas, safeParse, datos unknown y respuestas de error.

## Trabajo por bloques

1. Instala Zod y define esquemas en src/schemas/ para body y parámetros. Mantén el contrato del reto anterior.

2. Usa datos validados en las operaciones. Rechaza campos inesperados en creación y edición para que nadie modifique campos internos.

3. Acuerda el formato { error: { code, message } }; añade manejo de JSON mal formado, rutas inexistentes y errores inesperados sin enviar stack traces.

## Comprueba tu entrega

- [x] Texto vacío, opciones repetidas, número incorrecto de opciones y respuesta fuera de rango dan 400.
- [x] Campos extra como id se rechazan y no llegan a la colección.
- [x] Una petición inválida no modifica ningún dato y el servidor sigue atendiendo peticiones.
- [x] JSON mal formado devuelve un error JSON con 400; una ruta desconocida devuelve 404.
- [x] Los errores de la API usan el formato acordado; un fallo interno devuelve 500 sin detalles sensibles.
- [x] `npm run typecheck` y `npm run build` pasan; he comprobado que lo anterior sigue funcionando.
- [ ] He actualizado `APRENDIZAJE.md`, anotado las pruebas y abierto el PR hacia `develop` sin hacer merge.

## Demostración al tutor

Muestra que escribir un tipo para req.body no valida una petición. ¿Qué ventaja tiene trabajar con el resultado de safeParse?

## Pistas

Empieza por un esquema pequeño. El middleware de errores de Express tiene cuatro parámetros; no conviertas todos los errores en 400.

## Documentación

- [Zod: uso básico](https://zod.dev/basics)
- [Errores en Express](https://expressjs.com/en/guide/error-handling.html)

## Registro de entrega y revisión

Estado inicial: **En progreso**. Los checks son la autoevaluación del alumno; el cierre lo confirma el tutor.

- PR y commit revisado: pendiente. Se abrirá un PR desde `reto/04-validacion-errores` hacia `develop` cuando termine las comprobaciones.
- Prueba correcta (petición/acción y resultado): POST de una pregunta válida → `201 Created`. También se comprobó que GET `/health` sigue respondiendo correctamente.
- Prueba inválida o fallo (petición/acción y resultado): se probaron opciones vacías, opciones repetidas, número incorrecto de opciones, `respuestaCorrecta` fuera de rango y campos extra como `id`. Todas fueron rechazadas con `400 VALIDATION_ERROR`. También se comprobó que un PUT inválido no modifica los datos.
- Comandos y resultados: `npm run typecheck` → correcto. `npm run build` → correcto. Las pruebas de la API se realizaron con Thunder Client.
- Dudas o correcciones: Se corrigió un error de nombre en el middleware de errores: `erroMiddleware` pasó a llamarse `errorMiddleware` para coincidir con la importación y el uso en `app.ts`. También se comprobó el funcionamiento de los errores de JSON mal formado, rutas inexistentes y errores internos.
- Revisión y aprobación del tutor: pendiente.
- Merge en `develop`: pendiente.

No empieces el siguiente reto hasta que este PR esté aprobado e integrado. Las correcciones van en la misma rama y el mismo PR.

No empieces el siguiente reto hasta que este PR esté aprobado e integrado. Las correcciones van en la misma rama y el mismo PR.

[Volver al README](../README.md) · [Reto 03](03-crud-memoria.md) · [Reto 05](05-swagger.md)
