const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Retail API',
      version: '1.0.0',
      description: 'API documentation for the Retail Management System',
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
  },
  apis: ['./routes/*.js'], // looks for docs in your route files
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
