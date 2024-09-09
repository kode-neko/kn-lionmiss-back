import {Schema} from 'mongoose';
import areaSchema from './areaSchema';

const articleAreaSchema = new Schema({
  title: String,
  desc: String,
  price: Number,
  tax: Number,
  area: areaSchema
});

export default articleAreaSchema;
