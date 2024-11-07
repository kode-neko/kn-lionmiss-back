/* eslint-disable @typescript-eslint/no-explicit-any */
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

async function createConnDb () {
  return await createConnection({ ...genConf });
}

function createPoolDb () {
  return createPool({
    ...genConf,
    connectionLimit: Number(DB_CONN_LIMIT)
  });
}

async function createConn () {
  if (!conn && ENV == 'prod') {
    conn = await createPoolDb().getConnection();
  } else if (!conn && ENV == 'dev') {
    conn = await createConnDb();
  }
  return conn;
}

function getConn (): Connection | PoolConnection {
  return conn;
}

function prepareValStatement (key: string, val: any): string {
  const res: string = '';
  if (typeof val === 'string' || val instanceof Date) val = `${key}='${val}'`;
  else if (typeof val === 'number') val = `${key}=${val}`;
  return res;
}

function parseObjToStrCrit (obj: any): string {
  const list = Object.entries(obj);
  const strList = list.map(([k,
    v]) => prepareValStatement(k, v));
  return strList.join(' AND ');
}

function prepareInsertStatement (obj: any): [string, string] {
  const keys = Object.keys(obj);
  const values = Object.entries(obj).map(([k,
    v]) => prepareValStatement(k, v));
  const keysStr = keys.join(',');
  const valuesStr = values.join(',');
  return [keysStr,
    valuesStr];
}

export {
  createConn,
  getConn,
  parseObjToStrCrit,
  prepareInsertStatement
};
