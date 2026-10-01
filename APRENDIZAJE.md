# Mi cuaderno de backend

Escribe con tus palabras. No copies la documentación ni marques como comprendido algo que solo has utilizado. Las explicaciones se revisarán con el tutor; no sustituyen las pruebas funcionales.

En cada reto anota:

- Qué he construido y qué parte puedo explicar.
- Qué conceptos he usado por primera vez y qué significan.
- Una petición o acción válida y otra inválida: entrada, estado HTTP y resultado.
- Qué error tuve, por qué ocurrió y cómo lo resolví.
- Qué dudas quiero revisar con el tutor.
- PR de entrega y correcciones solicitadas.

## 01 · Arranca tu backend

- Lo que he construido: he añadido la ruta `GET /health`, que devuelve un JSON con `{ "status": "ok" }`. También he comprobado cómo se inicia el servidor desde `server.ts` y cómo `app.ts` configura Express y sus rutas.

- Conceptos y explicación propia: he aprendido la diferencia entre `app.ts` y `server.ts`. `app.ts` configura la aplicación Express y define las rutas, mientras que `server.ts` se encarga de leer y validar el puerto y abrir el servidor con `app.listen()`. También he usado variables de entorno mediante `process.env.PORT`. He entendido que `tsx` permite ejecutar TypeScript durante el desarrollo, mientras que `tsc` comprueba los tipos y genera JavaScript durante el build.

- Pruebas y resultados:
  - Prueba válida: `GET /health` en `http://localhost:3000/health` devuelve estado HTTP `200 OK` y `{"status":"ok"}`.
  - Prueba válida de configuración: cambié `PORT` a `4000` en `.env`, reinicié el servidor y comprobé que `/health` respondía correctamente en el puerto 4000.
  - Prueba inválida: cambié `PORT` a `hola`. El servidor no arrancó y mostró el error `PORT debe ser un número entero entre 1 y 65535`.
  - También comprobé que `npm run typecheck`, `npm run build` y `npm start` funcionan correctamente.

- Error y solución: al principio `npm run dev` no encontraba `tsx` porque las dependencias todavía no estaban instaladas. Lo solucioné ejecutando `npm install`. También aprendí que `.env` no se cargaba cuando todavía no existía y que, en ese caso, el servidor utilizaba el puerto 3000 por defecto. Finalmente comprobé que `.env` está ignorado por Git y que `.env.example` conserva los valores de ejemplo.

- Dudas: quiero revisar con el tutor la diferencia entre ejecutar TypeScript con `tsx` y comprobarlo/generarlo con `tsc`, y por qué es conveniente separar la configuración de Express de la apertura del puerto.

- PR y correcciones: PR del reto 01 hacia `develop`: pendiente de revisión. Correcciones solicitadas: pendientes.

## 02 · Devuelve preguntas

- Lo que he construido:
  - He creado la interfaz `Pregunta` con `id`, `enunciado`, `opciones` y `respuestaCorrecta`.
  - He creado una colección en memoria con 5 preguntas.
  - He creado `GET /api/questions` para listar las preguntas.
  - He creado `GET /api/questions/:id` para obtener una pregunta concreta.
  - Las respuestas públicas solo muestran `id`, `enunciado` y `opciones`, por lo que `respuestaCorrecta` no se expone.

- Conceptos y explicación propia:
  - Una `interface` define la estructura que debe tener un objeto.
  - `Pregunta[]` significa un array de elementos del tipo `Pregunta`.
  - Los parámetros de la URL llegan como texto (`string`), aunque el ID de nuestra pregunta es un `number`. Por eso primero valido el texto y después lo convierto con `Number()`.
  - `find()` busca una pregunta dentro del array y devuelve la pregunta encontrada o `undefined`.
  - `map()` crea un nuevo array transformando los elementos. Lo he utilizado para preparar una versión pública de las preguntas sin `respuestaCorrecta`.
  - `return` dentro de un `if` termina la ejecución de la ruta cuando se produce un error.
  - Los códigos `200`, `400` y `404` indican, respectivamente, respuesta correcta, petición incorrecta y recurso no encontrado.

- Pruebas y resultados:
  - `GET /api/questions` → 200 OK y devuelve las 5 preguntas.
  - `GET /api/questions/1` → 200 OK y devuelve la pregunta con ID 1.
  - `GET /api/questions/hola` → 400 y devuelve `"El ID debe ser un número válido"`.
  - `GET /api/questions/99` → 404 y devuelve `"Pregunta no encontrada"`.
  - Después de consultar una pregunta, `GET /api/questions` sigue devolviendo las 5 preguntas, por lo que la colección no se modifica.
  - `npm run typecheck` → correcto.
  - `npm run build` → correcto.

- Error y solución:
  - Al principio coloqué el `return res.json(...)` dentro del `if (!pregunta)`. Entendí que no debía estar ahí porque el `return` del error termina la función. La respuesta de la pregunta encontrada debe estar fuera del `if`.
  - También entendí que no se puede comparar directamente el ID numérico de la pregunta con el parámetro de la URL sin convertirlo, porque el parámetro llega como `string`.

- Dudas:
  - He entendido la diferencia entre `string` y `number` en los parámetros de una URL y cómo convertirlos.
  - También he entendido la diferencia entre `find()` para buscar un elemento y `map()` para crear un nuevo array a partir de los elementos existentes.

- PR y correcciones:
  - Pendiente de crear el commit, subir la rama y abrir la PR hacia `develop`.
  - La PR se dejará abierta para revisión del tutor y no se hará el merge manualmente.

## 03 · Modifica tus datos

- Lo que he construido: He añadido las operaciones POST, PUT y DELETE para crear, modificar y eliminar preguntas. También he añadido validaciones manuales y un contador para que los IDs no se reutilicen durante la ejecución del servidor.

- Conceptos y explicación propia: He aprendido que POST sirve para crear datos, PUT para sustituir los datos editables de una pregunta y DELETE para eliminarla. También he aprendido que los datos están almacenados en memoria, por lo que se pierden al reiniciar el servidor.

- Pruebas y resultados:
  - POST válido → 201 Created.
  - GET de la pregunta creada → 200 OK y sin mostrar `respuestaCorrecta`.
  - PUT válido → 200 OK.
  - PUT inválido → 400 y los datos no cambian.
  - DELETE válido → 204 No Content.
  - GET después de eliminar → 404 Not Found.
  - DELETE de un ID inexistente → 404 Not Found.
  - Al eliminar el ID 6 y crear otra pregunta, se asignó el ID 7.
  - Después de reiniciar el servidor, la pregunta creada desapareció y GET devolvió 404.
  - `npm run typecheck` → correcto.
  - `npm run build` → correcto.

- Error y solución: Al probar un POST, envié la petición sin body JSON y `req.body` era `undefined`. Lo solucioné seleccionando Body → JSON en Thunder Client y enviando los datos correctamente.

- Dudas: He entendido la diferencia entre los datos enviados en la URL y los datos enviados en el body. En DELETE el ID se envía en la URL y no hace falta body.

- PR y correcciones: Pendiente de abrir el PR hacia `develop` y de la revisión del tutor.

## 04 · Valida las peticiones

- Lo que he construido: pendiente.
- Conceptos y explicación propia: pendiente.
- Pruebas y resultados: pendiente.
- Error y solución: pendiente.
- Dudas: pendiente.
- PR y correcciones: pendiente.

## 05 · Prueba las rutas en Swagger

- Lo que he construido: pendiente.
- Conceptos y explicación propia: pendiente.
- Pruebas y resultados: pendiente.
- Error y solución: pendiente.
- Dudas: pendiente.
- PR y correcciones: pendiente.

## 06 · Prepara PostgreSQL y Prisma

- Lo que he construido: pendiente.
- Conceptos y explicación propia: pendiente.
- Pruebas y resultados: pendiente.
- Error y solución: pendiente.
- Dudas: pendiente.
- PR y correcciones: pendiente.

## 07 · Guarda las preguntas de verdad

- Lo que he construido: pendiente.
- Conceptos y explicación propia: pendiente.
- Pruebas y resultados: pendiente.
- Error y solución: pendiente.
- Dudas: pendiente.
- PR y correcciones: pendiente.

## 08 · Organiza el backend

- Lo que he construido: pendiente.
- Conceptos y explicación propia: pendiente.
- Pruebas y resultados: pendiente.
- Error y solución: pendiente.
- Dudas: pendiente.
- PR y correcciones: pendiente.

## 09 · Relaciona preguntas, opciones y categorías

- Lo que he construido: pendiente.
- Conceptos y explicación propia: pendiente.
- Pruebas y resultados: pendiente.
- Error y solución: pendiente.
- Dudas: pendiente.
- PR y correcciones: pendiente.

## 10 · Registra usuarios

- Lo que he construido: pendiente.
- Conceptos y explicación propia: pendiente.
- Pruebas y resultados: pendiente.
- Error y solución: pendiente.
- Dudas: pendiente.
- PR y correcciones: pendiente.

## 11 · Inicia sesión

- Lo que he construido: pendiente.
- Conceptos y explicación propia: pendiente.
- Pruebas y resultados: pendiente.
- Error y solución: pendiente.
- Dudas: pendiente.
- PR y correcciones: pendiente.

## 12 · Protege las rutas

- Lo que he construido: pendiente.
- Conceptos y explicación propia: pendiente.
- Pruebas y resultados: pendiente.
- Error y solución: pendiente.
- Dudas: pendiente.
- PR y correcciones: pendiente.

## 13 · Juega una partida individual

- Lo que he construido: pendiente.
- Conceptos y explicación propia: pendiente.
- Pruebas y resultados: pendiente.
- Error y solución: pendiente.
- Dudas: pendiente.
- PR y correcciones: pendiente.

## 14 · Consulta tu historial

- Lo que he construido: pendiente.
- Conceptos y explicación propia: pendiente.
- Pruebas y resultados: pendiente.
- Error y solución: pendiente.
- Dudas: pendiente.
- PR y correcciones: pendiente.

## 15 · Prepara las consultas del frontend

- Lo que he construido: pendiente.
- Conceptos y explicación propia: pendiente.
- Pruebas y resultados: pendiente.
- Error y solución: pendiente.
- Dudas: pendiente.
- PR y correcciones: pendiente.

## 16 · Crea una partida para dos

- Lo que he construido: pendiente.
- Conceptos y explicación propia: pendiente.
- Pruebas y resultados: pendiente.
- Error y solución: pendiente.
- Dudas: pendiente.
- PR y correcciones: pendiente.

## 17 · Juega por turnos mediante HTTP

- Lo que he construido: pendiente.
- Conceptos y explicación propia: pendiente.
- Pruebas y resultados: pendiente.
- Error y solución: pendiente.
- Dudas: pendiente.
- PR y correcciones: pendiente.

## 18 · Añade avisos en tiempo real

- Lo que he construido: pendiente.
- Conceptos y explicación propia: pendiente.
- Pruebas y resultados: pendiente.
- Error y solución: pendiente.
- Dudas: pendiente.
- PR y correcciones: pendiente.

## 19 · Recupera una partida al reconectar

- Lo que he construido: pendiente.
- Conceptos y explicación propia: pendiente.
- Pruebas y resultados: pendiente.
- Error y solución: pendiente.
- Dudas: pendiente.
- PR y correcciones: pendiente.

## 20 · Conecta un frontend mínimo

- Lo que he construido: pendiente.
- Conceptos y explicación propia: pendiente.
- Pruebas y resultados: pendiente.
- Error y solución: pendiente.
- Dudas: pendiente.
- PR y correcciones: pendiente.

## 21 · Despliega backend, DB y frontend

- Lo que he construido: pendiente.
- Conceptos y explicación propia: pendiente.
- Pruebas y resultados: pendiente.
- Error y solución: pendiente.
- Dudas: pendiente.
- PR y correcciones: pendiente.

## 22 · Entrega y revisión final

- Lo que he construido: pendiente.
- Conceptos y explicación propia: pendiente.
- Pruebas y resultados: pendiente.
- Error y solución: pendiente.
- Dudas: pendiente.
- PR y correcciones: pendiente.
