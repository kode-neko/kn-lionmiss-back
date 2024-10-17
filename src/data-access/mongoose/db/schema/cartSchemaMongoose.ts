import { Schema } from 'mongoose';
import { ICartLineMongoose, ICartMongoose } from '../interfaces';

const cartLineSchema = new Schema<ICartLineMongoose>({
  id: String,
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
  },
  user: {
    type: String,
    required: true
  }
});

export default cartSchemaMongoose;
