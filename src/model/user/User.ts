import { Article } from '@model/article';
import Address from './Address';
import SexEnum from './SexEnum';
import UserMeasures from './UserMeasures';
import { Cart, Shipping } from '../cart';
import Area from '../article/Area';

interface User {
  id?: string;
  userName: string;
  email: string;
  cart?: Cart;
  shippings: Shipping[];
  bday: Date;
  sex: SexEnum;
  area: Area;
  measures: UserMeasures;
  favs: Article[];
  addresses: Address[];
}

export default User;
