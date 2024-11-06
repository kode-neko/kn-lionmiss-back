import {
  Article, ArticleArea, SearchParams
} from '@model/index';
import { Types } from 'mongoose';
import { IModelDBArticle } from '../../interfaces';
import {
  AreaModelMongoose,
  ArticleAreaModelMongoose,
  ArticleModelMongoose,
  IArticleMongoose
} from '../db';
import { IdRequiredDbException, NotFoundDbException } from '../../error';
import ArticleAreaMongooseModelDB from './ArticleAreaMongooseModelDB';

class ArticleMongooseModelDB implements IModelDBArticle {

  private static instance: IModelDBArticle;

  public static getIntance (): IModelDBArticle {
    if (!ArticleMongooseModelDB.instance) {
      ArticleMongooseModelDB.instance = new ArticleMongooseModelDB();
    }
    return ArticleMongooseModelDB.instance;
  }

  private constructor () {

  }

  public static parseArticleToMongoose (article: Article): IArticleMongoose {
    return {
      _id: new Types.ObjectId(article.id as string),
      instructs: new Map(Object.entries(article.instructs)),
      sizes: new Map(Object.entries(article.sizes)),
      materials: new Map(Object.entries(article.materials)),
      tags: article.tags,
      variants: article.variants,
      discolor: article.discolor,
      articleAreaList: article.articleAreaList.map((aa) => new Types.ObjectId(aa.id as string))
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
    if (!obj.id) throw new IdRequiredDbException();
    const { _id, ...rest } = ArticleMongooseModelDB.parseArticleToMongoose(obj);
    return ArticleModelMongoose
      .updateOne({ _id }, rest)
      .then(({ modifiedCount }) => {
        if (modifiedCount === 0) throw new NotFoundDbException();
      });
  }

  delete (id: string): Promise<void> | NotFoundDbException {
    return ArticleModelMongoose
      .deleteOne({ _id: new Types.ObjectId(id) })
      .then(({ deletedCount }) => {
        if (deletedCount === 0) throw new NotFoundDbException();
      });
  }

  readInfoArea (idArticle: string, nameArea: string): Promise<ArticleArea> | NotFoundDbException {
    return ArticleModelMongoose
      .aggregate([
        {
          $lookup: {
            from: 'articleArea',
            localField: 'articleArea',
            foreignField: '_id',
            as: 'articleArea'
          }
        },
        { $unwind: '$articleArea' },
        {
          $lookup: {
            from: 'area',
            localField: 'articleArea.area',
            foreignField: 'name',
            as: 'area'
          }
        },
        { $unwind: '$area' },
        { $match: { $and: [{ ['area.name']: nameArea, _id: new Types.ObjectId(idArticle) }] } }
      ])
      .then((list) => {
        if (list.length === 0) throw new NotFoundDbException('ArticleArea');
        const { articleArea, area } = list[0];
        return ArticleAreaMongooseModelDB.parseMongooseToArticleArea(articleArea, area);
      });
  }

  createInfoArea (idArticle: string, articleArea: ArticleArea): Promise<ArticleArea> {
    let areaMongoose;
    return AreaModelMongoose
      .find({ name: articleArea.area.name })
      .then((res) => {
        if (!res) throw new NotFoundDbException('Area');
        areaMongoose = res;
        return ArticleModelMongoose.findById(idArticle);
      })
      .then((res) => {
        if (!res) throw new NotFoundDbException('Article');
        const artAreaMongoose = ArticleAreaMongooseModelDB.parseArticleAreaToMongoose(articleArea);
        return ArticleAreaModelMongoose.create(artAreaMongoose);
      })
      .then((res) => ArticleAreaMongooseModelDB.parseMongooseToArticleArea(res, areaMongoose));
  }

  updateInfoArea (articleArea: ArticleArea): Promise<void> {
    if (!articleArea.id) throw new IdRequiredDbException();
    const { _id, ...rest } = ArticleAreaMongooseModelDB.parseArticleAreaToMongoose(articleArea);
    return ArticleAreaModelMongoose
      .updateOne({ _id }, rest)
      .then(({ modifiedCount }) => {
        if (modifiedCount === 0) throw new NotFoundDbException('ArticleArea');
      });
  }

  deleteInfoArea (idArtArea: string): Promise<void> {
    return ArticleAreaModelMongoose
      .deleteOne({ _id: new Types.ObjectId(idArtArea) })
      .then(({ deletedCount }) => {
        if (deletedCount === 0) throw new NotFoundDbException('ArticleArea');
      });
  }

}

export default ArticleMongooseModelDB;
