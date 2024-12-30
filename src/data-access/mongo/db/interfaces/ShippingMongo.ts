import { ObjectId } from 'mongodb';
import { ShipStateEnum, PaymentEnum } from '@model/index';
import { ArticleMongo } from './ArticleMongo';

interface ShippingLineMongo {
  order: string;
  qty: number;

  article?: ArticleMongo['_id'];
}

interface ShippingMongo {
  _id?: ObjectId;
  idTracking?: string;
  state?: Partial<Record<ShipStateEnum, Date>>;
  idPayment?: string;
  payment?: PaymentEnum;
  shippingLineList: ShippingLineMongo[];
}

export {
  ShippingLineMongo,
  ShippingMongo
};
