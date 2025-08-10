const path = require('path');
const SwaggerDoc = require("swagger-jsdoc");
const SwaggerUi = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "MoboLap Platform Api",
    version: "0.1",
    description: "This Is MoboLap Platform Api Documentation",
  },
  servers: [
    {
      url: "http://localhost:5500",
      description: "Local server"
    },
  ],
};

const options = {
  swaggerDefinition,
  // Using path.join to ensure correct path resolution
  apis: [path.join(__dirname, "../modules/**/*.routes.js")], // or *.routes.* if extension varies
};

const swaggerSpec = SwaggerDoc(options);

// Export a function to setup Swagger UI
module.exports = (app) => {
  // Swagger UI route
  app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(swaggerSpec));
  
  // Optionally expose the spec as JSON
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};