import { Model } from 'mongoose';
import { ArticleMongo, IArticleMongo } from '../../../mongoose';
import { articleSchema } from '../../../mongoose/schema';
import IModelDB from '../../IModelDB';
import {
  Article, SearchParams, ArticleArea
} from '@model/index';

type ArticleMongoModel = Model<typeof ArticleMongo>;

class ArticleMongoModelDB implements IModelDB<Article> {

  private static instance: IModelDB<Article>;

  public static getIntance (): IModelDB<Article> {
    if (!ArticleMongoModelDB.instance) {
      ArticleMongoModelDB.instance = new ArticleMongoModelDB();
    }
    return ArticleMongoModelDB.instance;
  }

  private constructor () {

  }

  public static parseArticleToSchema (article: Article): IArticleMongo {
    const { id, ...rest } = article;
    return {
      _id: id,
      ...rest,
      sizes: Object.entries(article.sizes),
      materials: Object.entries(article.materials),
      variants: Object.entries(article.variants),
      articleAreaList: []
    };
  }

  public static parseSchemaToArticle (mongo: IArticleMongo): Article {
    const { _id, ...rest } = mongo;
    return {
      id: _id,
      ...rest,
      sizes: Object.fromEntries(mongo.sizes),
      materials: Object.fromEntries(mongo.materials),
      variants: Object.fromEntries(mongo.variants),
      articleAreaList: []
    };
  }

  read (id: string): Promise<Article> {
    return ArticleMongo.findById(id);
  }

  readList ({ limit, skip }: SearchParams): Promise<Article[]> {
    return ArticleMongo.
      find().
      skip(skip).
      limit(limit);
  }

  create (obj: Article): Promise<Article> {
    return ArticleMongo.create(obj);
  }

  update (obj: Article): Promise<boolean> {
    return ArticleMongo.
      updateOne({ _id: obj.id }, obj).
      then(({ modifiedCount }) => Boolean(modifiedCount));
  }

  delete (id: string): Promise<boolean> {
    return ArticleMongo.
      deleteOne({ _id: id }).
      then(({ deletedCount }) => Boolean(deletedCount));
  }

}

export default ArticleMongoModelDB;
