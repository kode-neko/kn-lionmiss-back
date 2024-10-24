import { Schema } from 'mongoose';
import { enumInstruct } from './utils';
import IArticleMongoose from '../interfaces/IArticleMongoose';

const articleSchemaMongoose = new Schema<IArticleMongoose>({
  instructs: {
    type: Map,
    of: String,
    validator: enumInstruct,
    required: true
  },
  sizes: {
    type: Map,
    of: Number,
    required: true
  },
  materials: {
    type: Map,
    of: Number,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  variants: {
    type: [String],
    required: true
  },
  discolor: {
    type: Boolean,
    required: true
  }
}, { id: true });

export default articleSchemaMongoose;
