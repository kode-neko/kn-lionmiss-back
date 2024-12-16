import { ObjectId } from 'mongodb';
import { Shipping, ShippingLine } from '../../../../model';
import ArticleMongo from '../interfaces/ArticleMongo';
import ShippingMongo from '../interfaces/ShippingMongo';
import { parseMongoToArticle } from './article';

function parseShipingToMongo (obj: Shipping): ShippingMongo {
  return {
    _id: new ObjectId(obj.id),
    idTracking: obj.idTracking,
    state: obj.state,
    idPayment: obj.idPayment,
    payment: obj.payment,
    shippingLineList: obj.shippingLineList.map((sl, i) => ({
      order: i.toString(),
      qty: sl.qty,
      article: new ObjectId(sl.article.id)
    }))
  };
}

function parseMongoToShiping (shippingMongo: ShippingMongo, articleMongoList: ArticleMongo[]): Shipping {
  return {
    id: shippingMongo._id.toString(),
    idTracking: shippingMongo.idTracking,
    state: shippingMongo.state,
    idPayment: shippingMongo.idPayment,
    payment: shippingMongo.payment,
    shippingLineList: shippingMongo.shippingLineList.map((cl, i) => {
      const articleFound = articleMongoList
        .find((am) => cl.article.toString() === am._id.toString());
      return {
        order: i,
        qty: cl.qty,
        article: parseMongoToArticle(articleFound as ArticleMongo)
      } as ShippingLine;
    })
  };
}

export {
  parseShipingToMongo,
  parseMongoToShiping
};
