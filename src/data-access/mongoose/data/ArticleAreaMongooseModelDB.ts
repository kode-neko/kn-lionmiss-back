import { ArticleArea, Area } from '@model/index';
import { IArticleAreaMongoose } from '../db';
import { Types } from 'mongoose';
import AreaMongooseModelDB from './AreaMongooseModelDB';

class ArticleAreaMongooseModelDB {

  private static instance: ArticleAreaMongooseModelDB;

  public static getIntance (): ArticleAreaMongooseModelDB {
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
      area: articleArea.area.name
    };
  }

  public static async parseMongoToArticleArea (articleAreaMongo: IArticleAreaMongoose): Promise<ArticleArea> {
    const area = (await AreaMongooseModelDB.getIntance().readByProps({ name: articleAreaMongo.area })) as Area;
    return {
      id: articleAreaMongo._id?.toString(),
      title: articleAreaMongo.title,
      desc: articleAreaMongo.desc,
      price: articleAreaMongo.price,
      tax: articleAreaMongo.tax,
      area
    };
  }

}

export default ArticleAreaMongooseModelDB;
