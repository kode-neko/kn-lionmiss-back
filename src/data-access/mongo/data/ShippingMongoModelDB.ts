import { NotFoundDbException } from '@data-access/index';
import {
  Shipping, ShippingLine, SearchParams
} from '@model/index';
import {
  Collection, Db, MongoClient,
  ObjectId
} from 'mongodb';
import { IModelDBShipping } from '../../interfaces';
import {
  getConnMongo, IArticleMongo, IShippingLineMongo, IShippingMongo
} from '../db';
import ArticleMongoModelDB from './ArticleMongoModelDB';

class ShippingMongoModelDB implements IModelDBShipping {

  private client: MongoClient;

  private db: Db;

  private collShipping: Collection<IShippingMongo>;

  private collArt: Collection<IArticleMongo>;

  private static instance: IModelDBShipping;

  public static getIntance (): IModelDBShipping {
    if (!ShippingMongoModelDB.instance) {
      ShippingMongoModelDB.instance = new ShippingMongoModelDB();
    }
    return ShippingMongoModelDB.instance;
  }

  private constructor () {
    [this.client,
      this.db] = getConnMongo();
    this.collShipping = this.db.collection<IShippingMongo>('cart');
    this.collArt = this.db.collection<IArticleMongo>('cart');
  }

  public static parseShippingToMongo (shipping: Shipping): IShippingMongo {
    return {
      _id: new ObjectId(shipping.id as string),
      idTracking: shipping.idTracking,
      idShipping: shipping.idShipping,
      state: shipping.state,
      payment: shipping.payment,
      lines: shipping.lines.map((l) => ShippingMongoModelDB.parseShippingLineToMongo(l))
    };
  }

  public static parseShippingLineToMongo (shippingLine: ShippingLine): IShippingLineMongo {
    return {
      id: shippingLine.id,
      qty: shippingLine.qty,
      article: new ObjectId(shippingLine.article.id as string)
    };
  }

  public static parseMongoToShipping (shippingMongo: IShippingMongo, articleListMongo: IArticleMongo[]): Shipping {
    return {
      id: shippingMongo._id?._id.toString(),
      idTracking: shippingMongo.idTracking,
      idShipping: shippingMongo.idShipping,
      state: shippingMongo.state,
      payment: shippingMongo.payment,
      lines: shippingMongo.lines.map((l) => ShippingMongoModelDB.parseMongoToShippingLine(l, articleListMongo.find((a) => a._id?.toString() === l.article?.toString()) as IArticleMongo))
    };
  }

  public static parseMongoToShippingLine (shippingLineMongo: IShippingLineMongo, articleMongo: IArticleMongo): ShippingLine {
    return {
      id: shippingLineMongo.id,
      qty: shippingLineMongo.qty,
      article: ArticleMongoModelDB.parseMongoToArticle(articleMongo, [])
    };
  }

  read (id: string): NotFoundDbException | Promise<Shipping> {
    let shippinMongo: IShippingMongo;
    return this.collShipping
      .findOne({ _id: new ObjectId(id) })
      .then((res) => {
        if (!res) throw new NotFoundDbException('Shipping');
        shippinMongo = res;
        const articleListMongo = res.lines.map((l) => new ObjectId(l.article));
        return this.collArt.find({ _id: { $in: articleListMongo } });
      })
      .then((list) => list.toArray())
      .then((list) => ShippingMongoModelDB.parseMongoToShipping(shippinMongo, list));
  }

  readList ({ limit, skip }: SearchParams<Shipping>): Promise<Shipping[]> {
    let shippingList: IShippingMongo[];
    return this.collShipping
      .find({}, { skip, limit })
      .toArray()
      .then((list) => {
        shippingList = list;
        const articleListMongo = list.flatMap((s) => s.lines.map((l) => new ObjectId(l.article)));
        return this.collArt.find({ _id: { $in: articleListMongo } });
      })
      .then((list) => {
        return shippingList.map((s) => ShippingMongoModelDB.parseMongoToShipping(s, list));
      });
  }

  create (obj: Shipping): Promise<Shipping> {
    const shippingMongo = ShippingMongoModelDB.parseShippingToMongo(obj);
    return this.collShipping
      .insertOne(shippingMongo)
      .then(({ insertedId: id }) => ({ id, ...obj }));
  }

  update (obj: Shipping): Promise<void> | NotFoundDbException {
    const { _id, ...rest } = ShippingMongoModelDB.parseShippingToMongo(obj);
    this.collShipping
      .updateOne({ _id }, rest)
      .then(({ modifiedCount }) => {
        if (modifiedCount === 0) throw new NotFoundDbException('Shipping');
      });
  }

  delete (id: string): Promise<void> | NotFoundDbException {
    this.collShipping
      .deleteOne({ _id: new ObjectId(id) })
      .then(({ deletedCount }) => {
        if (deletedCount === 0) throw new NotFoundDbException('Shipping');
      });
  }

}

export default ShippingMongoModelDB;
