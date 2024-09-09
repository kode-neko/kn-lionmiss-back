import {Schema} from 'mongoose';

const cartSchema = new Schema({
  lines: [{
    id: Number,
    qty: Number
  }],
  shipping: {
    idTracking: String,
    idShipping: String,
    state: {
      type: Map,
      of: String
    },
    payment: String
  }
});

export default cartSchema;
