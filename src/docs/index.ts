import swaggerJsdoc from 'swagger-jsdoc';

const { HOST_API, PORT_API } = process.env;

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'LionMiss',
    version: '1.0.0',
    description: 'API documentation for my Express application'
  },
  servers: [
    { url: `http://${HOST_API}:${PORT_API}` }
  ]
};

const opts = {
  swaggerDefinition,
  apis: ['./src/docs/model/**/*.yaml', './src/api/express/routers/*.ts']
};

const swaggerSpec = swaggerJsdoc(opts);

export default swaggerSpec;
