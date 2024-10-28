import { Schema } from 'mongoose';
import { ICartLineMongoose, ICartMongoose } from '../interfaces';

const cartLineSchema = new Schema<ICartLineMongoose>({
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

const cartSchemaMongoose = new Schema<ICartMongoose>({
  lines: {
    type: [cartLineSchema],
    required: true
  }
});

export default cartSchemaMongoose;
