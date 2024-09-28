import { Schema } from 'mongoose';
import { enumPayment, enumShipState } from './utils';
import ICartMongo from '../interfaces/ICartMongo';

const cartSchemaMongo = new Schema<ICartMongo>({
  lines: {
    type: [{
      id: Number,
      qty: Number
    }],
    required: true
  },
  shipping: {
    idTracking: {
      type: String,
      required: true
    },
    idShipping: {
      type: String,
      required: true
    },
    state: {
      type: Map,
      of: Date,
      validator: enumShipState,
      required: true
    },
    payment: {
      type: Map,
      of: Date,
      validator: enumPayment,
      required: true
    }
  }
});

export default cartSchemaMongo;
