import {
  IModelDBArea, IModelDBArticle, IModelDBCart, IModelDBComment, IModelDBShipping, IModelDBUser
} from './interfaces';
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

const getArea: () => IModelDBArea = () => dataAccess[DATA_ACCESS]['area'].getInstance();
const getArticle: () => IModelDBArticle = () => dataAccess[DATA_ACCESS]['article'].getInstance();
const getCart: () => IModelDBCart = () => dataAccess[DATA_ACCESS]['cart'].getInstance();
const getComment: () => IModelDBComment = () => dataAccess[DATA_ACCESS]['comment'].getInstance();
const getShipping: () => IModelDBShipping = () => dataAccess[DATA_ACCESS]['shipping'].getInstance();
const getUser: () => IModelDBUser = () => dataAccess[DATA_ACCESS]['user'].getInstance();

export {
  createConn,
  getArea,
  getArticle,
  getCart,
  getComment,
  getShipping,
  getUser
};
