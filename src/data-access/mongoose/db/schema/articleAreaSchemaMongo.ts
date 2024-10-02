import { Schema } from 'mongoose';
import areaSchemaMongo from './areaSchemaMongo';
import IArticleAreaMongo from '../interfaces/IArticleAreaMongo';

const articleAreaSchemaMongo = new Schema<IArticleAreaMongo>({
  title: {
    type: String,
    required: true
  },
  article: {
    type: Schema.Types.ObjectId,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  variants: {
    type: Map,
    of: String
  },
  price: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    maxlength: 2,
    required: true
  },
  area: {
    type: areaSchemaMongo,
    required: true
  }
});

export default articleAreaSchemaMongo;
