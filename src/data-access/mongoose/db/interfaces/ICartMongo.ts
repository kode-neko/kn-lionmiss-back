import { ShipStateEnum, PaymentEnum } from '@model/index';

interface ICartMongo {
  lines:
  {
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
