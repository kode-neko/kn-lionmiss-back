/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IModelDBArea,
  IModelDBArticle,
  IModelDBArticleArea,
  IModelDBCart,
  IModelDBComment,
  IModelDBShipping,
  IModelDBUser
} from './interfaces';
import { createConnMongo, getConnMongo } from './mongo/db/utils';
import { createConnMongoose, getConnMongoose } from './mongoose/db/utils';
import { createConnSql, getConnSql } from './sql/db/utils';
import { createConnSeq, getConnSeq } from './sequelize/db/utils';

type ModelType =
  IModelDBArea |
  IModelDBArticle |
  IModelDBArticleArea |
  IModelDBCart |
  IModelDBComment |
  IModelDBShipping |
  IModelDBUser;

const { MODEL_DATA } = process.env;

async function createConnection (): Promise<void> {
  switch (MODEL_DATA) {
    case 'mongo':
      await createConnMongo();
      break;
    case 'mongoose':
      await createConnMongoose();
      break;
    case 'sql':
      await createConnSql();
      break;
    case 'sequelize':
      await createConnSeq();
      break;
    default:
      await createConnMongo();
  }
}

function getArea (): IModelDBArea {
  return getClass('Area') as IModelDBArea;
}

function getArticle (): IModelDBArticle {
  return getClass('Article') as IModelDBArticle;
}

function getArticleArea (): IModelDBArticleArea {
  return getClass('ArticleArea') as IModelDBArticleArea;
}

function getCart (): IModelDBCart {
  return getClass('Cart') as IModelDBCart;
}

function getComment (): IModelDBComment {
  return getClass('Comment') as IModelDBComment;
}

function getShipping (): IModelDBShipping {
  return getClass('Shipping') as IModelDBShipping;
}

function getUser (): IModelDBUser {
  return getClass('User') as IModelDBUser;
}

function getClass (className: string): ModelType {
  return eval(`get${MODEL_DATA}`)(className);
}

export {
  createConnection,
  getArea,
  getArticle,
  getArticleArea,
  getCart,
  getComment,
  getShipping,
  getUser
};
