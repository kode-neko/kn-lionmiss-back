import swaggerJsdoc from 'swagger-jsdoc';

const { HOST_API, PORT_API } = process.env;

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'LionMiss API Rest',
    version: '1.0.0',
    description: 'API doc for the online shop LionMiss. Sorry for the mistakes. This deployment has no auth system, but the app is concived to support session & jwt.'
  },
  servers: [
    { url: `http://${HOST_API}:${PORT_API}` }
  ]
};

const opts = {
  swaggerDefinition,
  apis: ['./src/api/express/swagger/docs/model/**/*.yaml', './src/api/express/routers/*.ts']
};

const swaggerSpec = swaggerJsdoc(opts);

export default swaggerSpec;
