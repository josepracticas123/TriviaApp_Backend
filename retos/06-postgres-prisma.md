# 06 · Prepara PostgreSQL y Prisma

**Tu misión:** Prepara una base de datos local y aprende a crear sus tablas mediante migraciones. Las rutas seguirán usando memoria hasta el siguiente reto.

**Antes:** El [reto 05](05-swagger.md) debe estar aprobado e integrado en develop.

**Aprenderás:** PostgreSQL, DATABASE_URL, ORM, modelos, migraciones y seed.

## Trabajo por bloques

1. Con el tutor, prepara compose.yaml con PostgreSQL, volumen persistente y comprobación de disponibilidad. Documenta inicio, parada y variables locales. No ejecutes down -v para una parada normal: borra los datos.

2. Revisa la guía vigente de Prisma con PostgreSQL; instala CLI, cliente y adaptador necesarios con versiones compatibles. Registra los comandos y crea el modelo inicial Question con ID entero, enunciado, opciones y solución.

3. Crea la primera migración y un seed repetible. Centraliza el cliente en src/lib/. Añade los scripts de DB que realmente funcionan y explica cada uno en el README.

## Comprueba tu entrega

- [ ] PostgreSQL arranca localmente y Prisma se conecta con DATABASE_URL.
- [ ] La migración está en Git y puede preparar otra base de desarrollo vacía.
- [ ] El seed crea al menos cinco preguntas y ejecutarlo dos veces no las duplica.
- [ ] Parar y arrancar PostgreSQL conserva los datos gracias al volumen.
- [ ] Las credenciales reales y el cliente generado no se suben; esquema, configuración necesaria y migraciones sí.
- [ ] El README recoge versiones, instalación, comandos y cómo inspeccionar los datos.
- [ ] `npm run typecheck` y `npm run build` pasan; he comprobado que lo anterior sigue funcionando.
- [ ] He actualizado `APRENDIZAJE.md`, anotado las pruebas y abierto el PR hacia `develop` sin hacer merge.

## Demostración al tutor

¿Qué diferencia hay entre el servidor PostgreSQL, Prisma y una migración? Enseña dónde están las tablas y dónde está el historial de cambios.

## Pistas

Docker es una herramienta para preparar el entorno. No necesitas dominarlo. Las opciones de configuración de Prisma cambian entre versiones: usa una sola guía compatible.

## Documentación

- [Prisma con PostgreSQL](https://docs.prisma.io/docs/prisma-orm/quickstart/postgresql)
- [Docker Compose](https://docs.docker.com/compose/gettingstarted/)

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

[Volver al README](../README.md) · [Reto 05](05-swagger.md) · [Reto 07](07-crud-persistente.md)
