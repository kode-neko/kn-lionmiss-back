import { NotFoundDbException } from '@data-access/index';
import { ArticleArea, SearchParams } from '@model/index';
import {
  Collection, Db, MongoClient, ObjectId
} from 'mongodb';
import { IModelDBArticleArea } from '../../interfaces';
import {
  getConnMongo, IAreaMongo, IArticleAreaMongo
} from '../db';
import AreaMongoModelDB from './AreaMongoModelDB';

class ArticleAreaMongoModelDB implements IModelDBArticleArea {

  private client: MongoClient;

  private db: Db;

  private collArtArea: Collection<IArticleAreaMongo>;

  private collArea: Collection<IAreaMongo>;

  private static instance: ArticleAreaMongoModelDB;

  public static getIntance (): ArticleAreaMongoModelDB {
    if (!ArticleAreaMongoModelDB.instance) {
      ArticleAreaMongoModelDB.instance = new ArticleAreaMongoModelDB();
    }
    return ArticleAreaMongoModelDB.instance;
  }

  private constructor () {
    [this.client,
      this.db] = getConnMongo();
    this.collArtArea = this.db.collection<IArticleAreaMongo>('articleArea');
    this.collArea = this.db.collection<IAreaMongo>('area');
  }

  public static parseArticleAreaToMongo (articleArea: ArticleArea): IArticleAreaMongo {
    return {
      _id: new ObjectId(articleArea.id as string),
      title: articleArea.title,
      desc: articleArea.desc,
      price: articleArea.price,
      tax: articleArea.tax,
      area: articleArea.area.name
    };
  }

  public static parseMongoToArticleArea (articleAreaMongo: IArticleAreaMongo, areaMongo: IAreaMongo): ArticleArea {
    return {
      id: articleAreaMongo._id?.toString(),
      title: articleAreaMongo.title,
      desc: articleAreaMongo.desc,
      price: articleAreaMongo.price,
      tax: articleAreaMongo.tax,
      area: AreaMongoModelDB.parseMongoToArea(areaMongo)
    };
  }

  read (id: string): Promise<ArticleArea> | NotFoundDbException {
    let articleAreaMongo: IArticleAreaMongo;
    return this.collArtArea
      .findOne({ _id: new ObjectId(id) })
      .then((res) => {
        if (!res) throw new NotFoundDbException('ArticleArea');
        articleAreaMongo = res;
        return this.collArea.findOne({ name: articleAreaMongo.area });
      })
      .then((res) => {
        if (!res) throw new NotFoundDbException('Area');
        return ArticleAreaMongoModelDB.parseMongoToArticleArea(articleAreaMongo, res);
      });
  }

  readList ({ limit, skip }: SearchParams<ArticleArea>): Promise<ArticleArea[]> {
    let articleAreaMongoList: IArticleAreaMongo[];
    return this.collArtArea
      .find({}, { limit, skip })
      .toArray()
      .then((list) => {
        articleAreaMongoList = list;
        const areaNameList = list.map((aa) => aa.area);
        return this.collArea.find({ name: { $in: areaNameList } });
      })
      .then((list) => list.toArray())
      .then((list) => {
        return articleAreaMongoList.map((aa) => ArticleAreaMongoModelDB.parseMongoToArticleArea(
          aa,
          list.find((a) => a.name === aa.area) as IAreaMongo
        ));
      });
  }

  create (obj: ArticleArea): Promise<ArticleArea> {
    const articleAreaMongo = ArticleAreaMongoModelDB.parseArticleAreaToMongo(obj);
    return this.collArtArea
      .insertOne(articleAreaMongo)
      .then(({ insertedId: id }) => ({ ...obj, id: id.toString() } as ArticleArea));
  }

  update (obj: ArticleArea): Promise<void> | NotFoundDbException {
    const { _id, ...rest } = ArticleAreaMongoModelDB.parseArticleAreaToMongo(obj);
    return this.collArtArea
      .updateOne({ _id }, rest)
      .then(({ modifiedCount }) => {
        if (modifiedCount === 0) throw new NotFoundDbException('ArticleArea');
      });
  }

  delete (id: string): Promise<void> | NotFoundDbException {
    return this.collArtArea
      .deleteOne({ _id: new ObjectId(id) })
      .then(({ deletedCount }) => {
        if (deletedCount === 0) throw new NotFoundDbException('ArticleArea');
      });
  }

}

export default ArticleAreaMongoModelDB;
