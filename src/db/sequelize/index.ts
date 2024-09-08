import {Sequelize} from 'sequelize';
import {
  initAreaSeq, initArticleAreaSeq, initArticleInstructSeq, initArticleMaterialsSeq, initArticleSeq, initArticleSizesSeq, initArticleVariantSeq,
  initArticleAssocs
} from './article';
import {
  initAddressSeq, initCommentSeq, initUserAssoc, initUserMeasuresSeq, initUserSeq
} from './user';
import {initCartAssoc, initCartLineSeq, initCartSeq, initShippingSeq
} from './cart';

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
  initUserAssoc();

  // Cart block
  initCartSeq(seqConn);
  initCartLineSeq(seqConn);
  initShippingSeq(seqConn);
  // initCartAssoc();
}

async function initDb () {
  const adminSeqConn = new Sequelize({
    dialect: 'mariadb',
    port: 3023,
    database: 'lionmiss',
    username: 'lionmiss-admin',
    password: '1234qwerty'
  });
  initSchema(adminSeqConn);
  await adminSeqConn.sync();
  adminSeqConn.close();
}

async function getConn () {
  if (!seqConn) {
    seqConn = new Sequelize({
      dialect: 'mariadb',
      port: 3023,
      database: 'lionmiss',
      username: 'lionmiss-admin',
      password: '1234qwerty'
    });
  }
  return seqConn;
}

async function init () {
  try {
    initDb();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error(
      'Unable to connect to the database:',
      error
    );
  }
}

init();
