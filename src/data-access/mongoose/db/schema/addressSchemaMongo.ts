import { Schema } from 'mongoose';
import IAddressMongo from '../interfaces/IAddressMongo';

const addressSchemaMongo = new Schema<IAddressMongo>({
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

export default addressSchemaMongo;
