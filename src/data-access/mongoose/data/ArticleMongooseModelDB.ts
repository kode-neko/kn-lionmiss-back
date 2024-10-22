import {
  Article, ArticleArea, SearchParams
} from '@model/index';
import { Types } from 'mongoose';
import { IModelDB, IModelDBArticle } from '../../interfaces';
import {
  AreaModelMongoose,
  ArticleAreaModelMongoose, ArticleModelMongoose, IAreaMongoose, IArticleAreaMongoose, IArticleMongoose
} from '../db';
import { IdRequiredDbException, NotFoundDbException } from '../../error';
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

  update(obj: Article): Promise<void> | NotFoundDbException {
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

  readInfoArea(idArticle: string, nameArea: string): Promise<ArticleArea> | NotFoundDbException {
    let artAreaMongoose: IArticleAreaMongoose;
    return ArticleModelMongoose
      .findById(idArticle)
      .then(res => { // Find Article
        if (!res) throw new NotFoundDbException('Article');
        return ArticleAreaModelMongoose
          .findOne({ _id: { $in: res.articleAreaList } });
      })
      .then(res => { // Find ArticleArea
        if (!res) throw new NotFoundDbException('ArticleArea');
        artAreaMongoose = res;
        return AreaModelMongoose
          .findOne({ name: { $in: nameArea } });
      })
      .then(res => { // Find Area
        if (!res) throw new NotFoundDbException('Area');
        return ArticleAreaMongooseModelDB
          .parseMongooseToArticleArea(artAreaMongoose, res)
      })
  }

  createInfoArea (idArticle: string, articleArea: ArticleArea): Promise<ArticleArea> {
    const articleAreaMongoose = ArticleAreaMongooseModelDB.parseArticleAreaToMongoose(articleArea);
    let artAreaMongoose: IArticleAreaMongoose;
    return ArticleAreaModelMongoose
      .create(articleAreaMongoose)
      .then((res) => { // Create ArticleArea
        artAreaMongoose = res;
        return ArticleModelMongoose
          .updateOne(
            { _id: new Types.ObjectId(idArticle) },
            { $push: { articleArea: artAreaMongoose._id } }
          );
      })
      .then(({ modifiedCount }) => { // Modified Article
        if (modifiedCount === 0) throw new NotFoundDbException('ArticleArea');
        return {...articleArea, id: artAreaMongoose._id?.toString()};
      });
  }

  updateInfoArea(articleArea: ArticleArea): Promise<void> {
    if (!articleArea.id) throw new IdRequiredDbException()
    const {_id, ...rest} = ArticleAreaMongooseModelDB.parseArticleAreaToMongoose(articleArea);
    return ArticleAreaModelMongoose
      .updateOne({ _id }, rest)
      .then(({ modifiedCount }) => {
        if(modifiedCount === 0) throw new NotFoundDbException('ArticleArea')
      })
  }

  deleteInfoArea(idArtArea: string): Promise<void> {
    return ArticleAreaModelMongoose
      .deleteOne({ _id: new Types.ObjectId(idArtArea) })
      .then(({ deletedCount }) => {
        if(deletedCount === 0) throw new NotFoundDbException('ArticleArea')
      })
  }

}

export default ArticleMongooseModelDB;
