import { NotFoundDbException } from '@data-access/index';
import {
  Article, SearchParams, ArticleArea
} from '@model/index';
import {
  Collection, Db, MongoClient,
  ObjectId
} from 'mongodb';
import { IModelDBArticle } from '../../interfaces';
import {
  getConnMongo, IAreaMongo, IArticleAreaMongo, IArticleMongo
} from '../db';
import { IdRequiredDbException } from '../../error';
import ArticleAreaMongoModelDB from './ArticleAreaMongoModelDB';

class ArticleMongoModelDB implements IModelDBArticle {

  private client: MongoClient;

  private db: Db;

  private collArt: Collection<IArticleMongo>;

  private collArea: Collection<IAreaMongo>;

  private collArtArea: Collection<IArticleAreaMongo>;

  private static instance: IModelDBArticle;

  public static getIntance (): IModelDBArticle {
    if (!ArticleMongoModelDB.instance) {
      ArticleMongoModelDB.instance = new ArticleMongoModelDB();
    }
    return ArticleMongoModelDB.instance;
  }

  private constructor () {
    [this.client,
      this.db] = getConnMongo();
    this.collArt = this.db.collection<IArticleMongo>('article');
    this.collArea = this.db.collection<IAreaMongo>('area');
  }

  public static parseArticleToMongo (article: Article): IArticleMongo {
    return {
      _id: new ObjectId(article.id as string),
      instructs: article.instructs,
      sizes: article.sizes,
      materials: article.materials,
      tags: article.tags,
      variants: article.variants,
      discolor: article.discolor,
      articleAreaList: article.articleAreaList.map((aa) => new ObjectId(aa.id as string))
    };
  }

  public static parseMongoToArticle (mongo: IArticleMongo, artAreaList: IArticleAreaMongo[]): Article {
    return {
      id: mongo._id?.toString(),
      instructs: mongo.instructs,
      sizes: mongo.sizes,
      materials: mongo.materials,
      tags: mongo.tags,
      variants: mongo.variants,
      discolor: mongo.discolor,
      articleAreaList: []
    };
  }

  read (id: string): Promise<Article | NotFoundDbException> {
    return this.collArt
      .findOne({ _id: new ObjectId(id) })
      .then((res) => {
        if (!res) throw new NotFoundDbException('Article');
        return ArticleMongoModelDB.parseMongoToArticle(res, []);
      });
  }

  readList ({ limit, skip }: SearchParams<Article>): Promise<Article[]> {
    return this.collArt
      .find({}, { limit, skip })
      .toArray()
      .then((list) => list.map((a) => ArticleMongoModelDB
        .parseMongoToArticle(a, [])));
  }

  create (obj: Article): Promise<Article> {
    const articleMongo = ArticleMongoModelDB.parseArticleToMongo(obj);
    return this.collArt
      .insertOne(articleMongo)
      .then(({ insertedId: id }) => ({ ...obj, id: id.toString() } as Article));
  }

  update (obj: Article): Promise<void | NotFoundDbException> {
    if (!obj.id) throw new IdRequiredDbException();
    const { _id, ...rest } = ArticleMongoModelDB.parseArticleToMongo(obj);
    return this.collArt
      .updateOne({ _id }, rest)
      .then(({ modifiedCount }) => {
        if (modifiedCount === 0) throw new NotFoundDbException();
      });
  }

  delete (id: string): Promise<void | NotFoundDbException> {
    return this.collArt
      .deleteOne({ _id: new ObjectId(id) })
      .then(({ deletedCount }) => {
        if (deletedCount === 0) throw new NotFoundDbException();
      });
  }

  readInfoArea (idArticle: string, nameArea: string): Promise<ArticleArea | NotFoundDbException> {
    return this.collArt
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
        { $match: { $and: { ['area.name']: nameArea, _id: new ObjectId(idArticle) } } }
      ])
      .toArray()
      .then((list) => {
        if (list.length === 0) throw new NotFoundDbException('ArticleArea');
        const { articleArea, area } = list[0];
        return ArticleAreaMongoModelDB.parseMongoToArticleArea(articleArea as IArticleAreaMongo, area as IAreaMongo);
      });
  }

  createInfoArea (idArticle: string, articleArea: ArticleArea): Promise<ArticleArea> {
    return this.collArea
      .findOne({ name: articleArea.area.name })
      .then((res) => {
        if (!res) throw new NotFoundDbException('Area');
        return this.collArt.findOne({ _id: new ObjectId(idArticle) });
      })
      .then((res) => {
        if (!res) throw new NotFoundDbException('Article');
        const articleAreaMongo = ArticleAreaMongoModelDB.parseArticleAreaToMongo(articleArea);
        return this.collArtArea.insertOne(articleAreaMongo);
      })
      .then(({ insertedId }) => {
        return { ...articleArea, id: insertedId.toString() };
      });
  }

  updateInfoArea (articleArea: ArticleArea): Promise<void> {
    if (!articleArea.id) throw new IdRequiredDbException();
    const { _id, ...rest } = ArticleAreaMongoModelDB.parseArticleAreaToMongo(articleArea);
    return this.collArtArea
      .updateOne({ _id }, rest)
      .then(({ modifiedCount }) => {
        if (modifiedCount === 0) throw new NotFoundDbException('ArticleArea');
      });
  }

  deleteInfoArea (idArtArea: string): Promise<void> {
    return this.collArtArea
      .deleteOne({ _id: new ObjectId(idArtArea) })
      .then(({ deletedCount }) => {
        if (deletedCount === 0) throw new NotFoundDbException('ArticleArea');
      });
  }

}

export default ArticleMongoModelDB;
