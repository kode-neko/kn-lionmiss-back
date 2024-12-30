import {
  Collection, Db, MongoClient,
  ObjectId
} from 'mongodb';
import { NotFoundDbException } from '../../error';
import { IModelDBShipping } from '../../interfaces';
import {
  CartMongo,
  ShippingMongo,
  UserMongo
} from '../db/interfaces';
import { getConnMongo } from '../db/utils';
import { SearchParams, Shipping } from '../../../model';
import { parseMongoToShipping, parseShippingToMongo } from '../db/parsers';
import { v7 as uuidv7 } from 'uuid';

class ShippingMongoModelDB implements IModelDBShipping {

  private client: MongoClient;

  private db: Db;

  private collShipping: Collection<ShippingMongo>;

  private collUser: Collection<UserMongo>;

  private static instance: IModelDBShipping;

  public static getInstance (): IModelDBShipping {
    if (!ShippingMongoModelDB.instance) {
      ShippingMongoModelDB.instance = new ShippingMongoModelDB();
    }
    return ShippingMongoModelDB.instance;
  }

  private constructor () {
    [this.client,
      this.db] = getConnMongo();
    this.collShipping = this.db.collection<ShippingMongo>('shipping');
    this.collUser = this.db.collection<UserMongo>('user');
  }

  // New Shipping From Cart

  createFromUserCart (userId: string, shippingOps: Pick<Shipping, 'idTracking' | 'state' | 'idPayment' | 'payment'>): Promise<Shipping> {
    let shippingMongo: ShippingMongo;
    return this.collUser
      .findOne({ _id: new ObjectId(userId) })
      // Find User
      .then((res) => {
        if (!res) throw new NotFoundDbException('User');
        shippingMongo = {
          ...shippingOps,
          _id: new ObjectId(res.cart.id),
          shippingLineList: res.cart.cartLineList.map((cl) => ({
            order: cl.order,
            qty: cl.qty,
            article: cl.article
          }))
        };
        return this.collShipping
          .insertOne(shippingMongo);
      })
      // New Shipping
      .then(() => this.collUser
        .updateOne(
          { _id: new ObjectId(userId) },
          { $push: { shippingList: shippingMongo._id } }
        ))
      // New Add new Shipping to User account
      .then(({ modifiedCount }) => {
        if (modifiedCount === 0) throw new NotFoundDbException('Cart');
        const cartMongo: CartMongo = {
          id: uuidv7(),
          cartLineList: []
        };
        return this.collUser
          .updateOne(
            { _id: new ObjectId(userId) },
            { cart: cartMongo }
          );
      })
      // New empty Cart
      .then(({ modifiedCount }) => {
        if (modifiedCount === 0) throw new NotFoundDbException('Cart');
        return parseMongoToShipping(shippingMongo);
      });
  }

  // CRUD

  read (id: string): Promise<Shipping | NotFoundDbException> {
    return this.collShipping
      .findOne({ _id: new ObjectId(id) })
      .then((res) => {
        if (!res) throw new NotFoundDbException('Shipping');
        return parseMongoToShipping(res);
      });
  }

  readList (searchParams: SearchParams<Shipping>): Promise<Shipping[]> {
    const { limit, skip } = searchParams;
    return this.collShipping
      .find({}, { limit, skip })
      .toArray()
      .then((list) => {
        return list.map(parseMongoToShipping);
      });
  }

  update (obj: Shipping): Promise<void | NotFoundDbException> {
    const { _id, ...rest } = parseShippingToMongo(obj);
    return this.collShipping
      .updateOne({ _id }, { ...rest })
      .then(({ modifiedCount }) => {
        if (modifiedCount === 0) throw new NotFoundDbException('Shipping');
      });
  }

  delete (id: string): Promise<void | NotFoundDbException> {
    return this.collShipping
      .deleteOne(new ObjectId(id))
      .then(({ deletedCount }) => {
        if (deletedCount === 0) throw new NotFoundDbException('Shipping');
      });
  }

}

export default ShippingMongoModelDB;
