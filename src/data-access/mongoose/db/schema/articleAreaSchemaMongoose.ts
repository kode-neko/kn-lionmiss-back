import { Schema } from 'mongoose';
import areaSchemaMongoose from './areaSchemaMongoose';
import IArticleAreaMongoose from '../interfaces/IArticleAreaMongoose';

const articleAreaSchemaMongoose = new Schema<IArticleAreaMongoose>({
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
    type: areaSchemaMongoose,
    required: true
  }
});

export default articleAreaSchemaMongoose;
