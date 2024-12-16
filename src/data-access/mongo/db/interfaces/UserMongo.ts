import { SexEnum } from '@model/index';
import { ObjectId } from 'mongodb';
import AreaMongo from './AreaMongo';
import ArticleMongo from './ArticleMongo';
import CartMongo from './CartMongo';
import ShippingMongo from './ShippingMongo';
import { UnitsHeightEnum, UnitsWeightEnum } from '../../../../model';

interface UserMongo {
  _id: ObjectId;
  userName: string;
  pass: string;
  salt: string;
  email: string;
  bday: Date;
  sex: SexEnum;
  area: AreaMongo['name'];
  measures: {
    shoulder?: number;
    chest?: number;
    waist?: number;
    hips?: number;
    foot?: number;
    height?: number;
    weight?: number;
    unitsHeight: UnitsHeightEnum;
    unitsWeight: UnitsWeightEnum;
  };
  addressList: {
    id: string;
    alias: string;
    name: string;
    surname: string;
    address: string;
    city: string;
    state: string;
    country: string;
    phone: string;
    obs?: string;
  }[];
  favList: ArticleMongo['_id'][];
  cart: CartMongo['_id'];
  shippingList: ShippingMongo['_id'][];
}

export default UserMongo;
