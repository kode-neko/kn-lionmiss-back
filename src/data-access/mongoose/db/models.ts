import { model } from 'mongoose';
import {
  areaSchemaMongoose,
  articleAreaSchemaMongoose,
  articleSchemaMongoose,
  cartSchemaMongoose,
  commentSchemaMongoose,
  shippingSchemaMongoose,
  userSchemaMongoose
} from './schema';

const AreaModelMongoose = model(
  'area',
  areaSchemaMongoose,
  'area'
);
const ArticleAreaModelMongoose = model(
  'articleArea',
  articleAreaSchemaMongoose,
  'articleArea'
);
const ArticleModelMongoose = model(
  'article',
  articleSchemaMongoose,
  'article'
);
const CartModelMongoose = model(
  'cart',
  cartSchemaMongoose,
  'cart'
);
const ShippingModelMongoose = model(
  'shipping',
  shippingSchemaMongoose,
  'shipping'
);
const CommentModelMongoose = model(
  'comment',
  commentSchemaMongoose,
  'comment'
);
const UserModelMongoose = model(
  'user',
  userSchemaMongoose,
  'user'
);

export {
  AreaModelMongoose,
  ArticleAreaModelMongoose,
  ArticleModelMongoose,
  CartModelMongoose,
  ShippingModelMongoose,
  CommentModelMongoose,
  UserModelMongoose
};
