import {
  Collection, Db, MongoClient,
  ObjectId
} from 'mongodb';
import { NotFoundDbException } from '../../error';
import { IModelDBCart } from '../../interfaces';
import {
  ArticleMongo, CartMongo, UserMongo
} from '../db/interfaces';
import { getConnMongo } from '../db/utils';
import { Cart, CartLine } from '../../../model';
import { parseCartLineToMongo, parseMongoToCart } from '../db/parsers';

class CartMongoModelDB implements IModelDBCart {

  private client: MongoClient;

  private db: Db;

  private collUser: Collection<UserMongo>;

  private static instance: CartMongoModelDB;

  public static getIntance (): CartMongoModelDB {
    if (!CartMongoModelDB.instance) {
      CartMongoModelDB.instance = new CartMongoModelDB();
    }
    return CartMongoModelDB.instance;
  }

  private constructor () {
    [this.client,
      this.db] = getConnMongo();
    this.collUser = this.db.collection<UserMongo>('user');
  }

  private projectionCart = {
    $project: {
      _id: 0,
      cartId: '$cart.id',
      cartLineList: {
        $map: {
          input: '$cart.cartLineList',
          as: 'line',
          in: {
            order: '$$line.order',
            qty: '$$line.qty',
            articleId: '$$line.article' // Rename "article" to "articleId"
          }
        }
      }
    }
  };

  // R

  read (id: string): Promise<Cart> {
    return this.collUser
      .aggregate([
        { $match: { 'cart.id': id } },
        this.projectionCart
      ])
      .toArray()
      .then((list) => {
        if (list.length === 0) throw new NotFoundDbException('Cart');
        const cart = list[0] as CartMongo;
        return parseMongoToCart(cart);
      });
  }

  // CartLine

  createLine (idCart: string, cartLine: CartLine): Promise<CartLine | NotFoundDbException> {
    const mongo = parseCartLineToMongo(cartLine);
    return this.collUser
      .updateOne(
        { 'cart.id': idCart, 'cart.cartLineList.order': cartLine.order },
        { $set: { 'cart.cartLineList.$': mongo } }
      )
      .then(({ modifiedCount }) => {
        if (modifiedCount === 0) throw new NotFoundDbException('Cart');
        return cartLine;
      });
  }

  updateLine (idCart: string, cartLine: CartLine): Promise<void | NotFoundDbException> {
    const mongo = parseCartLineToMongo(cartLine);
    return this.collUser
      .updateOne(
        { 'cart.id': idCart, 'cart.cartLineList.order': cartLine.order },
        { $set: { 'cart.cartLineList.$': mongo } }
      )
      .then(({ modifiedCount }) => {
        if (modifiedCount === 0) throw new NotFoundDbException('Cart');
      });
  }

  deleteLine (idCart: string, orderLine: string): Promise<void | NotFoundDbException> {
    return this.collUser
      .findOne({ 'cart.id': idCart })
      .then((res) => {
        if (!res) throw new NotFoundDbException('Cart');
        const mongoLines = res.cart.cartLineList.filter((cl) => cl.order === orderLine);
        return this.collUser
          .updateOne(
            { 'cart.id': idCart },
            { '$currentDate.cartLine': mongoLines }
          );
      })
      .then(({ modifiedCount }) => {
        if (modifiedCount === 0) throw new NotFoundDbException('Cart');
      });
  }

}

export default CartMongoModelDB;
