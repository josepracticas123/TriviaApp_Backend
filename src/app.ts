import express from "express";
// Importa las preguntas desde el archivo de datos.
import { preguntas } from "./data/questions.js";

// Configura la aplicación. Abrir el puerto es responsabilidad de server.ts.

export const app = express();

// Convierte los cuerpos JSON de las peticiones en datos disponibles en req.body.

app.use(express.json());

// Ruta de bienvenida de la aplicación.

app.get("/", (_req, res) => {
  res.json({ message: "Bienvenido a TriviaApp Backend" });
});

// Comprueba que el servidor está disponible.
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Ruta para obtener todas las preguntas públicas (sin la respuesta correcta).
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
  if (!/^\d+$/.test(idTexto)) { // Verifica si el ID es un número válido.

    return res.status(400).json({ error: "El ID debe ser un número válido" });// Si no es un número válido, devuelve un error 400.
  }
  const id = Number(idTexto); // Convierte el ID a número.
  const pregunta = preguntas.find((pregunta) => pregunta.id === id); // Busca la pregunta con el ID especificado.
  // Si no se encuentra la pregunta, devuelve un error 404.
  if (!pregunta) {
    return res.status(404).json({
      error: "Pregunta no encontrada"
    });    
  }
  // Devuelve la pregunta encontrada (sin la respuesta correcta) como respuesta JSON.
  return res.json({
      id: pregunta.id,
      enunciado: pregunta.enunciado,
      opciones: pregunta.opciones,
    });
});