import { Types } from 'mongoose';
import IAddressMongo from './IAddressMongo';
import ICommentMongo from './ICommentMongo';
import { UnitsHeightEnum, UnitsWeightEnum } from '@model/index';

interface IUserMongo {
  _id?: Types.ObjectId;
  userName: string;
  email: string;
  bday: Date;
  sex: string;
  addresses: IAddressMongo[];
  commentList: ICommentMongo[];
  favs: Types.ObjectId[];
  cart: Types.ObjectId;
  measures: {
    shoulder: number;
    chest: number;
    waist: number;
    hips: number;
    foot: number;
    height: number;
    weight: number;
    unitsHeight: UnitsHeightEnum;
    unitsWeight: UnitsWeightEnum;
  };
}

export default IUserMongo;
