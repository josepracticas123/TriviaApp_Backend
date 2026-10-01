# 08 · Organiza el backend

**Tu misión:** Ahora que tienes una API funcionando, separa sus responsabilidades para que autenticación y partidas puedan crecer sin llenar app.ts.

**Antes:** El [reto 07](07-crud-persistente.md) debe estar aprobado e integrado en develop.

**Aprenderás:** Router, controlador, servicio y separación de responsabilidades.

## Trabajo por bloques

1. Mueve la definición de rutas a src/routes/ y el manejo HTTP a src/controllers/.

2. Mueve las consultas y reglas a src/services/. Los servicios reciben datos normales y no reciben req ni res.

3. Deja configuración y montaje en app.ts, conexión en src/lib/ y apertura del puerto en server.ts. Conserva los esquemas y tipos en sus carpetas.

## Comprueba tu entrega

- [ ] app.ts configura y monta rutas; no contiene el CRUD completo.
- [ ] Los controladores leen datos validados y construyen respuestas HTTP.
- [ ] Los servicios no dependen de Express y centralizan las consultas y reglas.
- [ ] El CRUD y Swagger funcionan igual en desarrollo y compilación.
- [ ] No hay archivos duplicados ni importaciones circulares para mantener el código anterior.
- [ ] `npm run typecheck` y `npm run build` pasan; he comprobado que lo anterior sigue funcionando.
- [ ] He actualizado `APRENDIZAJE.md`, anotado las pruebas y abierto el PR hacia `develop` sin hacer merge.

## Demostración al tutor

Recorre una petición desde la ruta hasta PostgreSQL y de vuelta. ¿Qué función podrías reutilizar desde un evento de Socket.IO?

## Pistas

Funciones exportadas son suficientes. No hacen falta clases, repositorios genéricos ni inyección de dependencias.

## Documentación

- [Router de Express](https://expressjs.com/en/guide/routing.html)

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

[Volver al README](../README.md) · [Reto 07](07-crud-persistente.md) · [Reto 09](09-relaciones.md)
