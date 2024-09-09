import {Schema} from 'mongoose';
import {enumPayment, enumShipState} from './utils';

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
      of: Date,
      validator: enumShipState
    },
    payment: {
      type: Map,
      of: Date,
      validator: enumPayment
    }
  }
});

export default cartSchema;
