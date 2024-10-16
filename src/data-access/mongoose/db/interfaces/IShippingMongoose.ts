import { ShipStateEnum, PaymentEnum } from '@model/index';

interface IShippingMongoose {
  idTracking: string;
  idShipping: string;
  state: Partial<Record<ShipStateEnum, Date>>;
  payment: PaymentEnum;
}

export default IShippingMongoose;
