import {
  Collection, Db, MongoClient
} from 'mongodb';
import { NotFoundDbException } from '../../error';
import { IModelDBShipping } from '../../interfaces';
import { ArticleMongo, ShippingMongo } from '../db/interfaces';
import { getConnMongo } from '../db/utils';
import { SearchParams, Shipping } from '../../../model';

class ShippingMongoModelDB implements IModelDBShipping {

  private client: MongoClient;

  private db: Db;

  private collShipping: Collection<ShippingMongo>;

  private collArt: Collection<ArticleMongo>;

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
    this.collShipping = this.db.collection<ShippingMongo>('cart');
    this.collArt = this.db.collection<ArticleMongo>('cart');
  }

  createFromCart (cartId: string): Promise<Shipping> {
    throw new Error('Method not implemented.');
  }

  read (id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  readList (searchParams?: SearchParams<T>): Promise<Shipping[]> {
    throw new Error('Method not implemented.');
  }

  update (obj: Shipping): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  delete (id: string): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

}

export default ShippingMongoModelDB;
