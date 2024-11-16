import { Schema } from 'mongoose';
import { enumPayment, enumShipState } from './utils';
import { IShippingLineMongoose, IShippingMongoose } from '../interfaces';

const shippingLineSchemaMongoose = new Schema<IShippingLineMongoose>({
  id: {
    type: String,
    required: true
  },
  article: {
    type: Schema.Types.ObjectId,
    required: true
  },
  qty: {
    type: Number,
    required: true
  }
});

const shippingSchemaMongoose = new Schema<IShippingMongoose>({
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
    type: String,
    validator: enumPayment,
    required: true
  },
  lines: {
    type: [shippingLineSchemaMongoose],
    required: true
  }
});

export default shippingSchemaMongoose;
