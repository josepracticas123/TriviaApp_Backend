import express from "express";

// Configura la aplicación. Abrir el puerto es responsabilidad de server.ts.
export const app = express();

// Convierte los cuerpos JSON de las peticiones en datos disponibles en req.body.
app.use(express.json());

// Ruta de bienvenida de la base. /health lo implementarás en el reto 01.
app.get("/", (_req, res) => {
  res.json({ message: "Bienvenido a TriviaApp Backend"  });
});
//Comprueba que el servidor está disponible.
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});
