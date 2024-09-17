import express from 'express';

const {HOST_API, PORT_API} = process.env;
const app = express();

app.use(function (req, res) {
  throw new Error('BROKEN');
});

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

