import { ShipStateEnum, PaymentEnum } from '@model/index';
import { Types } from 'mongoose';

interface ICartMongoose {
  _id?: Types.ObjectId;
  lines: {
    id: number;
    qty: number;
  }[];
  shipping: {
    idTracking: string;
    idShipping: string;
    state: Partial<Record<ShipStateEnum, Date>>;
    payment: PaymentEnum;
  };
}

export default ICartMongoose;
