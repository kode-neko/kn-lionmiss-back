import {
  Article, ArticleArea, SearchParams
} from '@model/index';
import { Types } from 'mongoose';
import { IModelDB, IModelDBArticle } from '../../interfaces';
import {
  AreaModelMongoose,
  ArticleAreaModelMongoose, ArticleModelMongoose, IAreaMongoose, IArticleAreaMongoose, IArticleMongoose
} from '../db';
import { NotFoundDbException } from '../../error';
import ArticleAreaMongooseModelDB from './ArticleAreaMongooseModelDB';

class ArticleMongooseModelDB implements IModelDBArticle {

  private static instance: IModelDB<Article>;

  public static getIntance (): IModelDB<Article> {
    if (!ArticleMongooseModelDB.instance) {
      ArticleMongooseModelDB.instance = new ArticleMongooseModelDB();
    }
    return ArticleMongooseModelDB.instance;
  }

  private constructor () {

  }
  readInfoArea(idArticle: string, nameArea: string): Promise<ArticleArea> | NotFoundDbException {
    throw new Error('Method not implemented.');
  }
  createInfoArea(idArticle: string, articleArea: Exclude<ArticleArea, 'id'>): Promise<ArticleArea> {
    throw new Error('Method not implemented.');
  }

  public static parseArticleToMongoose (article: Article): IArticleMongoose {
    return {
      _id: new Types.ObjectId(article.id),
      instructs: new Map(Object.entries(article.instructs)),
      sizes: new Map(Object.entries(article.sizes)),
      materials: new Map(Object.entries(article.materials)),
      tags: article.tags,
      variants: article.variants,
      discolor: article.discolor,
      articleAreaList: article.articleAreaList.map(aa => new Types.ObjectId(aa.id))
    };
  }

  public static parseMongooseToArticle (mongo: IArticleMongoose, artAreaList: ArticleArea[]): Article {
    return {
      id: mongo._id?.toString(),
      instructs: Object.fromEntries(mongo.instructs),
      sizes: Object.fromEntries(mongo.sizes),
      materials: Object.fromEntries(mongo.materials),
      tags: mongo.tags,
      variants: mongo.variants,
      discolor: mongo.discolor,
      articleAreaList: artAreaList
    };
  }

  read (id: string): Promise<Article> | NotFoundDbException {
    return ArticleModelMongoose
      .findById(id)
      .then((res) => {
        if (!res) throw new NotFoundDbException();
        return ArticleMongooseModelDB.parseMongooseToArticle(res, []);
      });
  }

  readList ({ limit, skip }: SearchParams<Article>): Promise<Article[]> {
    return ArticleModelMongoose
      .find()
      .skip(skip)
      .limit(limit)
      .then((list) => list.map((a) => ArticleMongooseModelDB
        .parseMongooseToArticle(a, [])));
  }

  create (obj: Article): Promise<Article> {
    return ArticleModelMongoose
      .create(ArticleMongooseModelDB.parseArticleToMongoose(obj))
      .then((res) => ArticleMongooseModelDB.parseMongooseToArticle(res, []));
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
/*
  readInfoArea(idArticle: string, nameArea: string): Promise<ArticleArea> | NotFoundDbException {
    let artAreaMongooseList: IArticleAreaMongoose[];
    return ArticleModelMongoose
      .findById(idArticle)
      .then(res => {
        if (!res) throw new NotFoundDbException();
        return ArticleAreaModelMongoose.find({ _id: { $in: res.articleAreaList } });
      })
      .then(list => {
        artAreaMongooseList = list;
        const nameAreas = artAreaMongooseList.map(aa => aa.area);
        return AreaModelMongoose.find({ name: { $in: nameAreas } });
      })
      .then(list => artAreaMongooseList.map(aa =>
        ArticleAreaMongooseModelDB
          .parseMongooseToArticleArea(aa, list.find(a => a.name === aa.area) as IAreaMongoose)
      ))
  }

  createInfoArea (idArticle: string, articleArea: ArticleArea): Promise<ArticleArea> {
    const articleAreaMongoose = ArticleAreaMongooseModelDB.parseArticleAreaToMongoose(articleArea);
    return ArticleAreaModelMongoose
      .create(articleAreaMongoose)
      .then((res) => {
        return ArticleModelMongoose
          .updateOne(
            { _id: new Types.ObjectId(idArticle) },
            { $push: { articleArea: res._id } }
          );
      })
      .then(({ modifiedCount }) => {
        if (modifiedCount === 0) throw new NotFoundDbException('ArticleArea');
        return ArticleAreaMongooseModelDB.parseMongooseToArticleArea(articleAreaMongoose);
      });
  }
*/
}

export default ArticleMongooseModelDB;
