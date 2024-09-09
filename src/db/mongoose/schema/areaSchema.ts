import {Schema} from 'mongoose';

const areaSchema = new Schema({
  name: String,
  country: String,
  symbol: {
    type: String,
    maxlength: 1
  }
});

export default areaSchema;
