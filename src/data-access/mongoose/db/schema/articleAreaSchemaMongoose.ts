import { Schema } from 'mongoose';
import { IArticleAreaMongoose } from '../interfaces';

const articleAreaSchemaMongoose = new Schema<IArticleAreaMongoose>({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
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
    type: String,
    required: true
  }
});

export default articleAreaSchemaMongoose;
