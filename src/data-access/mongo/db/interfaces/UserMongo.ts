
import { ObjectId } from 'mongodb';
import { ArticleMongo } from './ArticleMongo';
import { AreaMongo } from './AreaMongo';
import { ShippingMongo } from './ShippingMongo';
import {
  SexEnum, UnitsHeightEnum, UnitsWeightEnum
} from '../../../../model';

interface CartLineMongo {
  order: string;
  qty: number;

  article: ObjectId;
}

interface CartMongo {
  id?: string;

  cartLineList: CartLineMongo[];
}

interface MeasuresMongo {
  shoulder?: number;
  chest?: number;
  waist?: number;
  hips?: number;
  foot?: number;
  height?: number;
  weight?: number;
  unitsHeight: UnitsHeightEnum;
  unitsWeight: UnitsWeightEnum;
}

interface AddressMongo {
  id?: string;
  alias: string;
  name: string;
  surname: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  obs?: string;
}

interface UserMongo {
  _id?: ObjectId;
  userName: string;
  pass: string;
  salt: string;
  email: string;
  bday: Date;
  sex: SexEnum;
  area: AreaMongo['name'];
  measures: MeasuresMongo;
  addressList: AddressMongo[];
  favList: ArticleMongo['_id'][];
  cart: CartMongo;
  shippingList: ShippingMongo['_id'][];
}

export {
  CartLineMongo,
  CartMongo,
  MeasuresMongo,
  AddressMongo,
  UserMongo
};
