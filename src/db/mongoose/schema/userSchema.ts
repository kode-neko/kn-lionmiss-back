import {Schema} from 'mongoose';
import addressSchema from './addressSchema';
import commentSchema from './commentSchema';

const userSchema = new Schema({
  userName: String,
  email: String,
  bday: Date,
  sex: String,
  addresses: [addressSchema],
  commentList: [commentSchema],
  measures: {
    shoulder: Number,
    chest: Number,
    waist: Number,
    hips: Number,
    foot: Number,
    height: Number,
    weight: Number,
    unitsHeight: String,
    unitsWeight: String
  }
});

export default userSchema;
