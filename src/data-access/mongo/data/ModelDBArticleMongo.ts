import {
  Collection,
  Db,
  MongoClient,
  ObjectId
} from 'mongodb';
import { IModelDBArticle } from '../../interfaces';
import { NotFoundDbException } from '../../error';
import {
  AreaMongo, ArticleAreaMongo, ArticleMongo
} from '../db/interfaces';
import {
  Article, ArticleArea, SearchParams
} from '../../../model';
import { getConnMongo } from '../db/utils';
import {
  parseArticleAreaToMongo,
  parseArticleToMongo,
  parseMongoToArticle,
  parseMongoToArticleArea
} from '../db/parsers';
import { v7 as uuidv7 } from 'uuid';

class ArticleMongoModelDB implements IModelDBArticle {

  private client: MongoClient;

  private db: Db;

  private collArt: Collection<ArticleMongo>;

  private static instance: ArticleMongoModelDB;

  public static getIntance (): ArticleMongoModelDB {
    if (!ArticleMongoModelDB.instance) {
      ArticleMongoModelDB.instance = new ArticleMongoModelDB();
    }
    return ArticleMongoModelDB.instance;
  }

  private constructor () {
    [this.client,
      this.db] = getConnMongo();
    this.collArt = this.db.collection<ArticleMongo>('article');
  }

  private pipeLookupArea =
    {
      $lookup: {
        from: 'area',
        localField: 'articleAreaList.area',
        foreignField: 'name',
        as: 'areaList'
      }
    };

  // CRUD

  read (id: string): Promise<Article> {
    return this.collArt
      .aggregate([
        { $match: { _id: new ObjectId(id) } },
        this.pipeLookupArea
      ])
      .toArray()
      .then((list) => {
        if (list.length === 0) throw new NotFoundDbException('Article');
        const article = list[0] as ArticleMongo;
        const areaList = list[0].areaList as AreaMongo[];
        return parseMongoToArticle(article, areaList);
      });
  }

  readList (searchParams: SearchParams<Article>): Promise<Article[]> {
    const {
      tags, limit, skip
    } = searchParams;
    return this.collArt
      .aggregate([
        { $match: { tags: { $in: tags } } },
        this.pipeLookupArea,
        { $skip: skip },
        { $limit: limit }
      ])
      .toArray()
      .then((list) => {
        if (list.length === 0) throw new NotFoundDbException('Article');
        return list.map((am) => {
          const article = am as ArticleMongo;
          const areaList = am.areaList as AreaMongo[];
          return parseMongoToArticle(article, areaList);
        });
      });
  }

  create (obj: Article): Promise<Article> {
    const mongo = parseArticleToMongo(obj);
    return this.collArt
      .insertOne(mongo)
      .then(({ insertedId }) => {
        return { id: insertedId.toString(), ...obj };
      });
  }

  update (obj: Article): Promise<void | NotFoundDbException> {
    const { _id, ...rest } = parseArticleToMongo(obj);
    return this.collArt
      .updateOne({ _id }, rest)
      .then(({ modifiedCount }) => {
        if (modifiedCount === 0) throw new NotFoundDbException('Article');
      });
  }

  delete (id: string): Promise<void | NotFoundDbException> {
    const { _id, ...rest } = parseArticleToMongo(obj);
    return this.collArt
      .deleteOne({ _id })
      .then(({ deletedCount }) => {
        if (deletedCount === 0) throw new NotFoundDbException('Article');
      });
  }

  // Article Area

  readByArea (id: string, area: string): Promise<Article | NotFoundDbException> {
    return this.collArt
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id),
            'articleAreaList.area': area
          }
        },
        this.pipeLookupArea
      ])
      .toArray()
      .then((list) => {
        if (list.length === 0) throw new NotFoundDbException('Article');
        const article = list[0] as ArticleMongo;
        const areaList = list[0].areaList as AreaMongo[];
        return parseMongoToArticle(article, areaList);
      });
  }

  readListByArea (searchParams: SearchParams<Article>, area: string): Promise<Article[]> {
    const {
      tags, limit, skip
    } = searchParams;
    return this.collArt
      .aggregate([
        {
          $match: {
            tags: { $in: tags },
            'articleAreaList.area': area
          }
        },
        this.pipeLookupArea,
        { $skip: skip },
        { $limit: limit }
      ])
      .toArray()
      .then((list) => {
        if (list.length === 0) throw new NotFoundDbException('Article');
        return list.map((am) => {
          const article = am as ArticleMongo;
          const areaList = am.areaList as AreaMongo[];
          return parseMongoToArticle(article, areaList);
        });
      });
  }

  createArticleArea (id: string, articleArea: ArticleArea): Promise<ArticleArea> {
    const idArtArea = uuidv7();
    const mongo = parseArticleAreaToMongo(articleArea);
    return this.collArt
      .updateOne(
        { _id: new ObjectId(id) },
        { articleAreaList: { $set: { id: idArtArea, ...mongo } } }
      )
      .then((res) => {
        if (!res) throw new NotFoundDbException('Article');
        return { id, ...articleArea };
      });
  }

  updateArticleArea (id: string, articleArea: ArticleArea): Promise<void | NotFoundDbException> {
    const mongo = parseArticleAreaToMongo(articleArea);
    return this.collArt
      .updateOne(
        { _id: new ObjectId(id), 'articleAreaList.id': mongo.id },
        { $set: { 'articleAreaList.$': articleArea } }
      )
      .then((res) => {
        if (!res) throw new NotFoundDbException('Article');
      });
  }

  deleteArticleArea (id: string, articleAreaId: string): Promise<void | NotFoundDbException> {
    return this.collArt
      .updateOne(
        { _id: new ObjectId(id) },
        { $pull: { articleAreaList: { id: articleAreaId } } }
      )
      .then((res) => {
        if (!res) throw new NotFoundDbException('Article');
      });
  }

}

export default ArticleMongoModelDB;
