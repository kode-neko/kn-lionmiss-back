import { connect, Mongoose } from 'mongoose';
import { IModelDBType } from '../../interfaces';
import {
  AreaMongooseModelDB,
  ArticleAreaMongooseModelDB,
  ArticleMongooseModelDB,
  CartMongooseModelDB,
  CommentMongooseModelDB,
  ShippingMongooseModelDB,
  UserMongooseModelDB
} from '../data';

const {
  DB,
  USER,
  PASS_USER,
  HOST_MONGO,
  PORT_MONGO,
  DB_POOL_MIN,
  DB_POOL
} = process.env;

let mongoose: Mongoose;

async function createConnMongoose (): Promise<Mongoose> {
  if (mongoose) return mongoose;
  try {
    const urlConnect = `mongodb://${USER}:${PASS_USER}@${HOST_MONGO}:${PORT_MONGO}/${DB}?authSource=${DB}`;
    mongoose = await connect(urlConnect, { minPoolSize: Number(DB_POOL_MIN), maxPoolSize: Number(DB_POOL) });
    console.log(`Connected to Mongo server ${HOST_MONGO}:${PORT_MONGO}`);
  } catch (err) {
    console.log(err);
  }
  return mongoose;
}

function getConnMongoose (): Mongoose {
  return mongoose;
}

function getClassMongoose (className: string): IModelDBType {
  return eval('new ' + className + 'MongooseModelDB();');
}

export {
  createConnMongoose,
  getConnMongoose,
  getClassMongoose
};
