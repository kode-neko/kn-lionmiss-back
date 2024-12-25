import express from 'express';
import {
  articleRouter,
  cartRouter,
  shippingRouter,
  userRouter
} from './routers';
import cors from 'cors';
import helmet from 'helmet';
import { xss } from 'express-xss-sanitizer';
import { chkAuthMid, errorMid } from './middlewares';
import { Server } from 'http';

function initExpress (okCallback: () => void): Server {
  // Env bars
  const { HOST_API, PORT_API } = process.env;

  // Create server app...
  const app = express();
  app.use(express.json());

  // Security
  app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  }));
  app.use(helmet());
  app.use(xss());
  app.disable('x-powered-by');

  // Routers
  app.use(userRouter);
  app.use(chkAuthMid); // el resto de rutas necesitan autenticación
  app.use(articleRouter);
  app.use(cartRouter);
  app.use(shippingRouter);

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
