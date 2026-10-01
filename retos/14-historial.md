# 14 · Consulta tu historial

**Tu misión:** Recupera las partidas y sus resultados después de cerrar el navegador o reiniciar el servidor. Cada usuario verá solo su historial.

**Antes:** El [reto 13](13-partida-individual.md) debe estar aprobado e integrado en develop.

**Aprenderás:** Consultas por usuario, selección de campos y ordenación.

## Trabajo por bloques

1. Añade GET /api/me/games con partidas, estado, fechas y puntuación, ordenadas de más reciente a más antigua.

2. Devuelve el detalle de una partida propia con su progreso y resultado; las preguntas pendientes siguen ocultando la solución.

3. Añade una comprobación automatizada de acceso ajeno con la herramienta que acordéis y una DB de pruebas separada. Documenta cómo ejecutarla.

## Comprueba tu entrega

- [ ] Dos usuarios tienen historiales separados; alterar un ID no da acceso a datos ajenos.
- [ ] Reiniciar el backend conserva partidas, respuestas y resultados.
- [ ] Una partida iniciada puede recuperarse y continuarse en la pregunta pendiente.
- [ ] Historial y detalle usan campos explícitos sin credenciales ni soluciones pendientes.
- [ ] La prueba automatizada de autorización falla si se elimina el control de participante y pasa con el control.
- [ ] `npm run typecheck` y `npm run build` pasan; he comprobado que lo anterior sigue funcionando.
- [ ] He actualizado `APRENDIZAJE.md`, anotado las pruebas y abierto el PR hacia `develop` sin hacer merge.

## Demostración al tutor

Enseña dos usuarios con distintas partidas. ¿Por qué filtrar en el frontend no protege el historial?

## Pistas

El usuario del filtro sale de la sesión validada, no de un userId arbitrario en el query.

## Documentación

- [Filtrado y ordenación de Prisma](https://www.prisma.io/docs/orm/prisma-client/queries/filtering-and-sorting)

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

[Volver al README](../README.md) · [Reto 13](13-partida-individual.md) · [Reto 15](15-filtros-paginacion-cors.md)
