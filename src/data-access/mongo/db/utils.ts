
import { Db, MongoClient } from 'mongodb';

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
  if (client) return;
  client = ENV === 'dev'
    ? await createClient()
    : await createClientPool();
  db = client.db(DB);
}

function getConnMongo (): [MongoClient, Db] {
  return [
    client,
    db
  ];
}

export {
  createConnMongo,
  getConnMongo
};
