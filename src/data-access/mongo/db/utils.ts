import { MongoClient } from 'mongodb';

let conn;

const {
  ENV,
  DB,
  USER,
  PASS_USER,
  HOST_MONGO,
  PORT_MONGO
} = process.env;

const urlConnect = `mongodb://${USER}:${PASS_USER}@${HOST_MONGO}:${PORT_MONGO}/${DB}?authSource=${DB}`;

let client;
let db;

async function createClient () {
  const client = new MongoClient(urlConnect);
  await client.connect();
  return client;
}

async function createClientPool () {
  const client = new MongoClient(
    urlConnect,
    { minPoolSize: 2, maxPoolSize: 10 }
  );
  await client.connect();
  return client;
}

async function getClientDb () {
  if (conn) return [client,
    db];
  conn = await ENV === 'dev'
    ? createClient()
    : createClientPool();
  db = conn.db(DB);
}

export { getClientDb };
