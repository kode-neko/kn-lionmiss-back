import {Schema} from 'mongoose';
import areaSchema from './areaSchema';

const articleAreaSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  variant: {
    type: Map,
    of: String
  },
  price: {
    type: Number,
    required: true
  },
  tax: {
    type: String,
    maxlength: 2,
    required: true
  },
  area: {
    type: areaSchema,
    required: true
  }
});

export default articleAreaSchema;
