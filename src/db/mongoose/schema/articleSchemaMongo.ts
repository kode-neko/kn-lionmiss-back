import { Schema } from 'mongoose';
import { enumInstruct } from './utils';
import IArticleMongo from '../interfaces/IArticleMongo';

const articleSchemaMongo = new Schema<IArticleMongo>({
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
    of: String,
    required: true
  },
  variants: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  discolor: {
    type: Boolean,
    required: true
  }
}, { id: true });

export default articleSchemaMongo;
