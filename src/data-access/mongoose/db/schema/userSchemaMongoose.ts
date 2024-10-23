import { Schema } from 'mongoose';
import {
  enumSex, enumUnitsHeight, enumUnitsWeight
} from './utils';
import { IUserMeasuresMongoose, IUserMongoose } from '../interfaces';
import addressSchemaMongoose from './addressSchemaMongoose';

const userMeasuresSchemaMongoose = new Schema<IUserMeasuresMongoose>({
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
});

const userSchemaMongoose = new Schema<IUserMongoose>({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: Schema.Types.ObjectId,
  shippings: {
    type: [Schema.Types.ObjectId],
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
  area: {
    type: String,
    required: true
  },
  measures: {
    type: userMeasuresSchemaMongoose,
    required: true
  },
  favs: {
    type: [Schema.Types.ObjectId],
    required: true
  },
  addresses: {
    type: [addressSchemaMongoose],
    required: true
  }
});

export default userSchemaMongoose;
