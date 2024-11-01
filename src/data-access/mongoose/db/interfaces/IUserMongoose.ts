import { Types } from 'mongoose';
import { UnitsHeightEnum, UnitsWeightEnum } from '@model/index';
import IAddressMongoose from './IAddressMongoose';
import ICommentMongoose from './ICommentMongoose';

interface IUserMongo {
  _id?: Types.ObjectId;
  userName: string;
  email: string;
  cart?: Types.ObjectId;
  shippings: Types.ObjectId[];
  bday: Date;
  sex: string;
  area: string;
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
  favs: Types.ObjectId[];
  addresses: IAddressMongoose[];
}

export default IUserMongo;
