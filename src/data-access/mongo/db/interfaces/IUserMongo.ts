import {
  UnitsHeightEnum, UnitsWeightEnum, SexEnum
} from '@model/index';
import { ObjectId } from 'mongodb';
import IArticleMongo from './IArticleMongo';
import IAreaMongo from './IAreaMongo';
import ICartMongo from './ICartMongo';
import IShippingMongo from './IShippingMongo';

interface IUserMeasuresMongo {
  shoulder: number;
  chest: number;
  waist: number;
  hips: number;
  foot: number;
  height: number;
  weight: number;
  unitsHeight: string;
  unitsWeight: string;
}

interface IAddressMongo {
  alias: string;
  name: string;
  surname: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  obs: string;
}

interface IUserMongo {
  _id?: ObjectId;
  userName: string;
  pass: string;
  salt: string;
  google?: string;
  twitter?: string;
  email: string;
  cart: ICartMongo['_id'];
  shippings: IShippingMongo['_id'][];
  bday: Date;
  sex: SexEnum;
  area: IAreaMongo['name'];
  measures: IUserMeasuresMongo;
  favs: IArticleMongo['_id'][];
  addresses: IAddressMongo[];
}

export default IUserMongo;
export {
  IUserMeasuresMongo,
  IAddressMongo,
  IUserMongo
};
