import { Db, MongoClient } from 'mongodb';

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

let client: MongoClient;
let db: Db;

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

async function createConn () {
  if (conn) return;
  conn = await ENV === 'dev'
    ? createClient()
    : createClientPool();
  db = conn.db(DB);
}

function getClientDb (): [MongoClient, Db] {
  return [
    client,
    db
  ];
}

export { createConn, getClientDb };
