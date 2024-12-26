import { ObjectId } from 'mongodb';
import { ShippingLineMongo, ShippingMongo } from '../interfaces';
import { Shipping, ShippingLine } from '../../../../model';

function parseShippingLineToMongo (shippingLine: ShippingLine): ShippingLineMongo {
  const article = shippingLine.articleId
    ? new ObjectId(shippingLine.articleId)
    : undefined;
  return {
    order: shippingLine.order,
    qty: shippingLine.qty,

    article
  };
}

function parseShippingToMongo (shipping: Shipping): ShippingMongo {
  return {
    _id: new ObjectId(shipping.id),
    idTracking: shipping.idTracking,
    state: shipping.state,
    idPayment: shipping.idPayment,
    payment: shipping.payment,
    shippingLineList: shipping.shippingLineList.map(parseShippingLineToMongo)
  };
}

function parseMongoToShippingLine (mongo: ShippingLineMongo): ShippingLine {
  return {
    order: mongo.order,
    qty: mongo.qty,

    articleId: mongo.article?.toString()
  };
}

function parseMongoToShipping (mongo: ShippingMongo): Shipping {
  return {
    id: mongo._id?.toString(),
    idTracking: mongo.idTracking,
    state: mongo.state,
    idPayment: mongo.idPayment,
    payment: mongo.payment,
    shippingLineList: mongo.shippingLineList.map(parseMongoToShippingLine)
  };
}

export {
  parseShippingLineToMongo,
  parseShippingToMongo,
  parseMongoToShippingLine,
  parseMongoToShipping
};
