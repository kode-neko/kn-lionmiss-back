import { SexEnum } from '@model/index';
import { ObjectId } from 'mongodb';
import AreaMongo from './AreaMongo';
import ArticleMongo from './ArticleMongo';
import CartMongo from './CartMongo';
import ShippingMongo from './ShippingMongo';

interface UserMongo {
  _id?: ObjectId;
  userName: string;
  pass: string;
  salt: string;
  email: string;
  bday: Date;
  sex: SexEnum;
  area: AreaMongo['name'];
  measures: {
    shoulder?: string;
    chest?: string;
    waist?: string;
    hips?: string;
    foot?: string;
    height?: string;
    weight?: string;
    unitsHeight: string;
    unitsWeight: string;
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
