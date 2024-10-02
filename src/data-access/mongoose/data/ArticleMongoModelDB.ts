import { Article, SearchParams } from '@model/index';
import { Types } from 'mongoose';
import { IModelDB } from '../../interfaces';
import { ArticleModelMongo, IArticleMongo } from '../db';

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

  public static parseArticleToMongo (article: Article): IArticleMongo {
    return {
      _id: new Types.ObjectId(article.id),
      instructs: new Map(Object.entries(article.instructs)),
      sizes: new Map(Object.entries(article.sizes)),
      materials: new Map(Object.entries(article.materials)),
      tags: article.tags,
      discolor: article.discolor
    };
  }

  public static parseMongoToArticle (mongo: IArticleMongo): Article {
    return {
      id: mongo._id?.toString(),
      instructs: Object.fromEntries(mongo.instructs),
      sizes: Object.fromEntries(mongo.sizes),
      materials: Object.fromEntries(mongo.materials),
      tags: mongo.tags,
      discolor: mongo.discolor,
      articleAreaList: []
    };
  }

  read (id: string): Promise<Article> {
    return ArticleModelMongo.findById(id).then((res) => ArticleMongoModelDB.parseMongoToArticle(res as IArticleMongo));
  }

  readList ({ limit, skip }: SearchParams): Promise<Article[]> {
    return ArticleModelMongo
      .find()
      .skip(skip)
      .limit(limit)
      .then((list) => list.map((e) => ArticleMongoModelDB.parseMongoToArticle(e as IArticleMongo)));
  }

  create (obj: Article): Promise<Article> {
    return ArticleModelMongo.create(ArticleMongoModelDB.parseArticleToMongo(obj)).then((res) => ArticleMongoModelDB.parseMongoToArticle(res));
  }

  update (obj: Article): Promise<boolean> {
    const { _id, ...rest } = ArticleMongoModelDB.parseArticleToMongo(obj);
    return ArticleModelMongo
      .updateOne(
        { _id },
        rest
      )
      .then(({ modifiedCount }) => Boolean(modifiedCount));
  }

  delete (id: string): Promise<boolean> {
    return ArticleModelMongo
      .deleteOne({ _id: id })
      .then(({ deletedCount }) => Boolean(deletedCount));
  }

}

export default ArticleMongoModelDB;
