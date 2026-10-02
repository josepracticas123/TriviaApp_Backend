
import swaggerJSDoc from "swagger-jsdoc";

// Configuración básica de OpenAPI que describe nuestra API.
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Trivia App API",
    version: "1.0.0",
    description: "Documentación de la API de Trivia App",
  },
};

// swagger-jsdoc generará el documento OpenAPI a partir de esta configuración
// y de los comentarios de documentación que añadiremos a las rutas.
export const swaggerSpec = swaggerJSDoc({
  definition: swaggerDefinition,
  apis: ["./src/app.ts"],
});