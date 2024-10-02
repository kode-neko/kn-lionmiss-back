import { model } from 'mongoose';
import {
  articleAreaSchemaMongo,
  articleSchemaMongo,
  cartSchemaMongo,
  commentSchemaMongo,
  userSchemaMongo
} from './schema';

const ArticleAreaModelMongo = model(
  'articleArea',
  articleAreaSchemaMongo,
  'articleArea'
);
const ArticleModelMongo = model(
  'article',
  articleSchemaMongo,
  'article'
);
const CartModelMongo = model(
  'cart',
  cartSchemaMongo,
  'cart'
);
const CommentModelMongo = model(
  'comment',
  commentSchemaMongo,
  'comment'
);
const UserModelMongo = model(
  'user',
  userSchemaMongo,
  'user'
);

export {
  ArticleAreaModelMongo,
  ArticleModelMongo,
  CartModelMongo,
  CommentModelMongo,
  UserModelMongo
};
