import { Schema } from 'mongoose';
import addressSchemaMongo from './addressSchemaMongo';
import commentSchemaMongo from './commentSchemaMongo';
import {
  enumSex, enumUnitsHeight, enumUnitsWeight
} from './utils';
import IUserMongo from '../interfaces/IUserMongo';

const userSchemaMongo = new Schema<IUserMongo>({
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
    type: [addressSchemaMongo],
    required: true
  },
  commentList: {
    type: [commentSchemaMongo],
    required: true
  },
  favs: {
    type: [Schema.Types.ObjectId],
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

export default userSchemaMongo;
