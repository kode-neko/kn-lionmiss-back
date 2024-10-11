import { model } from 'mongoose';
import {
  articleAreaSchemaMongoose,
  articleSchemaMongoose,
  cartSchemaMongoose,
  commentSchemaMongoose,
  userSchemaMongoose
} from './schema';

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
  ArticleAreaModelMongoose,
  ArticleModelMongoose,
  CartModelMongoose,
  CommentModelMongoose,
  UserModelMongoose
};
