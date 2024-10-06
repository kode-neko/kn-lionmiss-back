import { ShipStateEnum, PaymentEnum } from '@model/index';
import { ObjectId } from 'mongodb';

interface ICartMongo {
  _id: ObjectId;
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

export default ICartMongo;
