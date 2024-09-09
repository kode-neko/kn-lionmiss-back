import {Schema} from 'mongoose';

const commentSchema = new Schema({
  text: String,
  rating: {
    type: Number,
    maxlength: 1
  },
  pics: [String]
});

export default commentSchema;
