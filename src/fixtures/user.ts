import {User} from '@model/index';
import casual from 'casual';
import {cart} from './cart';
import {
  SexEnum, UnitsHeightEnum, UnitsWeightEnum
} from '../model';
import {areaList} from './area';

const user: User = {
  userName: casual.name,
  email: casual.email,
  bday: new Date(),
  sex: SexEnum.FEMALE,
  area: areaList[0],
  measures: {
    unitsHeight: UnitsHeightEnum.CM,
    unitsWeight: UnitsWeightEnum.KG
  },
  commentList: [],
  addressList: [],
  favList: [],
  cart: cart
};

export {user};
