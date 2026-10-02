import express from "express";
// Importa las preguntas desde el archivo de datos.
import { preguntas } from "./data/questions.js";
// Importa el tipo Pregunta desde el archivo de tipos.
import type { Pregunta } from "./types/question.js";
// Importa el esquema de validación de preguntas desde el archivo de esquemas.
import { questionSchema } from "./schemas/question.schema.js";
// Importa el esquema de validación de ID de pregunta desde el archivo de esquemas.
import { questionIdSchema } from "./schemas/question-id.schema.js";
// Importa el middleware de manejo de errores de JSON desde el archivo de middlewares.
import { jsonErrorMiddleware } from "./middlewares/error.middleware.js";
// Importa el middleware de manejo de rutas no encontradas desde el archivo de middlewares.
import { notFoundMiddleware } from "./middlewares/error.middleware.js";
// Importa el middleware de manejo de errores internos desde el archivo de middlewares.
import { errorMiddleware } from "./middlewares/error.middleware.js";

// Configura la aplicación. Abrir el puerto es responsabilidad de server.ts.
export const app = express();

// Convierte los cuerpos JSON de las peticiones en datos disponibles en req.body.
app.use(express.json());

// Captura los errores producidos por un JSON mal formado.
app.use(jsonErrorMiddleware);

// Guarda el siguiente ID disponible para la nueva pregunta. Si no hay preguntas, el ID será 1.
let siguienteId =
  preguntas.length > 0
    ? Math.max(...preguntas.map((pregunta) => pregunta.id)) + 1
    : 1;
// Ruta de bienvenida de la aplicación.
app.get("/", (_req, res) => {
  res.json({ message: "Bienvenido a TriviaApp Backend" });
});

// Comprueba que el servidor está disponible.
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

//Ruta para obtener todas las preguntas públicas (sin la respuesta correcta).
app.get("/api/questions", (_req, res) => {
  const preguntasPublicas = preguntas.map((pregunta) => {
    // Devuelve solo los campos públicos de la pregunta, excluyendo la respuesta correcta.
    return {
      //Generamos un objeto nuevo con los campos públicos de la pregunta, excluyendo la respuesta correcta.
      id: pregunta.id,
      enunciado: pregunta.enunciado,
      opciones: pregunta.opciones,
    };
  });
  // Devuelve las preguntas públicas como respuesta JSON.
  res.json(preguntasPublicas); //
});
//////////////////////////////////
//GET
///////////////////////////////
// Ruta para obtener una pregunta específica por su ID (sin la respuesta correcta).
app.get("/api/questions/:id", (req, res) => {
  // Validamos los parámetros de la URL usando el esquema de Zod.
  const resultadoValidacion = questionIdSchema.safeParse(req.params);

  // Si el ID no cumple el esquema, devolvemos un error 400.
  if (!resultadoValidacion.success) {
    return res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Los datos enviados no son válidos",
      },
    });
  }

  // Usamos el ID que Zod ha validado.
  const id = Number(resultadoValidacion.data.id);
  const pregunta = preguntas.find((pregunta) => pregunta.id === id); // Busca la pregunta con el ID especificado.
  if (!pregunta) {
    // Si no existe una pregunta con ese ID, devolvemos un error 404.
    return res.status(404).json({
      error: {
        code: "QUESTION_NOT_FOUND",
        message: "Pregunta no encontrada",
      },
    });
  }
  // Devuelve la pregunta encontrada (sin la respuesta correcta) como respuesta JSON.
  return res.json({
    id: pregunta.id,
    enunciado: pregunta.enunciado,
    opciones: pregunta.opciones,
  });
});

///////////////////////////////
//POST
///////////////////////////////
// Crear una nueva pregunta.
app.post("/api/questions", (req, res) => {
  //Validamos el body de la petición usando el esquema de validación de preguntas.
  const resultadoValidacion = questionSchema.safeParse(req.body);
  //Si la validación falla, devolvemos un error 400 con un mensaje de error genérico.
  if (!resultadoValidacion.success) {
    return res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Los datos enviados no son válidos",
      },
    });
  }
  //Usamos los datos que zod nos devuelve tras la validación.
  const { enunciado, opciones, respuestaCorrecta } = resultadoValidacion.data;

  // Creamos un nuevo objeto de tipo Pregunta con los datos recibidos.
  const nuevaPregunta: Pregunta = {
    id: siguienteId++, // Asigna el siguiente ID disponible a la nueva pregunta.
    enunciado,
    opciones, // Utiliza las opciones limpias (sin espacios en blanco).
    respuestaCorrecta,
  };
  // Añadimos la nueva pregunta al array de preguntas.
  preguntas.push(nuevaPregunta);
  // Devolvemos la nueva pregunta como respuesta JSON.
  return res.status(201).json({
    id: nuevaPregunta.id,
    enunciado: nuevaPregunta.enunciado,
    opciones: nuevaPregunta.opciones,
  });
});
////////////////////////////////
//PUT
///////////////////////////////
// Editar una pregunta existente por su ID (sustituye enunciado, opciones y respuestaCorrecta).
app.put("/api/questions/:id", (req, res) => {
  // Validamos los parámetros de la URL usando el esquema de Zod.
  const resultadoValidacionId = questionIdSchema.safeParse(req.params);

  // Si el ID no cumple el esquema, devolvemos un error 400.
  if (!resultadoValidacionId.success) {
    return res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Los datos enviados no son válidos",
      },
    });
  }

  // Usamos el ID que Zod ha validado.
  const id = Number(resultadoValidacionId.data.id);
  // Busca la pregunta con el ID especificado.
  const pregunta = preguntas.find((pregunta) => pregunta.id === id);
  if (!pregunta) {
    // Si no se encuentra la pregunta, devuelve un error 404.
    return res.status(404).json({
      error: {
        code: "QUESTION_NOT_FOUND",
        message: "Pregunta no encontrada",
      },
    });
  }
  // Validamos el body de la petición usando el mismo esquema que usamos al crear preguntas.
  const resultadoValidacion = questionSchema.safeParse(req.body);

  // Si la validación falla, devolvemos un error 400 con un formato consistente.
  if (!resultadoValidacion.success) {
    return res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Los datos enviados no son válidos",
      },
    });
  }
  // Usamos únicamente los datos que Zod ha validado correctamente.
  const { enunciado, opciones, respuestaCorrecta } = resultadoValidacion.data;

  // Sustituye todos los campos editables de la pregunta (sin cambios parciales).
  pregunta.enunciado = enunciado;
  pregunta.opciones = opciones; // Sustituye las opciones con las opciones limpias (sin espacios en blanco).
  pregunta.respuestaCorrecta = respuestaCorrecta;
  // Devolvemos la pregunta actualizada sin revelar la respuesta correcta.
  return res.status(200).json({
    id: pregunta.id,
    enunciado: pregunta.enunciado, // Devuelve el enunciado actualizado de la pregunta.
    opciones: pregunta.opciones, // Devuelve las opciones actualizadas de la pregunta.
  });
});

////////////////////////////////
//DELETE
///////////////////////////////
// Eliminar una pregunta existente por su ID.
app.delete("/api/questions/:id", (req, res) => {
  // Validamos los parámetros de la URL usando el esquema de Zod.
  const resultadoValidacionId = questionIdSchema.safeParse(req.params);

  // Si el ID no cumple el esquema, devolvemos un error 400.
  if (!resultadoValidacionId.success) {
    return res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Los datos enviados no son válidos",
      },
    });
  }

  // Usamos el ID que Zod ha validado.
  const id = Number(resultadoValidacionId.data.id);
  //Busca la posición de la pregunta dentro del array de preguntas.
  const index = preguntas.findIndex((pregunta) => pregunta.id === id);
  if (index === -1) {
    // Si no se encuentra la pregunta, devuelve un error 404.
    return res.status(404).json({
      error: {
        code: "QUESTION_NOT_FOUND",
        message: "Pregunta no encontrada",
      },
    });
  }
  //Elimina la pregunta del array de preguntas usando la posición encontrada.
  preguntas.splice(index, 1);
  //Indica que la pregunta se ha eliminado correctamente.
  return res.status(204).send();
});

// Eliminar todas las preguntas existentes.
app.delete("/api/questions", (_req, res) => {
  // Elimina todas las preguntas del array de preguntas.
  preguntas.length = 0;

  return res.status(204).send();
});

// Si ninguna ruta anterior coincide con la petición, devolvemos un error 404.
app.use(notFoundMiddleware);
// Los errores inesperados no deben mostrar detalles internos al cliente, solo un mensaje genérico.
app.use(errorMiddleware);
