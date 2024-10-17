import { Schema } from 'mongoose';
import { IAreaMongoose } from '../interfaces';

const areaSchemaMongoose = new Schema<IAreaMongoose>({
  name: {
    type: String,
    required: true
  },
  locale: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    maxlength: 1,
    required: true
  }
});

export default areaSchemaMongoose;
