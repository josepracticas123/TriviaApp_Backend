# 15 · Prepara las consultas del frontend

**Tu misión:** Permite consultar preguntas e historial por páginas y configura qué frontend podrá llamar al backend desde un navegador.

**Antes:** El [reto 14](14-historial.md) debe estar aprobado e integrado en develop.

**Aprenderás:** Query params, paginación, búsqueda y CORS.

## Trabajo por bloques

1. Define page y pageSize con valores por defecto 1 y 10, y máximo 50. Devuelve items, total, page y pageSize. Añade búsqueda y categoryId al listado de preguntas.

2. Usa orden estable con ID como desempate y los mismos filtros en listado y total. Pagina también /api/me/games.

3. Instala cors y configura FRONTEND_ORIGIN con el origen del frontend local. Actualiza ejemplos, parámetros y esquemas de Swagger.

## Comprueba tu entrega

- [ ] Parámetros incorrectos dan 400 y una página sin elementos devuelve items vacío con metadatos coherentes.
- [ ] Búsqueda y categoría afectan tanto a items como a total; el orden es estable.
- [ ] Historial sigue limitado al usuario autenticado aunque se cambie la paginación.
- [ ] Peticiones del navegador desde el origen permitido funcionan, incluido el preflight de Authorization.
- [ ] Puedo explicar que CORS no sustituye a JWT ni bloquea por sí solo a clientes como curl.
- [ ] `npm run typecheck` y `npm run build` pasan; he comprobado que lo anterior sigue funcionando.
- [ ] He actualizado `APRENDIZAJE.md`, anotado las pruebas y abierto el PR hacia `develop` sin hacer merge.

## Demostración al tutor

Compara dos páginas y una consulta filtrada. ¿Por qué el total debe usar los mismos filtros?

## Pistas

No cargues todas las filas para paginarlas en JavaScript. FRONTEND_ORIGIN incluye protocolo y puerto, sin rutas.

## Documentación

- [Paginación Prisma](https://www.prisma.io/docs/orm/prisma-client/queries/pagination)
- [cors](https://github.com/expressjs/cors)

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

[Volver al README](../README.md) · [Reto 14](14-historial.md) · [Reto 16](16-sala-dos-jugadores.md)
