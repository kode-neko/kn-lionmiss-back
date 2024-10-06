import { connect, Mongoose } from 'mongoose';

const {
  DB,
  USER,
  PASS_USER,
  HOST_MONGO,
  PORT_MONGO
} = process.env;

let mongoose: Mongoose;

async function initConnMongoose (): Promise<Mongoose> {
  if (mongoose) return mongoose;
  try {
    const urlConnect = `mongodb://${USER}:${PASS_USER}@${HOST_MONGO}:${PORT_MONGO}/${DB}?authSource=${DB}`;
    mongoose = await connect(urlConnect);
    console.log(`Connected to Mongo server ${HOST_MONGO}:${PORT_MONGO}`);
  } catch (err) {
    console.log(err);
  }

  return mongoose;
}

export { initConnMongoose };
