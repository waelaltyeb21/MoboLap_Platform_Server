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
    },
  ],
};

const Options = {
  swaggerDefinition,
  apis: ["../modules/**/*.routes"],
};

const SwaggerSpecs = SwaggerDoc(Options);

module.exports = { SwaggerUi, SwaggerSpecs };
