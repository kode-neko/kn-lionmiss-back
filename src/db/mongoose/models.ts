import {model} from 'mongoose';
import {
  articleAreaSchema,
  articleSchema,
  cartSchema,
  commentSchema,
  userSchema
} from './schema';

const ArticleArea = model(
  'article_area',
  articleAreaSchema
);
const Article = model(
  'article',
  articleSchema
);
const Cart = model(
  'cart',
  cartSchema
);
const Comment = model(
  'comment',
  commentSchema
);
const User = model(
  'user',
  userSchema
);

export {
  ArticleArea,
  Article,
  Cart,
  Comment,
  User
};
