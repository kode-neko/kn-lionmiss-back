import { CartLine } from '@model/cart';
import {
  Collection, Db, MongoClient,
  ObjectId
} from 'mongodb';
import { NotFoundDbException } from '../../error';
import { IModelDBCart } from '../../interfaces';
import { ArticleMongo, CartMongo } from '../db/interfaces';
import { Cart } from '../../../model';
import { getConnMongo } from '../db/utils';
import { parseMongoToCart } from '../db/parsers';

class CartMongoModelDB implements IModelDBCart {

  private client: MongoClient;

  private db: Db;

  private collCart: Collection<CartMongo>;

  private collArt: Collection<ArticleMongo>;

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
  }

  read (id: string): Promise<Cart> {
    let cartMongo: CartMongo;
    return this.collCart
      .findOne({ _id: new ObjectId(id) })
      .then((res) => {
        if (!res) throw new NotFoundDbException('Cart');
        cartMongo = res;
        const idArticleList = res.cartLineList.map((cl) => new ObjectId(cl.article));
        return this.collArt
          .find({ _id: { $in: idArticleList } });
      })
      .then((res) => res.toArray())
      .then((list) => parseMongoToCart(cartMongo, list));
  }

  createLine (idCart: string, cartLine: CartLine): Promise<Cart | NotFoundDbException> {
    return this.collCart
      .updateOne({ _id: new ObjectId(idCart) }, {
        $push: {
          cartLineList: {
            ...cartLine,
            order: cartLine.order.toString(),
            article: new ObjectId(cartLine.article.id)
          }
        }
      })
      .then(({ modifiedCount }) => {
        if (modifiedCount === 0) throw new NotFoundDbException('Cart');
        return this.collCart.aggregate([
          { $unwind: '$cartLineList' },
          {
            $lookup: {
              from: 'articles',
              localField: 'cartLineList.article',
              foreignField: '_id',
              as: 'cartLineList.articleInfo'
            }
          },
          { $unwind: '$cartLineList.articleInfo' },
          {
            $group: {
              _id: '$_id',
              cartLineList: {
                $push: {
                  order: '$cartLineList.order',
                  qty: '$cartLineList.qty',
                  article: '$cartLineList.articleInfo'
                }
              }
            }
          }
        ]);
      })
      .then((list) => list.toArray())
      .then(([cartMongoAgg]) => {
        const { _id, cartlineList } = cartMongoAgg;
        const cartLineListMongo = cartlineList
          .map((cl) => cl.article._id.toString());
        const cartMongo: CartMongo = { _id, cartLineList: cartLineListMongo };
        const articleMongoList: ArticleMongo[] = cartlineList
          .map((cl) => cl.article);
        return parseMongoToCart(cartMongo, articleMongoList);
      });
  }

  updateLine (idCart: string, cartLine: CartLine): Promise<void | NotFoundDbException> {
    const cartLineMongo: CartMongo['cartLineList'][number] = {
      order: cartLine.order.toString(),
      qty: cartLine.qty,
      article: new ObjectId(cartLine.article.id as string)
    };
    return this.collCart
      .updateOne(
        { _id: new ObjectId(idCart), 'cartLineList.order': cartLine.order },
        { $set: { 'cartLineList.$': cartLineMongo } }
      )
      .then(({ modifiedCount }) => {
        if (modifiedCount === 0) throw new NotFoundDbException('Cart');
      });
  }

  deleteLine (idCart: string, orderLine: string): Promise<void | NotFoundDbException> {
    return this.collCart
      .deleteOne({
        _id: new ObjectId(idCart),
        $pull: { lineCartList: { $eq: orderLine } }
      })
      .then(({ deletedCount }) => {
        if (deletedCount === 0) throw new NotFoundDbException('Cart');
      });
  }

}

export default CartMongoModelDB;
