import {Schema} from 'mongoose';
import {enumInstruct} from './utils';

const articleSchema = new Schema({
  tags: [String],
  sizes: {
    type: Map,
    of: Number
  },
  variant: {
    type: Map,
    of: String
  },
  materials: {
    type: Map,
    of: String
  },
  instructs: {
    type: Map,
    of: String,
    validator: enumInstruct
  },
  discolor: Boolean
});

export default articleSchema;
