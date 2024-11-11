/* eslint-disable @typescript-eslint/no-unused-vars */
import { Db, MongoClient } from 'mongodb';
import { IModelDBType } from '../../interfaces';
import {
  AreaMongoModelDB,
  ArticleAreaMongoModelDB,
  ArticleMongoModelDB,
  CartMongoModelDB,
  CommentMongoModelDB,
  ShippingMongoModelDB,
  UserMongoModelDB
} from '../data';

let conn;

const {
  ENV,
  DB,
  USER,
  PASS_USER,
  HOST_MONGO,
  PORT_MONGO,
  DB_POOL,
  DB_POOL_MIN
} = process.env;

const urlConnect = `mongodb://${USER}:${PASS_USER}@${HOST_MONGO}:${PORT_MONGO}/${DB}?authSource=${DB}`;

let client: MongoClient;
let db: Db;

async function createClient (): Promise<MongoClient> {
  const client = new MongoClient(urlConnect);
  await client.connect();
  return client;
}

async function createClientPool (): Promise<MongoClient> {
  const client = new MongoClient(
    urlConnect,
    { minPoolSize: Number(DB_POOL_MIN), maxPoolSize: Number(DB_POOL) }
  );
  await client.connect();
  return client;
}

async function createConnMongo (): Promise<void> {
  if (conn) return;
  conn = await ENV === 'dev'
    ? createClient()
    : createClientPool();
  db = conn.db(DB);
}

function getConnMongo (): [MongoClient, Db] {
  return [
    client,
    db
  ];
}

function getModelMongo (modelName: string): IModelDBType {
  const AreaMongoModel = AreaMongoModelDB;
  const ArticleAreaMongoModel = ArticleAreaMongoModelDB;
  const ArticleMongoModel = ArticleMongoModelDB;
  const CartMongoModel = CartMongoModelDB;
  const CommentMongoModel = CommentMongoModelDB;
  const ShippingMongoModel = ShippingMongoModelDB;
  const UserMongoModel = UserMongoModelDB;

  return eval(`${modelName}MongoModel`).getIntance();
}

export {
  createConnMongo,
  getConnMongo,
  getModelMongo
};
