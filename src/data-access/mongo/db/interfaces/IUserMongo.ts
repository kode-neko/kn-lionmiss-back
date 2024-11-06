import {
  UnitsHeightEnum, UnitsWeightEnum, SexEnum
} from '@model/index';
import { ObjectId } from 'mongodb';
import IArticleMongo from './IArticleMongo';
import IAreaMongo from './IAreaMongo';
import ICartMongo from './ICartMongo';

interface IUserMeasuresMongo {
  shoulder: string;
  chest: string;
  waist: string;
  hips: string;
  foot: string;
  height: string;
  weight: string;
  unitsHeight: UnitsHeightEnum;
  unitsWeight: UnitsWeightEnum;
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
  email: string;
  cart: ICartMongo['_id'];
  shippings: string;
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
