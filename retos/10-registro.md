# 10 · Registra usuarios

**Tu misión:** Permite crear una cuenta con email y contraseña. Guarda un hash de la contraseña y devuelve únicamente los datos públicos del usuario.

**Antes:** El [reto 09](09-relaciones.md) debe estar aprobado e integrado en develop.

**Aprenderás:** Modelo User, unicidad, normalización y hash con Argon2.

## Trabajo por bloques

1. Instala argon2. Crea User con ID, email único, passwordHash y fecha de creación mediante una migración.

2. POST /api/auth/register recibe email y contraseña: normaliza el email con trim y minúsculas y exige contraseña de al menos 8 caracteres. No recortes ni cambies la contraseña.

3. Devuelve 201 con id y email. Maneja email duplicado como 409, incluso si dos registros llegan a la vez. Documenta la ruta.

## Comprueba tu entrega

- [ ] Un registro válido guarda un usuario y un hash, nunca la contraseña original.
- [ ] Email inválido, contraseña corta y campos inesperados se rechazan con 400.
- [ ] El email normalizado tiene restricción única en la DB y un duplicado da 409.
- [ ] Ninguna respuesta o log incluye contraseña o passwordHash.
- [ ] Puedo mostrar registro válido, inválido y duplicado desde Swagger.
- [ ] `npm run typecheck` y `npm run build` pasan; he comprobado que lo anterior sigue funcionando.
- [ ] He actualizado `APRENDIZAJE.md`, anotado las pruebas y abierto el PR hacia `develop` sin hacer merge.

## Demostración al tutor

¿Qué diferencia hay entre hacer un hash y cifrar? ¿Por qué comprobar el email antes del INSERT no basta para evitar duplicados?

## Pistas

La librería genera la sal. No implementes tu propio algoritmo y no uses hashes rápidos como SHA-256 para contraseñas.

## Documentación

- [node-argon2](https://github.com/ranisalt/node-argon2)

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

[Volver al README](../README.md) · [Reto 09](09-relaciones.md) · [Reto 11](11-login-jwt.md)
