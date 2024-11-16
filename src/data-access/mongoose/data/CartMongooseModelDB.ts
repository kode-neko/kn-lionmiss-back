import { Cart, CartLine } from '@model/index';
import { IModelDBCart } from '../../interfaces';
import {
  IArticleMongoose, ICartLineMongoose, ICartMongoose, IUserMongoose
} from '../db/interfaces';
import ArticleMongooseModelDB from './ArticleMongooseModelDB';
import { NotFoundDbException } from '../../error';
import {
  ArticleModelMongoose, CartModelMongoose, UserModelMongoose
} from '../db/models';
import { RootFilterQuery, Types } from 'mongoose';

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

  public static parseCartToMongoose (cart: Cart): ICartMongoose {
    return {
      _id: new Types.ObjectId(cart.id as string),
      lines: cart.lines.map((l) => CartMongooseModelDB.parseCartLineToMongoose(l))
    };
  }

  public static parseCartLineToMongoose (line: CartLine): ICartLineMongoose {
    return {
      id: line.id,
      qty: line.qty,
      article: new Types.ObjectId(line.article.id as string)
    };
  }

  public static parseMongooseToCart (mongoCart: ICartMongoose, articleListMongo: IArticleMongoose[]): Cart {
    return {
      id: mongoCart._id?.toString(),
      lines: mongoCart.lines.map((l) => CartMongooseModelDB.parseMongooseToCartLine(
        l,
        articleListMongo.find((a) => a._id?.toString() === l.article.toString()) as IArticleMongoose
      ))
    };
  }

  public static parseMongooseToCartLine (mongo: ICartLineMongoose, articleMongo: IArticleMongoose): CartLine {
    return {
      id: mongo.id,
      qty: mongo.qty,
      article: ArticleMongooseModelDB.parseMongooseToArticle(articleMongo, [])
    };
  }

  read (id: string): Promise<Cart | NotFoundDbException> {
    let cartMongoose: ICartMongoose;
    return CartModelMongoose
      .findById(id)
      .then((res) => { // Get Cart
        if (!res) throw new NotFoundDbException();
        cartMongoose = res;
        const articleIds = cartMongoose.lines.map((l) => l.article);
        return ArticleModelMongoose.find({ _id: { $in: articleIds } });
      }) // Get Articles for LineCart info
      .then((list) => CartMongooseModelDB.parseMongooseToCart(cartMongoose, list));
  }

  newCartUser (idUser: string): Promise<Cart | NotFoundDbException> {
    let cart: ICartMongoose;
    let filterUser: RootFilterQuery<IUserMongoose>;
    try {
      filterUser = { _id: new Types.ObjectId(idUser) };
    } catch (err) {
      filterUser = { userName: idUser };
    }
    return UserModelMongoose
      .findOne(filterUser)
      .then((res) => { // Get User info
        if (!res) throw new NotFoundDbException('User');
        return CartModelMongoose.create({ lines: [] });
      })
      .then((res) => { // Create Cart for User
        cart = res;
        return UserModelMongoose.updateOne(filterUser, { cart });
      })
      .then(({ modifiedCount }) => { // Cart updated
        if (modifiedCount === 0) throw new NotFoundDbException('User');
        return CartMongooseModelDB.parseMongooseToCart(cart, []);
      });
  }

  createLine (idCart: string, cartLine: CartLine): Promise<Cart | NotFoundDbException> {
    let cartMongoose: ICartMongoose;
    return CartModelMongoose
      .findById(idCart)
      .then((res) => { // Find Cart
        if (!res) throw NotFoundDbException;
        cartMongoose = res;
        cartMongoose.lines = [
          ...cartMongoose.lines,
          CartMongooseModelDB.parseCartLineToMongoose(cartLine)
        ];
        return CartModelMongoose
          .updateOne({ _id: new Types.ObjectId(idCart) }, cartMongoose);
      })
      .then(() => { // Added new CartLine to Cart
        const articlesIds = cartMongoose.lines.map((l) => l.article);
        return ArticleModelMongoose.find({ _id: { $in: articlesIds } });
      })
      .then((list) => { // Get Articles for LineCart info
        return CartMongooseModelDB.parseMongooseToCart(cartMongoose, list);
      });
  }

  updateLine (idCart: string, cartLine: CartLine): Promise<void | NotFoundDbException> {
    const cartLineMongoose = CartMongooseModelDB.parseCartLineToMongoose(cartLine);
    return CartModelMongoose
      .findById(idCart)
      .then((res) => { // Find Cart to modify CartLine
        if (!res) throw NotFoundDbException;
        res.lines = res.lines.map((l) => {
          return l.id === cartLineMongoose.id
            ? cartLineMongoose
            : l;
        });
        return CartModelMongoose
          .updateOne({ _id: new Types.ObjectId(idCart) }, res);
      })
      .then(({ modifiedCount }) => { // Update Cart with the new CartLine
        if (modifiedCount === 0) throw new NotFoundDbException('CartLine');
      });
  }

  deleteLine (idCart: string, idCartLine: string): Promise<void | NotFoundDbException> {
    return CartModelMongoose
      .findById(idCart)
      .then((res) => { // Find Cart to modify CartLine
        if (!res) throw NotFoundDbException;
        res.lines = res.lines.filter((l) => l.id !== idCartLine);
        return CartModelMongoose
          .updateOne({ _id: new Types.ObjectId(idCart) }, res);
      })
      .then(({ modifiedCount }) => { // Update Cart with deleted line
        if (modifiedCount === 0) throw new NotFoundDbException('CartLine');
      });
  }

}

export default CartMongooseModelDB;
