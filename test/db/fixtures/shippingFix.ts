import { ObjectId } from 'mongodb';
import {
  ArticleMongo, ShippingLineMongo, ShippingMongo
} from '../../../src/data-access';

function createFixShippingLineMongo (article: ArticleMongo['_id']): ShippingLineMongo {
  return {
    order: faker.string.ulid(),
    qty: faker.number.int(),

    article
  };
}

function createFixShippingMongo (articleList: ArticleMongo['_id'][]): ShippingMongo {
  return {
    _id: new ObjectId(),

    idTracking: faker.string.alphanumeric(),
    state: {},
    idPayment: faker.string.alphanumeric(),
    payment: PaymentEnum.CARD,
    shippingLineList: articleList.map(createFixShippingLineMongo)
  };
}

export {
  createFixShippingLineMongo,
  createFixShippingMongo
};