import { Schema } from 'mongoose';
import { IAreaMongoose } from '../interfaces';

const areaSchemaMongoose = new Schema<IAreaMongoose>({
  name: String,
  country: String,
  symbol: {
    type: String,
    maxlength: 1
  }
});

export default areaSchemaMongoose;
