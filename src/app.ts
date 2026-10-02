import express from "express";
// Importa las preguntas desde el archivo de datos.
import { preguntas } from "./data/questions.js";
// Importa el tipo Pregunta desde el archivo de tipos.
import type { Pregunta } from "./types/question.js";

// Configura la aplicación. Abrir el puerto es responsabilidad de server.ts.
export const app = express();

// Convierte los cuerpos JSON de las peticiones en datos disponibles en req.body.
app.use(express.json());
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

// Ruta para obtener una pregunta específica por su ID (sin la respuesta correcta).
app.get("/api/questions/:id", (req, res) => {
  const idTexto = req.params.id; // Obtiene el ID de la pregunta desde los parámetros de la URL.
  if (!/^\d+$/.test(idTexto)) {
    // Verifica si el ID es un número válido.

    return res.status(400).json({ error: "El ID debe ser un número válido" }); // Si no es un número válido, devuelve un error 400.
  }
  const id = Number(idTexto); // Convierte el ID a número.
  const pregunta = preguntas.find((pregunta) => pregunta.id === id); // Busca la pregunta con el ID especificado.
  // Si no se encuentra la pregunta, devuelve un error 404.
  if (!pregunta) {
    return res.status(404).json({
      error: "Pregunta no encontrada",
    });
  }
  // Devuelve la pregunta encontrada (sin la respuesta correcta) como respuesta JSON.
  return res.json({
    id: pregunta.id,
    enunciado: pregunta.enunciado,
    opciones: pregunta.opciones,
  });
});

//Crear una nueva pregunta
app.post("/api/questions", (req, res) => {
  // Comprobamos que el body existe y qu econtiene el formato de objeto
  //Evitamos que la API devuelva un error 500 si el body no es un objeto.
  if (
    typeof req.body !== "object" ||
    req.body === null ||
    Array.isArray(req.body)
  ) {
    return res.status(400).json({
      error: "El body de la petición debe ser un objeto JSON válido.",
    });
  }

  // Una vez comprobado que el body tiene el formato esperado,
  // podemos recoger los datos enviados por el cliente.
  const { enunciado, opciones, respuestaCorrecta } = req.body;
  //Comprueba que el enunciado sea un texto y no esté vacío.
  if (typeof enunciado !== "string" || enunciado.trim() === "") {
    // Si el enunciado no es un texto o está vacío, devuelve un error 400.
    return res.status(400).json({
      error: "El enunciado no puede estar vacío.",
    });
  }
  //Comprobamos que existen exactamente 4 opciones.
  if (!Array.isArray(opciones) || opciones.length !== 4) {
    // Si no hay exactamente 4 opciones, devuelve un error 400.
    return res.status(400).json({
      error: "Debe haber exactamente cuatro opciones.",
    });
  }
  //Comprobamos que las opciones sean textos y no estén vacías.
  if (!opciones.every((opcion) => typeof opcion === "string")) {
    // Si alguna opción no es un texto, devuelve un error 400.
    return res.status(400).json({
      error: "Todas las opciones deben ser textos.",
    });
  }
  //Comprobamos que ninguna de las opciones esté vacía.
  if (opciones.some((opcion) => opcion.trim() === "")) {
    // Si alguna opción está vacía, devuelve un error 400.
    return res.status(400).json({
      error: "Las opciones no pueden estar vacías.",
    });
  }
  //Quitamos los espacios en blanco al principio y al final de cada opción.
  const opcionesLimpias = opciones.map((opcion) => opcion.trim());
  //Comprobamos que no haya opciones duplicadas.
  if (new Set(opcionesLimpias).size !== 4) {
    // Si el tamaño del conjunto de opciones es diferente de 4, significa que hay duplicados.
    return res.status(400).json({
      error: "Las opciones no pueden estar duplicadas.",
    });
  }

  //Comprueba qu ela respuesta correcta sea un número y esté entre 0 y 3.
  if (
    typeof respuestaCorrecta !== "number" || // Verifica si la respuesta correcta es un número.
    !Number.isInteger(respuestaCorrecta) || // Verifica si la respuesta correcta es un número entero.
    respuestaCorrecta < 0 || // Verifica si la respuesta correcta es menor que 0.
    respuestaCorrecta > 3 // Verifica si la respuesta correcta es mayor que 3.
  ) {
    return res.status(400).json({
      error: "La respuesta correcta debe ser un número entero entre 0 y 3.",
    });
  }
  // Creamos un nuevo objeto de tipo Pregunta con los datos recibidos.
  const nuevaPregunta: Pregunta = {
    id: siguienteId++, // Asigna el siguiente ID disponible a la nueva pregunta.
    enunciado,
    opciones: opcionesLimpias, // Utiliza las opciones limpias (sin espacios en blanco).
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

// Editar una pregunta existente por su ID (sustituye enunciado, opciones y respuestaCorrecta).
app.put("/api/questions/:id", (req, res) => {
  // Obtiene el ID de la pregunta desde los parámetros de la URL.
  const idTexto = req.params.id;
  // Verifica si el ID es un número válido.
  if (!/^\d+$/.test(idTexto)) {
    return res.status(400).json({ error: "El ID debe ser un número válido" });
  }
  const id = Number(idTexto);
  // Busca la pregunta con el ID especificado.
  const pregunta = preguntas.find((pregunta) => pregunta.id === id);
  // Si no se encuentra la pregunta, devuelve un error 404.
  if (!pregunta) {
    return res.status(404).json({
      error: "Pregunta no encontrada",
    });
  }

  // Comprueba que el body existe y que contiene el formato de objeto.
  // Evita que la API devuelva un error 500 si el body no es un objeto.
  if (
    typeof req.body !== "object" ||
    req.body === null ||
    Array.isArray(req.body)
  ) {
    return res.status(400).json({
      error: "El body de la petición debe ser un objeto JSON válido.",
    });
  }

  // Una vez comprobado que el body tiene el formato esperado,
  // podemos recoger los datos enviados por el cliente.
  const { enunciado, opciones, respuestaCorrecta } = req.body;
  // Comprueba que el enunciado sea un texto y no esté vacío.
  if (typeof enunciado !== "string" || enunciado.trim() === "") {
    return res.status(400).json({
      error: "El enunciado no puede estar vacío.",
    });
  }
  // Comprueba que existan exactamente 4 opciones.
  if (!Array.isArray(opciones) || opciones.length !== 4) {
    return res.status(400).json({
      error: "Debe haber exactamente cuatro opciones.",
    });
  }
  //Comprobamos que las opciones sean textos y no estén vacías.
  //Esto evita errores al utilizar el método trim() en opciones que no sean textos.
  if (!opciones.every((opcion) => typeof opcion === "string")) {
    return res.status(400).json({
      error: "Todas las opciones deben ser textos.",
    });
  }
  // Comprueba que ninguna de las opciones esté vacía.
  if (opciones.some((opcion) => opcion.trim() === "")) {
    return res.status(400).json({
      error: "Las opciones no pueden estar vacías.",
    });
  }

  // Quitamos los espacios en blanco al principio y al final de cada opción.
  const opcionesLimpias = opciones.map((opcion) => opcion.trim());

  // Comprueba que no haya opciones duplicadas después de quitar los espacios.
  if (new Set(opcionesLimpias).size !== 4) {
    return res.status(400).json({
      error: "Las opciones no pueden estar duplicadas.",
    });
  }
  // Comprueba que la respuesta correcta sea un número entero entre 0 y 3.
  if (
    typeof respuestaCorrecta !== "number" ||
    !Number.isInteger(respuestaCorrecta) ||
    respuestaCorrecta < 0 ||
    respuestaCorrecta > 3
  ) {
    return res.status(400).json({
      error: "La respuesta correcta debe ser un número entero entre 0 y 3.",
    });
  }
  // Sustituye todos los campos editables de la pregunta (sin cambios parciales).
  pregunta.enunciado = enunciado;
  pregunta.opciones = opcionesLimpias; // Sustituye las opciones con las opciones limpias (sin espacios en blanco).
  pregunta.respuestaCorrecta = respuestaCorrecta;
  // Devolvemos la pregunta actualizada sin revelar la respuesta correcta.
  return res.status(200).json({
    id: pregunta.id,
    enunciado: pregunta.enunciado, // Devuelve el enunciado actualizado de la pregunta.
    opciones: pregunta.opciones, // Devuelve las opciones actualizadas de la pregunta.
  });
});

//Eliminar l apregunta existente por su ID.
app.delete("/api/questions/:id", (req, res) => {
  const idTexto = req.params.id; // Obtiene el ID de la pregunta desde los parámetros de la URL.
  if (!/^\d+$/.test(idTexto)) {
    // Verifica si el ID es un número válido.
    return res.status(400).json({ error: "El ID debe ser un número válido" });
  }
  const id = Number(idTexto); // Convierte el ID a número.
  //Busca la posición de la pregunta dentro del array de preguntas.
  const index = preguntas.findIndex((pregunta) => pregunta.id === id);
  if (index === -1) {
    // Si no se encuentra la pregunta, devuelve un error 404.
    return res.status(404).json({
      error: "Pregunta no encontrada",
    });
  }
  //Elimina la pregunta del array de preguntas usando la posición encontrada.
  preguntas.splice(index, 1);
  //Indica que la pregunta se ha eliminado correctamente.
  return res.status(204).send();
});
