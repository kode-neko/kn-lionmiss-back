import { default as IModelDB } from './IModelDB';
import { default as IModelDBArea } from './IModelDBArea';
import { default as IModelDBArticle } from './IModelDBArticle';
import { default as IModelDBCart } from './IModelDBCart';
import { default as IModelDBComment } from './IModelDBComment';
import { default as IModelDBShipping } from './IModelDBShipping';
import { default as IModelDBUser } from './IModelDBUser';

type IModelDBType =
  IModelDBArea |
  IModelDBArticle |
  IModelDBCart |
  IModelDBComment |
  IModelDBShipping |
  IModelDBUser;

export {
  IModelDB,
  IModelDBArea,
  IModelDBArticle,
  IModelDBCart,
  IModelDBComment,
  IModelDBShipping,
  IModelDBUser,
  IModelDBType
};
