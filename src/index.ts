import { initExpress } from './api';
import { createConn } from './data-access';

// Env bars
const {
  HOST_API, PORT_API, PORT_MONGO
} = process.env;

// Msgs
const msgOkDb = `🗃️ DB server up in ${HOST_API}:${PORT_MONGO}`;
const msgOkServer = `🚀 Express server up in ${HOST_API}:${PORT_API}`;
const msgErr = (err) => `💥 There was a problem:\n${err}`;

// Init App
function initApp () {
  createConn()
    .then(async () => {
      console.log(msgOkDb);
      initExpress(() => console.log(msgOkServer));
    })
    .catch((err) => console.log(msgErr(err)));
}

initApp();
