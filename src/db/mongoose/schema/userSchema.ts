import {Schema} from 'mongoose';
import addressSchema from './addressSchema';
import commentSchema from './commentSchema';
import {
  enumSex, enumUnitsHeight, enumUnitsWeight
} from './utils';

const userSchema = new Schema({
  userName: String,
  email: String,
  bday: Date,
  sex: {
    type: String,
    validator: enumSex
  },
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
    unitsHeight: {
      type: String,
      validator: enumUnitsHeight
    },
    unitsWeight: {
      type: String,
      validator: enumUnitsWeight
    }
  }
});

export default userSchema;
