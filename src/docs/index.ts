import swaggerJsdoc from 'swagger-jsdoc';

const { HOST_API, PORT_API } = process.env;

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API Documentation',
    version: '1.0.0',
    description: 'API documentation for my Express application'
  },
  servers: [
    { url: `http://${HOST_API}/${PORT_API}` }
  ]
};

const opts = {
  swaggerDefinition,
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(opts);

export default swaggerSpec;
