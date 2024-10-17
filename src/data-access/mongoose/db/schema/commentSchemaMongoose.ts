import { Schema } from 'mongoose';
import { ICommentMongoose } from '../interfaces';

const commentSchemaMongoose = new Schema<ICommentMongoose>({
  article: {
    type: Schema.Types.ObjectId,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
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
