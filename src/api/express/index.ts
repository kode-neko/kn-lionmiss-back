import express from 'express';
import {
  articleRouter,
  shippingRouter,
  userRouter
} from './routers';

// Env bars
const {HOST_API, PORT_API} = process.env;

// Create server app...
const app = express();

// Middlewares
app.use(express.json());

// Routers
app.use(articleRouter);
app.use(shippingRouter);
app.use(userRouter);

// Error management
app.use(function (req, res) {
  throw new Error('BROKEN');
});

// Launch server
console.log(`Launch server in ${HOST_API}:${PORT_API}`);
try {
  app.listen(
    Number(PORT_API),
    HOST_API as string,
    () => console.log(`Express server up in ${HOST_API}:${PORT_API}`)
  );
} catch (err) {
  console.log(`Express error connect server: ${err}`);
}

