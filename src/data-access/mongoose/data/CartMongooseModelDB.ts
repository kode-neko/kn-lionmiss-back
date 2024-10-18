import {
  Cart, CartLine, Shipping, User
} from '@model/index';
import { Types } from 'mongoose';
import { IModelDBCart } from '../../interfaces';
import {
  ArticleModelMongoose,
  CartModelMongoose,
  ICartMongoose,
  UserModelMongoose
} from '../db';
import { NotFoundDbException } from '../../error';
import ArticleMongooseModelDB from './ArticleMongooseModelDB';
import { ICartLineMongoose } from '../db/interfaces';
import UserMongooseModelDB from './UserMongooseModelDB';

class CartMongooseModelDB implements IModelDBCart {

  private static instance: IModelDBCart;

  public static getIntance (): IModelDBCart {
    if (!CartMongooseModelDB.instance) {
      CartMongooseModelDB.instance = new CartMongooseModelDB();
    }
    return CartMongooseModelDB.instance;
  }

  private constructor () {

  }

  public static parseCartToMongoose (cart: Cart, shipping: Shipping): ICartMongoose {
    const lines = cart.lines.map((l) => ({ ...l, article: new Types.ObjectId(l.article.id) }));
    return {
      _id: new Types.ObjectId(cart.id),
      lines,
      shipping: {
        idTracking: shipping.idTracking,
        idShipping: shipping.idShipping,
        state: shipping.state,
        payment: shipping.payment
      }
    };
  }

  public static async parseMongooseToCart (mongoCart: ICartMongoose): Promise<Cart> {
    const articlePromises = mongoCart.lines.map((l) => ArticleMongooseModelDB.getIntance().read(l.article.toString()));
    const articleList = await Promise.all(articlePromises);
    return {
      id: mongoCart._id?.toString(),
      cartLines: mongoCart.lines.map((l, i) => ({ ...l, article: articleList[i] }))
    };
  }

  public static parseCartLineToMongoose (line: CartLine): ICartLineMongoose {
    return {
      id: line.id,
      article: new Types.ObjectId(line.article.id),
      qty: line.qty
    };
  }

  public static async parseMongooseToCartLine (mongo: ICartLineMongoose): Promise<CartLine> {
    const article = await ArticleModelMongoose.findById(mongo.article.id);
    return {
      id: mongo.toString(),
      qty: mongo.qty,
      article: article
    };
  }

  read (id: string): Promise<Cart> | NotFoundDbException {
    return CartModelMongoose
      .findById(id)
      .then((res) => {
        if (!res) throw new NotFoundDbException();
        return CartMongooseModelDB.parseMongooseToCart(res as ICartMongoose);
      });
  }

  newCartUser (idUser: string): Promise<Cart> | NotFoundDbException {
    const filterUser = {
      $or: [{ _id: idUser },
        { userName: idUser }]
    };
    let user: User;
    return UserModelMongoose.findOne(filterUser)
      .then((res) => {
        if (!res) throw new NotFoundDbException('user');
        user = UserMongooseModelDB.parseMongooseToUser(res);
        return CartModelMongoose.create({ cartLines: [] });
      })
      .then((res) => {
        const cart = CartMongooseModelDB.parseMongooseToCart(res);
        const userNewCart = { ...user, cart };
        return UserModelMongoose.updateOne(filterUser, userNewCart);
      })
      .then(({ modifiedCount }) => {
        if (modifiedCount === 0) throw new NotFoundDbException('user');
      });
  }

  createLine (idCart: string, cartLine: CartLine): Promise<Cart> | NotFoundDbException {
    const cartLineMongoose = CartMongooseModelDB.parseCartLineToMongoose(cartLine);
    let cartMongoose: ICartMongoose;
    return CartModelMongoose
      .findById(idCart)
      .then((res) => {
        if (!res) throw NotFoundDbException;
        cartMongoose = res;
        cartMongoose.lines = [...cartMongoose.lines,
          cartLineMongoose];
        return CartModelMongoose
          .updateOne({ _id: new Types.ObjectId(idCart) }, cartMongoose);
      })
      .then(() => {
        return CartMongooseModelDB.parseMongooseToCart(cartMongoose);
      });
  }

  updateLine (idCart: string, cartLine: CartLine): Promise<void> | NotFoundDbException {
    const cartLineMongoose = CartMongooseModelDB.parseCartLineToMongoose(cartLine);
    let cartMongoose: ICartMongoose;
    return CartModelMongoose
      .findById(idCart)
      .then((res) => {
        if (!res) throw NotFoundDbException;
        cartMongoose = res;
        cartMongoose.lines = cartMongoose.lines.map((l) => l.id === cartLineMongoose.id ? cartLineMongoose : l);
        return CartModelMongoose
          .updateOne({ _id: new Types.ObjectId(idCart) }, cartMongoose);
      })
      .then(() => {
        return CartMongooseModelDB.parseMongooseToCart(cartMongoose);
      });
  }

  deleteLine (idCart: string, cartLine: CartLine): Promise<void> | NotFoundDbException {
    const cartLineMongoose = CartMongooseModelDB.parseCartLineToMongoose(cartLine);
    let cartMongoose: ICartMongoose;
    return CartModelMongoose
      .findById(idCart)
      .then((res) => {
        if (!res) throw NotFoundDbException;
        cartMongoose = res;
        cartMongoose.lines = cartMongoose.lines.filter((l) => l.id !== cartLineMongoose.id);
        return CartModelMongoose
          .updateOne({ _id: new Types.ObjectId(idCart) }, cartMongoose);
      })
      .then(() => {
        return CartMongooseModelDB.parseMongooseToCart(cartMongoose);
      });
  }

}

export default CartMongooseModelDB;
