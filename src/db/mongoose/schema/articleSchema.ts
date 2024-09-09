import {Schema} from 'mongoose';

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
  isntructions: {
    type: Map,
    of: String
  },
  discolor: Boolean
});

export default articleSchema;
