import { Schema, Types } from 'mongoose';
import ICommentMongoose from '../interfaces/ICommentMongoose';

const commentSchemaMongoose = new Schema<ICommentMongoose>({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  article: {
    type: Schema.Types.ObjectId,
    required: true
  },
  rating: {
    type: Number,
    maxlength: 1
  },
  pics: {
    type: [String],
    required: true
  }
});

export default commentSchemaMongoose;
