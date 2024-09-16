import {Schema, Types} from 'mongoose';

const commentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  article: {
    type: Types.ObjectId,
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

export default commentSchema;
