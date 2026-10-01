# Pruebas

Las comprobaciones manuales de cada reto se anotan en su enunciado y en el PR.

Desde los retos de autenticación y partidas añadiremos pruebas automatizadas para reglas importantes: acceso a datos ajenos, respuestas duplicadas, concurrencia y puntuación. La herramienta se escogerá en ese momento; aún no hay `npm test`.

Las pruebas usarán una base de datos de pruebas independiente. Nunca ejecutes pruebas destructivas contra producción.
