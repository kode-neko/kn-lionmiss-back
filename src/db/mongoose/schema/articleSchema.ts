import {Schema} from 'mongoose';
import {enumInstruct} from './utils';

const articleSchema = new Schema({
  tags: {
    type: [String],
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
  instructs: {
    type: Map,
    of: String,
    validator: enumInstruct,
    required: true
  },
  discolor: {
    type: Boolean,
    required: true
  }
});

export default articleSchema;
