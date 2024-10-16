import {
  Article, Area, ArticleArea
} from '@model/index';
import { IModelDBArticleArea } from '../../interfaces';
import { IArticleAreaMongoose } from '../db';
import { Types } from 'mongoose';
import AreaMongooseModelDB from './AreaMongooseModelDB';

class ArticleAreaMongooseModelDB {

  private static instance: IModelDBArticleArea;

  public static getIntance (): IModelDBArticleArea {
    if (!ArticleAreaMongooseModelDB.instance) {
      ArticleAreaMongooseModelDB.instance = new ArticleAreaMongooseModelDB();
    }
    return ArticleAreaMongooseModelDB.instance;
  }

  private constructor () {

  }

  public static parseArticleAreaToMongo (articleArea: ArticleArea, idArticle: string): IArticleAreaMongoose {
    return {
      _id: new Types.ObjectId(articleArea.id),
      title: articleArea.title,
      article: new Types.ObjectId(idArticle),
      desc: articleArea.desc,
      price: articleArea.price,
      tax: articleArea.tax,
      area: AreaMongooseModelDB.parseAreaToMongo(articleArea.area)
    };
  }

  public static parseMongoToArticleArea (articleAreaMongo: IArticleAreaMongoose): ArticleArea {
    return {
      id: articleAreaMongo._id?.toString(),
      title: articleAreaMongo.title,
      desc: articleAreaMongo.desc,
      price: articleAreaMongo.price,
      tax: articleAreaMongo.tax,
      area: AreaMongooseModelDB.parseMongoToArea(articleAreaMongo.area)
    };
  }

}

export default ArticleAreaMongooseModelDB;
