# Base de datos · desde el reto 06

Aquí vivirán el esquema de Prisma, las migraciones y el seed. Por ahora no hay base de datos configurada.

Antes de instalar Prisma, el tutor y el alumno revisarán la guía vigente de PostgreSQL y elegirán versiones compatibles de CLI, cliente y adaptador. Registra las versiones y los comandos exactos; no copies configuraciones de otra versión.

- `schema.prisma`: modelos y relaciones.
- `migrations/`: historial de cambios de tablas; se guarda en Git.
- Seed: datos de práctica reproducibles, sin usuarios ni contraseñas de producción.

Prisma puede necesitar un archivo de configuración en la raíz y un cliente generado según la versión. Documenta sus rutas e ignora los archivos generados correspondientes.

`DATABASE_URL` se guarda en `.env`, nunca en el esquema ni en Git. Usa una DB de desarrollo independiente de producción. Las migraciones y la recuperación se trabajan en los retos 06 y 21.
