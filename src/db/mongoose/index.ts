import {connect} from 'mongoose';

const {
  DB,
  USER,
  PASS_USER,
  HOST_MONGO,
  PORT_MONGO
} = process.env;

function initConnMongo () {
  connect(
    `mongodb://${USER}:${PASS_USER}@${HOST_MONGO}:${PORT_MONGO}`,
    {dbName: DB}
  ).
    then(async () => console.log(`Connected to Mongo server ${HOST_MONGO}:${PORT_MONGO}`)).
    catch((err) => console.log(err));
}

export {initConnMongo};
