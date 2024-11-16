/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  initAreaSeq, initArticleAreaSeq, initArticleInstructSeq, initArticleMaterialsSeq, initArticleSeq, initArticleSizesSeq, initArticleVariantSeq,
  initArticleAssocs
} from './article';
import {
  initAddressSeq, initCommentSeq, initUserAssoc, initUserFavsSeq, initUserMeasuresSeq, initUserSeq
} from './user';
import {
  initCartAssoc, initCartLineSeq, initCartSeq, initShippingSeq
} from './cart';
import { Dialect, Sequelize } from 'sequelize';
import { IModelDBType } from '../../interfaces';
import {
  AreaSeqModelDB,
  ArticleAreaSeqModelDB,
  ArticleSeqModelDB,
  CartSeqModelDB,
  CommentSeqModelDB,
  ShippingSeqModelDB,
  UserSeqModelDB
} from '../data';

function initSchema (seqConn: Sequelize) {
  // Article blok
  initAreaSeq(seqConn);
  initArticleSeq(seqConn);
  initArticleInstructSeq(seqConn);
  initArticleAreaSeq(seqConn);
  initArticleMaterialsSeq(seqConn);
  initArticleSizesSeq(seqConn);
  initArticleVariantSeq(seqConn);
  initArticleAssocs();

  // User blok
  initUserMeasuresSeq(seqConn);
  initAddressSeq(seqConn);
  initUserSeq(seqConn);
  initCommentSeq(seqConn);
  initUserFavsSeq(seqConn);
  initUserAssoc();

  // Cart block
  initCartSeq(seqConn);
  initCartLineSeq(seqConn);
  initShippingSeq(seqConn);
  initCartAssoc();
}

const {
  ENV,
  DB,
  USER_ADMIN,
  USER,
  PASS_USER_ADMIN,
  PASS_USER,
  HOST_MARIA,
  PORT_MARIA
} = process.env;

let conn: Sequelize;

const genOpts = {
  dialect: 'mariadb' as Dialect,
  host: HOST_MARIA,
  port: Number(PORT_MARIA),
  database: DB,
  dialectOptions: { connectTimeout: 3000 }
};

const pollOpts = {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

const credAdmin = {
  username: USER_ADMIN,
  password: PASS_USER_ADMIN
};

const credUser = {
  username: USER,
  password: PASS_USER
};

function createConn (): Sequelize {
  return new Sequelize({ ...credUser, ...genOpts });
}

function createPool (): Sequelize {
  return new Sequelize({
    ...credUser,
    ...genOpts,
    ...pollOpts
  });
}

async function createConnSeq (): Promise<void> {
  if (conn) return;
  conn = await ENV === 'dev'
    ? createConn()
    : createPool();
}

function createConnAdminSeq () {
  return new Sequelize({ ...credAdmin, ...genOpts });
}

async function initSchemaSeq (): Promise<void> {
  const conAdmin = createConnAdminSeq();
  initSchema(conAdmin);
  await conn.sync();
}

function getConnSeq (): Sequelize {
  return conn;
}

function getModelSeq (modelName: string): IModelDBType {
  const AreaSeqModel = AreaSeqModelDB;
  const ArticleAreaSeqModel = ArticleAreaSeqModelDB;
  const ArticleSeqModel = ArticleSeqModelDB;
  const CartSeqModel = CartSeqModelDB;
  const CommentSeqModel = CommentSeqModelDB;
  const ShippingSeqModel = ShippingSeqModelDB;
  const UserSeqModel = UserSeqModelDB;

  return eval(`${modelName}ModelSeq`).getInstance();
}

export {
  createConnSeq,
  createConnAdminSeq,
  initSchemaSeq,
  getConnSeq,
  getModelSeq
};
