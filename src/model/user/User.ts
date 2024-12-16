import { Article } from '../article';
import Address from './Address';
import SexEnum from './SexEnum';
import Measures from './Measures';
import { Cart, Shipping } from '../cart';
import Area from '../article/Area';

interface User {
  id: string;
  userName: string;
  pass: string;
  salt: string;
  email: string;
  bday: Date;
  sex: SexEnum;
  area: Area;
  measures: Measures;
  addressList: Address[];
  favList: Article[];
  cart: Cart;
  shippingList: Shipping[];
}

export default User;
