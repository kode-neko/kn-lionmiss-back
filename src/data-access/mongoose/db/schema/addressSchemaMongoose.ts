import { Schema } from 'mongoose';
import IAddressMongoose from '../interfaces/IAddressMongoose';

const addressSchemaMongoose = new Schema<IAddressMongoose>({
  alias: String,
  name: String,
  surname: String,
  address: String,
  city: String,
  state: String,
  country: String,
  phone: Number,
  obs: String
});

export default addressSchemaMongoose;
