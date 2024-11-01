import { ShipStateEnum, PaymentEnum } from '@model/index';
import IShippingLineMongoose from './IShippingLineMongoose';
import { Types } from 'mongoose';

interface IShippingMongoose {
  _id?: Types.ObjectId;
  idTracking: string;
  idShipping: string;
  state: Partial<Record<ShipStateEnum, Date>>;
  payment: PaymentEnum;
  lines: IShippingLineMongoose[];
}

export default IShippingMongoose;
