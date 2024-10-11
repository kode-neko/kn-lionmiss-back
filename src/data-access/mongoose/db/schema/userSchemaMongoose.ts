import { Schema } from 'mongoose';
import addressSchemaMongoose from './addressSchemaMongoose';
import commentSchemaMongoose from './commentSchemaMongoose';
import {
  enumSex, enumUnitsHeight, enumUnitsWeight
} from './utils';
import IUserMongoose from '../interfaces/IUserMongoose';

const userSchemaMongoose = new Schema<IUserMongoose>({
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
    type: [addressSchemaMongoose],
    required: true
  },
  commentList: {
    type: [commentSchemaMongoose],
    required: true
  },
  favs: {
    type: [Schema.Types.ObjectId],
    required: true
  },
  cart: {
    type: Schema.Types.ObjectId,
    required: true
  },
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

export default userSchemaMongoose;
