import { ShipStateEnum, PaymentEnum } from '@model/index';
import IShippingLineMongoose from './IShippingLineMongoose';

interface IShippingMongoose {
  _id?: string;
  idTracking: string;
  idShipping: string;
  state: Partial<Record<ShipStateEnum, Date>>;
  payment: PaymentEnum;
  lines: IShippingLineMongoose[];
}

export default IShippingMongoose;
