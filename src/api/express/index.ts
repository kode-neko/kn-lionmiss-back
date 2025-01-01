import express from 'express';
import {
  areaRouter,
  articleRouter,
  cartRouter,
  commentRouter,
  shippingRouter,
  userRouter
} from './routers';
import cors from 'cors';
import helmet from 'helmet';
import { xss } from 'express-xss-sanitizer';
import { chkAuthMid, errorMid } from './middlewares';
import { Server } from 'http';
import session from 'express-session';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../../docs';

function initExpress (okCallback: () => void): Server {
  // Env bars
  const {
    AUTH_SYS, KEY_SECRET, HOST_API, PORT_API
  } = process.env;

  // Create server app...
  const app = express();
  app.use(express.json());

  // Security
  /*
  app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  }));
  */
  app.use(helmet());
  app.use(xss());
  app.disable('x-powered-by');

  // Session
  if (AUTH_SYS === 'session') {
    app.use(session({
      secret: KEY_SECRET as string,
      saveUninitialized: false,
      cookie: {}
    }));
  }
  app.use(express.json());

  // Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Routers
  app.use('/user', userRouter);
  app.use(chkAuthMid); // el resto de rutas necesitan autenticación
  app.use('/area', areaRouter);
  app.use('/article', articleRouter);
  app.use('/comment', commentRouter);
  app.use('/cart', cartRouter);
  app.use('/shipping', shippingRouter);

  // Error management
  app.use(errorMid);

  // Launch server
  return app.listen(
    Number(PORT_API),
    HOST_API as string,
    okCallback
  );
}

export { initExpress };
