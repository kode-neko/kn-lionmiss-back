import {Schema, Types} from 'mongoose';
import addressSchema from './addressSchema';
import commentSchema from './commentSchema';
import {
  enumSex, enumUnitsHeight, enumUnitsWeight
} from './utils';

const userSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  bday: {
    type: Date,
    required: true
  },
  sex: {
    type: String,
    validator: enumSex,
    required: true
  },
  addresses: {
    type: [addressSchema],
    required: true
  },
  commentList: {
    type: [commentSchema],
    required: true
  },
  favs: {
    type: [Types.ObjectId],
    required: true
  },
  measures: {
    shoulder: {
      type: Number,
      required: true
    },
    chest: {
      type: Number,
      required: true
    },
    waist: {
      type: Number,
      required: true
    },
    hips: {
      type: Number,
      required: true
    },
    foot: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    weight: {
      type: Number,
      required: true
    },
    unitsHeight: {
      type: String,
      validator: enumUnitsHeight,
      required: true
    },
    unitsWeight: {
      type: String,
      validator: enumUnitsWeight,
      required: true
    }
  }
});

export default userSchema;
