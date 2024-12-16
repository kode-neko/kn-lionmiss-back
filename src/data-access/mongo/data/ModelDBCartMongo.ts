import {
  Collection, Db, MongoClient
} from 'mongodb';
import { NotFoundDbException } from '../../error';
import { IModelDBCart } from '../../interfaces';
import {
  ArticleMongo, CartMongo, UserMongo
} from '../db/interfaces';
import { Cart } from '../../../model';

class CartMongoModelDB implements IModelDBCart {

  private client: MongoClient;

  private db: Db;

  private collCart: Collection<CartMongo>;

  private collArt: Collection<ArticleMongo>;

  private collUser: Collection<UserMongo>;

  private static instance: IModelDBCart;

  public static getIntance (): IModelDBCart {
    if (!CartMongoModelDB.instance) {
      CartMongoModelDB.instance = new CartMongoModelDB();
    }
    return CartMongoModelDB.instance;
  }

  private constructor () {
    [this.client,
      this.db] = getConnMongo();
    this.collCart = this.db.collection<CartMongo>('cart');
    this.collArt = this.db.collection<ArticleMongo>('article');
    this.collUser = this.db.collection<UserMongo>('user');
  }

  createLine (idCart: string, cartLine: CartLine): Promise<Cart | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  updateLine (idCart: string, cartLine: CartLine): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  deleteLine (idCart: string, idCartLine: string): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  read (id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

}

export default CartMongoModelDB;
