import { ObjectId } from 'mongodb';
import Cart from '../../../../model/cart/Cart';
import CartMongo from '../interfaces/CartMongo';
import ArticleMongo from '../interfaces/ArticleMongo';
import { parseMongoToArticle } from './article';
import CartLine from '../../../../model/cart/CartLine';

function parseCartToMongo (obj: Cart): CartMongo {
  return {
    _id: new ObjectId(obj.id),
    cartLineList: obj.cartLineList.map((cl, i) => ({
      order: i.toString(),
      qty: cl.qty,
      article: new ObjectId(cl.article.id)
    }))
  };
}

function parseMongoToCart (cartMongo: CartMongo, articleMongoList: ArticleMongo[]): Cart {
  return {
    id: cartMongo._id.toString(),
    cartLineList: cartMongo.cartLineList.map((cl, i) => {
      const articleFound = articleMongoList
        .find((am) => cl.article.toString() === am._id.toString());
      return {
        order: i,
        qty: cl.qty,
        article: parseMongoToArticle(articleFound as ArticleMongo)
      } as CartLine;
    })
  };
}

export {
  parseCartToMongo,
  parseMongoToCart
};
