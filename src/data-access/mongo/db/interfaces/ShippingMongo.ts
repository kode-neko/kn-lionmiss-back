import { ShipStateEnum } from '@model/index';
import { ObjectId } from 'mongodb';
import ArticleMongo from './ArticleMongo';

interface ShippingMongo {
  _id?: ObjectId;
  idTracking: string;
  state: Partial<Record<ShipStateEnum, Date>>;
  idPayment: string;
  payment: string;
  shippingLineList: {
    order: string;
    qty: number;
    article: ArticleMongo['_id'];
  }[];
}

export default ShippingMongo;
