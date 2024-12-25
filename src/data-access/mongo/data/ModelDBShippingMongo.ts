import { SearchParams, Shipping } from '@model/index';
import {
  Collection, Db, MongoClient,
  ObjectId
} from 'mongodb';
import { NotFoundDbException } from '../../error';
import { IModelDBShipping } from '../../interfaces';
import {
  ArticleMongo, CartMongo, ShippingMongo
} from '../db/interfaces';
import { getConnMongo } from '../db/utils';
import { parseMongoToShiping, parseShipingToMongo } from '../db/parsers';

class ShippingMongoModelDB implements IModelDBShipping {

  private client: MongoClient;

  private db: Db;

  private collShipping: Collection<ShippingMongo>;

  private collArt: Collection<ArticleMongo>;

  private collCart: Collection<CartMongo>;

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
    this.collShipping = this.db.collection<ShippingMongo>('shipping');
    this.collArt = this.db.collection<ArticleMongo>('article');
    this.collCart = this.db.collection<CartMongo>('cart');
  }

  read (id: string): Promise<Shipping> {
    let shippingMongo: ShippingMongo;
    return this.collShipping
      .findOne({ _id: new ObjectId(id) })
      .then((res) => {
        if (!res) throw new NotFoundDbException('Cart');
        shippingMongo = res;
        const idArticleList = res.shippingLineList.map((sl) => new ObjectId(sl.article));
        return this.collArt
          .find({ _id: { $in: idArticleList } });
      })
      .then((res) => res.toArray())
      .then((list) => parseMongoToShiping(shippingMongo, list));
  }

  readList (searchParams?: SearchParams<Shipping>): Promise<Shipping[]> {
    const {
      limit, skip, tags
    } = searchParams;
    const idsList = tags.map((t) => new ObjectId(t));
    let shippingMongoList: ShippingMongo[];
    return this.collShipping
      .find({ _id: { $in: idsList } }, { limit, skip })
      .toArray()
      .then((list) => {
        shippingMongoList = list;
        const idArticleList = shippingMongoList.flatMap((sml) => sml.shippingLineList.map((slm) => new ObjectId(slm.article)));
        return this.collArt
          .find({ _id: { $in: idArticleList } });
      })
      .then((res) => res.toArray())
      .then((list) => shippingMongoList.map((sm) => parseMongoToShiping(sm, list)));
  }

  update (obj: Shipping): Promise<void | NotFoundDbException> {
    const { _id, ...rest } = parseShipingToMongo(obj);
    return this.collShipping
      .updateOne({ _id }, { ...rest })
      .then(({ modifiedCount }) => {
        if (modifiedCount === 0) throw new NotFoundDbException('shipping');
      });
  }

  delete (id: string): Promise<void | NotFoundDbException> {
    return this.collShipping
      .deleteOne({ _id: new ObjectId(id) })
      .then(({ deletedCount }) => {
        if (deletedCount === 0) throw new NotFoundDbException('shipping');
      });
  }

  createFromCart (cartId: string): Promise<Shipping> {
    let shippingMongo: ShippingMongo;
    return this.collCart
      .findOne({ _id: new ObjectId(cartId) })
      .then((res) => {
        if (!res) throw new NotFoundDbException('Cart');
        shippingMongo = {
          state: {},
          shippingLineList: res.cartLineList
        };
        return this.collShipping
          .insertOne(shippingMongo);
      })
      .then(({ insertedId }) => {
        shippingMongo = { _id: insertedId, ...shippingMongo };
        const artIds = shippingMongo.shippingLineList.map((slm) => slm.article);
        return this.collArt
          .find({ _id: { $in: artIds } });
      })
      .then((list) => list.toArray())
      .then((list) => parseMongoToShiping(shippingMongo, list));
  }

}

export default ShippingMongoModelDB;
