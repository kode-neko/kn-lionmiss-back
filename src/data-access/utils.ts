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
import { createConnMongo, getModelMongo as gmMongo } from './mongo/db/utils';
import { createConnMongoose, getModelMongoose as gmMongoose } from './mongoose/db/utils';
import { createConnSql, getModelSql as gmSql } from './sql/db/utils';
import { createConnSeq, getModelSeq as gmSeq } from './sequelize/db/utils';

type ModelType =
  IModelDBArea |
  IModelDBArticle |
  IModelDBArticleArea |
  IModelDBCart |
  IModelDBComment |
  IModelDBShipping |
  IModelDBUser;

const { DATA_ACCESS } = process.env;

async function createConn (): Promise<void> {
  switch (DATA_ACCESS) {
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
  return getClassModelDb('Area') as IModelDBArea;
}

function getArticle (): IModelDBArticle {
  return getClassModelDb('Article') as IModelDBArticle;
}

function getArticleArea (): IModelDBArticleArea {
  return getClassModelDb('ArticleArea') as IModelDBArticleArea;
}

function getCart (): IModelDBCart {
  return getClassModelDb('Cart') as IModelDBCart;
}

function getComment (): IModelDBComment {
  return getClassModelDb('Comment') as IModelDBComment;
}

function getShipping (): IModelDBShipping {
  return getClassModelDb('Shipping') as IModelDBShipping;
}

function getUser (): IModelDBUser {
  return getClassModelDb('User') as IModelDBUser;
}

function getClassModelDb (modelName: string): ModelType {
  const getModelMongo = gmMongo;
  const getModelMongoose = gmMongoose;
  const getModelSql = gmSql;
  const getModelSeq = gmSeq;

  const dataAccess = DATA_ACCESS as string;
  const dataAccessFirstUpper = dataAccess.replace(/^./, dataAccess[0].toUpperCase());
  return eval(`getModel${dataAccessFirstUpper}`)(modelName);
}

export {
  createConn,
  getArea,
  getArticle,
  getArticleArea,
  getCart,
  getComment,
  getShipping,
  getUser
};
