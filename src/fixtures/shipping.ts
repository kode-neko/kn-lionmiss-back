import casual from 'casual';
import {
  PaymentEnum, Shipping, ShipStateEnum
} from '../model';

const shipping: Shipping = {
  idTracking: casual.rgb_hex,
  idShipping: casual.rgb_hex,
  state: {[ShipStateEnum.ORDER_RECIEVED]: new Date()},
  payment: PaymentEnum.CARD
};

export {shipping};
