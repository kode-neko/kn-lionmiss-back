import {
  Collection, Db, MongoClient, ObjectId
} from 'mongodb';
import { NotFoundDbException } from '@data-access/index';
import { CartLine } from '@model/cart';
import { Cart } from '@model/index';
import { IModelDBCart } from '../../interfaces';
import {
  getClientDb,
  IArticleMongo, ICartLineMongo, ICartMongo,
  IUserMongo
} from '../db';
import ArticleMongoModelDB from './ArticleMongoModelDB';
import { NotFoundDbException } from '../../error';

class CartMongoModelDB implements IModelDBCart {

  private client: MongoClient;

  private db: Db;

  private collCart: Collection<ICartMongo>;

  private collArt: Collection<IArticleMongo>;

  private collUser: Collection<IUserMongo>;

  private static instance: IModelDBCart;

  public static getIntance (): IModelDBCart {
    if (!CartMongoModelDB.instance) {
      CartMongoModelDB.instance = new CartMongoModelDB();
    }
    return CartMongoModelDB.instance;
  }

  private constructor () {
    [this.client,
      this.db] = getClientDb();
    this.collCart = this.db.collection<ICartMongo>('cart');
    this.collArt = this.db.collection<IArticleMongo>('article');
    this.collUser = this.db.collection<IUserMongo>('user');
  }

  public static parseCartToMongo (cart: Cart): ICartMongo {
    return {
      _id: new ObjectId(cart.id as string),
      lines: cart.lines.map((l) => CartMongoModelDB.parseCartLineToMongo(l))
    };
  }

  public static parseCartLineToMongo (line: CartLine): ICartLineMongo {
    return {
      id: line.id,
      qty: line.qty,
      article: new ObjectId(line.article.id as string)
    };
  }

  public static parseMongoToCart (mongoCart: ICartMongo, articleListMongo: IArticleMongo[]): Cart {
    return {
      id: mongoCart._id?.toString(),
      lines: mongoCart.lines.map((l) => CartMongoModelDB.parseMongoToCartLine(
        l,
        articleListMongo.find((a) => a._id?.toString() === l.article?.toString()) as IArticleMongo
      ))
    };
  }

  public static parseMongoToCartLine (mongo: ICartLineMongo, articleMongo: IArticleMongo): CartLine {
    return {
      id: mongo.id,
      qty: mongo.qty,
      article: ArticleMongoModelDB.parseMongoToArticle(articleMongo, [])
    };
  }

  read (id: string): Promise<Cart> | NotFoundDbException {
    let cartMongo: ICartMongo;
    return this.collCart
      .findOne({ _id: new ObjectId(id) })
      .then((res) => { // Find Cart
        if (!res) throw new NotFoundDbException('Cart');
        cartMongo = res;
        const articlesId = res.lines.map((l) => l.article) as ObjectId[];
        return this.collArt.find({ _id: { $in: articlesId } });
      })
      .then((list) => list.toArray())
      .then((list) => CartMongoModelDB.parseMongoToCart(cartMongo, list));
  }

  newCartUser (idUser: string): Promise<Cart> | NotFoundDbException {
    let userMongo: IUserMongo;
    const userFilter = { _id: new ObjectId(idUser) };
    return this.collUser
      .findOne(userFilter)
      .then((res) => { // Find User
        if (!res) throw new NotFoundDbException('User');
        userMongo = res;
        return this.collCart.insertOne({ lines: [] });
      })
      .then(({ insertedId: idCart }) => this.collUser // Inserted new Cart for User
        .updateOne(userFilter, { ...userMongo, cart: new ObjectId(idCart) }));
  }

  createLine (idCart: string, cartLine: CartLine): Promise<Cart> | NotFoundDbException {
    const idCartFilter = { _id: new ObjectId(idCart) };
    return this.collCart
      .findOne(idCartFilter)
      .then((res) => {
        if (!res) throw new NotFoundDbException('Cart');
        const lineMongo = CartMongoModelDB.parseCartLineToMongo(cartLine);
        return this.collCart.updateOne(idCartFilter, { $push: { lines: lineMongo } });
      });
  }

  updateLine (idCart: string, cartLine: CartLine): Promise<void> | NotFoundDbException {
    const idCartFilter = { _id: new ObjectId(idCart) };
    return this.collCart
      .findOne(idCartFilter)
      .then((res) => {
        if (!res) throw new NotFoundDbException('Cart');
        const lineMongo = CartMongoModelDB.parseCartLineToMongo(cartLine);
        const filter = { ...idCartFilter, 'lines.id': cartLine.id };
        return this.collCart.updateOne(filter, { $set: { 'lines.$': lineMongo } });
      });
  }

  deleteLine (idCart: string, idCartLine: string): Promise<void> | NotFoundDbException {
    const idCartFilter = { _id: new ObjectId(idCart) };
    return this.collCart
      .findOne(idCartFilter)
      .then((res) => {
        if (!res) throw new NotFoundDbException('Cart');
        const filter = { ...idCartFilter, 'lines.id': idCartLine };
        return this.collCart.deleteOne(filter);
      });
  }

}

export default CartMongoModelDB;
