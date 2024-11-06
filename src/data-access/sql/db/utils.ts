import {
  Connection, createConnection, createPool, PoolConnection
} from 'mariadb';

const {
  ENV,
  DB,
  USER,
  PASS_USER,
  HOST_MARIA,
  PORT_MARIA,
  DB_CONN_LIMIT
} = process.env;

let conn: Connection | PoolConnection;

const genConf = {
  host: HOST_MARIA,
  port: Number(PORT_MARIA),
  user: USER,
  pass: PASS_USER,
  database: DB
};

async function createConn () {
  return await createConnection({ ...genConf });
}

function createPoolDb () {
  return createPool({
    ...genConf,
    connectionLimit: Number(DB_CONN_LIMIT)
  });
}

async function getConn (): Promise<Connection | PoolConnection> {
  if (!conn && ENV == 'prod') {
    conn = await createPoolDb().getConnection();
  } else if (!conn && ENV == 'dev') {
    conn = await createConn();
  }
  return conn;
}

export {
  createConn, createPoolDb, getConn
};
