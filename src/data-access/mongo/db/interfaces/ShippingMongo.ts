import { ShipStateEnum } from '@model/index';
import { ObjectId } from 'mongodb';
import ArticleMongo from './ArticleMongo';
import { PaymentEnum } from '../../../../model';

interface ShippingMongo {
  _id?: ObjectId;
  idTracking?: string;
  state: Partial<Record<ShipStateEnum, Date>>;
  idPayment?: string;
  payment?: PaymentEnum;
  shippingLineList: {
    order: string;
    qty: number;
    article: ArticleMongo['_id'];
  }[];
}

export default ShippingMongo;
