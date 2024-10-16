import { Article, SearchParams } from '@model/index';
import { Types } from 'mongoose';
import { IModelDB } from '../../interfaces';
import { ArticleModelMongoose, IArticleMongoose } from '../db';
import { NotFoundDbException } from '../../error';

class ArticleMongooseModelDB implements IModelDB<Article> {

  private static instance: IModelDB<Article>;

  public static getIntance (): IModelDB<Article> {
    if (!ArticleMongooseModelDB.instance) {
      ArticleMongooseModelDB.instance = new ArticleMongooseModelDB();
    }
    return ArticleMongooseModelDB.instance;
  }

  private constructor () {

  }

  public static parseArticleToMongoose (article: Article): IArticleMongoose {
    return {
      _id: new Types.ObjectId(article.id),
      instructs: new Map(Object.entries(article.instructs)),
      sizes: new Map(Object.entries(article.sizes)),
      materials: new Map(Object.entries(article.materials)),
      tags: article.tags,
      variants: article.variants,
      discolor: article.discolor
    };
  }

  public static parseMongooseToArticle (mongo: IArticleMongoose): Article {
    return {
      id: mongo._id?.toString(),
      instructs: Object.fromEntries(mongo.instructs),
      sizes: Object.fromEntries(mongo.sizes),
      materials: Object.fromEntries(mongo.materials),
      tags: mongo.tags,
      variants: mongo.variants,
      discolor: mongo.discolor,
      articleAreaList: []
    };
  }

  read (id: string): Promise<Article> | NotFoundDbException {
    return ArticleModelMongoose
      .findById(id)
      .then((res) => {
        if (!res) throw new NotFoundDbException();
        return ArticleMongooseModelDB.parseMongooseToArticle(res as IArticleMongoose);
      });
  }

  readList ({ limit, skip }: SearchParams): Promise<Article[]> {
    return ArticleModelMongoose
      .find()
      .skip(skip)
      .limit(limit)
      .then((list) => list.map((e) => ArticleMongooseModelDB.parseMongooseToArticle(e as IArticleMongoose)));
  }

  create (obj: Article): Promise<Article> {
    return ArticleModelMongoose
      .create(ArticleMongooseModelDB.parseArticleToMongoose(obj))
      .then((res) => ArticleMongooseModelDB.parseMongooseToArticle(res));
  }

  update (obj: Article): Promise<void> | NotFoundDbException {
    const { _id, ...rest } = ArticleMongooseModelDB.parseArticleToMongoose(obj);
    return ArticleModelMongoose
      .updateOne({ _id }, rest)
      .then(({ modifiedCount }) => {
        if (modifiedCount === 0) throw new NotFoundDbException();
      });
  }

  delete (id: string): Promise<void> | NotFoundDbException {
    return ArticleModelMongoose
      .deleteMany({ _id: new Types.ObjectId(id) })
      .then(({ deletedCount }) => {
        if (deletedCount === 0) throw new NotFoundDbException();
      });
  }

}

export default ArticleMongooseModelDB;
