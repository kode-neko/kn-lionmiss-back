import { Schema } from 'mongoose';
import { enumPayment, enumShipState } from './utils';
import ICartMongoose from '../interfaces/ICartMongoose';

const cartSchemaMongoose = new Schema<ICartMongoose>({
  lines: {
    type: [{
      id: Number,
      article: Schema.Types.ObjectId,
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

export default cartSchemaMongoose;
