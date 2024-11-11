/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Connection,
  createConnection,
  createPool,
  PoolConnection
} from 'mariadb';
import { IModelDBType } from '../../interfaces';
import {
  AreaSqlModelDB,
  ArticleAreaSqlModelDB,
  ArticleSqlModelDB,
  CartSqlModelDB,
  CommentSqlModelDB,
  ShippingSqlModelDB,
  UserSqlModelDB
} from '../data';

const {
  ENV,
  DB,
  USER,
  PASS_USER,
  HOST_MARIA,
  PORT_MARIA,
  DB_POOL_MIN,
  DB_POOL
} = process.env;

let conn: Connection | PoolConnection;

const genConf = {
  host: HOST_MARIA,
  port: Number(PORT_MARIA),
  user: USER,
  pass: PASS_USER,
  database: DB
};

async function createConn (): Promise<Connection> {
  return await createConnection({ ...genConf });
}

async function createPoolConn (): Promise<PoolConnection> {
  return await createPool({
    ...genConf,
    minimumIdle: Number(DB_POOL_MIN),
    connectionLimit: Number(DB_POOL)
  }).getConnection();
}

async function createConnSql (): Promise<void> {
  if (!conn && ENV == 'prod') {
    conn = await createPoolConn();
  } else if (!conn && ENV == 'dev') {
    conn = await createConn();
  }
}

function getConnSql (): Connection | PoolConnection {
  return conn;
}

function getModelSql (modelName: string): IModelDBType {
  const AreaSqlModel = AreaSqlModelDB;
  const ArticleAreaSqlModel = ArticleAreaSqlModelDB;
  const ArticleSqlModel = ArticleSqlModelDB;
  const CartSqlModel = CartSqlModelDB;
  const CommentSqlModel = CommentSqlModelDB;
  const ShippingSqlModel = ShippingSqlModelDB;
  const UserSqlModel = UserSqlModelDB;

  return eval(`${modelName}SqlModel`).getInstance();
}

export {
  createConnSql,
  getConnSql,
  getModelSql
};
