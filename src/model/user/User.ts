import {Article} from '@model/article';
import Address from './Address';
import SexEnum from './SexEnum';
import Comment from './Comment';
import UserMeasures from './UserMeasures';
import {Cart} from '../cart';

interface User {
  id: string;
  userName: string;
  email: string;
  bday: Date;
  sex: SexEnum;
  measures: UserMeasures;
  commentList: Comment[];
  addressList: Address[];
  favList: Article[];
  cart: Cart;
}

export default User;
