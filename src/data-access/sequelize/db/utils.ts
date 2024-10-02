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
import { Sequelize } from 'sequelize';

let seqConn: Sequelize;

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
  DB,
  USER_ADMIN,
  USER,
  PASS_USER_ADMIN,
  PASS_USER,
  HOST_MARIA,
  PORT_MARIA
} = process.env;

async function initDbSeq () {
  const adminSeqConn = new Sequelize({
    dialect: 'mariadb',
    host: HOST_MARIA,
    port: Number(PORT_MARIA),
    database: DB,
    username: USER_ADMIN,
    password: PASS_USER_ADMIN
  });
  initSchema(adminSeqConn);
  await adminSeqConn.sync();
  adminSeqConn.close();
}

async function getConnSeq () {
  if (!seqConn) {
    seqConn = new Sequelize({
      dialect: 'mariadb',
      host: HOST_MARIA,
      port: Number(PORT_MARIA),
      database: DB,
      username: USER,
      password: PASS_USER
    });
  }
  return seqConn;
}

export {
  initDbSeq,
  getConnSeq
};
