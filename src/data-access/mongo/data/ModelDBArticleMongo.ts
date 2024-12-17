import {
  Collection, Db, MongoClient,
  ObjectId
} from 'mongodb';
import { IModelDBArticle } from '../../interfaces';
import { NotFoundDbException } from '../../error';
import {
  AreaMongo, ArticleAreaMongo, ArticleMongo
} from '../db/interfaces';
import {
  Area, Article, ArticleArea, SearchParams
} from '../../../model';
import { getConnMongo } from '../db/utils';
import {
  parseArticleAreaToMongo, parseArticleToMongo, parseMongoToArticle,
  parseMongoToArticleArea
} from '../db/parsers';

class ArticleMongoModelDB implements IModelDBArticle {

  private client: MongoClient;

  private db: Db;

  private collArt: Collection<ArticleMongo>;

  private collArtArea: Collection<ArticleAreaMongo>;

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
    this.collArt = this.db.collection<ArticleMongo>('article');
    this.collArtArea = this.db.collection<ArticleAreaMongo>('articleArticle');
  }

  read (id: string): Promise<Article> {
    return this.collArt
      .findOne({ _id: new ObjectId(id) })
      .then((res) => {
        if (!res) throw new NotFoundDbException('Area');
        return parseMongoToArticle(res);
      });
  }

  readList (searchParams: SearchParams<Article>): Promise<Article[]> {
    const { limit, skip } = searchParams;
    const filter = searchParams.tags.map((t) => ({ name: t }));
    return this.collArt
      .find({ $or: filter }, { limit, skip })
      .toArray()
      .then((list) => {
        return list.map((e) => parseMongoToArticle(e));
      });
  }

  create (obj: Article): Promise<Article> {
    const artMongo = parseArticleToMongo(obj);
    let artAreaMongoList = obj.articleAreaList.map((aa) => parseArticleAreaToMongo(aa));
    return this.collArtArea
      .insertMany(artAreaMongoList)
      .then(({ insertedIds }) => {
        artAreaMongoList = artAreaMongoList.map((aa, i) => ({ ...aa, _id: insertedIds[i] }));
        return this.collArt
          .insertOne(artMongo);
      })
      .then(({ insertedId }) => {
        const articleAreaList = artAreaMongoList.map((aam) => parseMongoToArticleArea(aam));
        return {
          ...obj, _id: insertedId.toString(), articleAreaList
        };
      });
  }

  update (obj: Article): Promise<void | NotFoundDbException> {
    const { _id, ...rest } = parseArticleToMongo(obj);
    return this.collArt
      .updateOne({ _id }, { ...rest })
      .then(({ modifiedCount }) => {
        if (modifiedCount === 0) throw new NotFoundDbException('Article');
      });
  }

  delete (id: string): Promise<void | NotFoundDbException> {
    return this.collArt
      .deleteOne(new ObjectId(id))
      .then(({ deletedCount }) => {
        if (deletedCount === 0) throw new NotFoundDbException('Article');
      });
  }

  private static mongoProjectionArea = (area: Area) => ({
    $project: {
      articleAreaList: {
        $filter: {
          input: '$articleAreaList',
          cond: { $eq: ['$articleAreaList.area.name', area.name] }
        }
      }
    }
  });

  readByArea (id: string, area: Area): Promise<Article | NotFoundDbException> {
    return this.collArt
      .aggregate([
        { $match: { _id: new ObjectId(id) } },
        ArticleMongoModelDB.mongoProjectionArea(area)
      ])
      .toArray()
      .then((list) => {
        if (list.length === 0) throw new NotFoundDbException('Article');
        return parseMongoToArticle(list[0] as ArticleMongo);
      });
  }

  readListByArea (searchParams: SearchParams<Article>, area: Area): Promise<Article[]> {
    const {
      limit, skip, tags
    } = searchParams;
    return this.collArt
      .aggregate([
        { $match: { tags: { $elemMatch: { $in: tags } } } },
        { $limit: limit, $kip: skip },
        ArticleMongoModelDB.mongoProjectionArea(area)
      ])
      .toArray()
      .then((list) => {
        return list.map((e) => parseMongoToArticle(e as ArticleMongo));
      });
  }

  createArticleArea (id: string, articleArea: ArticleArea): Promise<Article> {
    let artMongo: ArticleMongo;
    let artAreaMongo: ArticleAreaMongo;
    return this.collArt
      .findOne({ _id: new ObjectId(id) })
      .then((res) => {
        if (!res) throw new NotFoundDbException('Article');
        artMongo = res;
        const artAreaMongo = parseArticleAreaToMongo(articleArea);
        return this.collArtArea
          .insertOne(artAreaMongo);
      })
      .then(({ insertedId }) => {
        artAreaMongo = parseArticleAreaToMongo({ ...articleArea, _id: insertedId });
        return this.collArt
          .updateOne(
            { _id: new ObjectId(id) },
            { $push: { articleAreaList: { ...artAreaMongo } } }
          );
      })
      .then(({ modifiedCount }) => {
        if (modifiedCount === 0) throw new NotFoundDbException('Article');
        const article = parseMongoToArticle(artMongo);
        const articleAreaListMongo = [artAreaMongo, ...artMongo.articleAreaList];
        const articleAreaList = articleAreaListMongo.map((aam) => parseMongoToArticleArea(aam));
        return { ...article, articleAreaList };
      });
  }

  updateArticleArea (articleArea: ArticleArea): Promise<void | NotFoundDbException> {
    const { id, ...rest } = articleArea;
    return this.collArtArea
      .updateOne({ _id: new ObjectId(id) }, { ...rest })
      .then(({ modifiedCount }) => {
        if (modifiedCount === 0) throw new NotFoundDbException('ArticleArea');
      });
  }

  deleteArticleArea (id: string, articleAreaId: string): Promise<void | NotFoundDbException> {
    return this.collArt
      .findOne({
        _id: new ObjectId(id),
        articleAreaList: { $elemMatch: { $eq: { _id: new ObjectId(articleAreaId) } } }
      })
      .then((res) => {
        if (!res) throw new NotFoundDbException('Article');
        return this.collArt
          .updateOne({ _id: new ObjectId(id) }, { $pull: { articleAreaList: { $eq: new ObjectId(articleAreaId) } } });
      })
      .then(({ modifiedCount }) => {
        if (modifiedCount === 0) throw new NotFoundDbException('ArticleArea');
        return this.collArtArea.deleteOne({ _id: new ObjectId(articleAreaId) });
      })
      .then(({ deletedCount }) => {
        if (deletedCount === 0) throw new NotFoundDbException('ArticleArea');
      });
  }

}

export default ArticleMongoModelDB;
