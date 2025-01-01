import { ObjectId } from 'mongodb';
import { ArticleMongo } from './ArticleMongo';
import { PaymentEnum, ShipStateEnum } from '../../../../model';

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
