import {
  ModelDBAreaMongo, ModelDBArticleMongo, ModelDBCartMongo, ModelDBCommentMongo, ModelDBShippingMongo, ModelDBUserMongo
} from './mongo/data';
import { createConnMongo } from './mongo/db/utils';
import {
  ModelDBAreaSql, ModelDBArticleSql, ModelDBCartSql, ModelDBCommentSql, ModelDBShippingSql, ModelDBUserSql
} from './sql/data';

const DATA_ACCESS = process.env.DATA_ACCESS as string;

async function createConn (): Promise<void> {
  switch (DATA_ACCESS) {
    case 'mongo':
      await createConnMongo();
      break;
    default:
      await createConnMongo();
  }
}

const dataAccess = {
  mongo: {
    area: ModelDBAreaMongo,
    article: ModelDBArticleMongo,
    cart: ModelDBCartMongo,
    comment: ModelDBCommentMongo,
    shipping: ModelDBShippingMongo,
    user: ModelDBUserMongo
  },
  sql: {
    area: ModelDBAreaSql,
    article: ModelDBArticleSql,
    cart: ModelDBCartSql,
    comment: ModelDBCommentSql,
    shipping: ModelDBShippingSql,
    user: ModelDBUserSql
  }
};

const getArea = () => dataAccess[DATA_ACCESS]['area'];
const getArticle = () => dataAccess[DATA_ACCESS]['article'];
const getCart = () => dataAccess[DATA_ACCESS]['cart'];
const getComment = () => dataAccess[DATA_ACCESS]['comment'];
const getShipping = () => dataAccess[DATA_ACCESS]['shipping'];
const getUser = () => dataAccess[DATA_ACCESS]['user'];

export {
  createConn,
  getArea,
  getArticle,
  getCart,
  getComment,
  getShipping,
  getUser
};
