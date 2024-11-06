import { createConnection, createPool } from 'mariadb';

const {
  ENV,
  DB,
  USER,
  PASS_USER,
  HOST_MARIA,
  PORT_MARIA,
  DB_CONN_LIMIT
} = process.env;

let conn;

const genConf = {
  host: HOST_MARIA,
  port: Number(PORT_MARIA),
  user: USER,
  pass: PASS_USER,
  database: DB
};

function createConn () {
  return createConnection({ ...genConf });
}

function createPoolDb () {
  return createPool({
    ...genConf,
    connectionLimit: Number(DB_CONN_LIMIT)
  });
}

function getConn () {
  if (!conn && ENV == 'prod') {
    conn = createPoolDb().getConnection();
  } else if (!conn && ENV == 'dev') {
    conn = createConn();
  }
  return conn;
}

export {
  createConn, createPoolDb, getConn
};
