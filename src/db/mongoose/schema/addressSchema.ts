import {Schema} from 'mongoose';

const addressSchema = new Schema({
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

export default addressSchema;
