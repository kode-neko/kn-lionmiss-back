import express, {
  NextFunction, Request, Response
} from 'express';
import {
  articleRouter,
  cartRouter,
  shippingRouter,
  userRouter
} from './routers';
import session from 'express-session';
import cors from 'cors';
import helmet from 'helmet';
import xss from 'express-xss-sanitizer';
import hpp from 'hpp';
import { chkAuthMid, errorMid } from './middlewares';
import { createConn } from '../../data-access';

// Env bars
const {
  HOST_API, PORT_API, AUTH_SYS, KEY_SECRET
} = process.env;

// Create server app...
const app = express();

// Security
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
}));
app.use(helmet());
app.use(xss());
app.use(hpp());
app.disable('x-powered-by');

// Middlewares
if (AUTH_SYS === 'session') {
  app.use(app.use(session({
    secret: KEY_SECRET,
    saveUninitialized: false,
    cookie: {}
  })));
}
app.use(express.json());

// Routers
app.use(userRouter);
app.use(chkAuthMid); // el resto de rutas necesitan autenticación
app.use(articleRouter);
app.use(cartRouter);
app.use(shippingRouter);

// Error management
app.use(errorMid);

// Launch server
createConn()
  .then(() => {
    app.listen(
      Number(PORT_API),
      HOST_API as string,
      () => console.log(`🚀 Express server up in ${HOST_API}:${PORT_API}`)
    );
  })
  .catch((err: Error) => `🔥 There was an error: ${err.message}`);

