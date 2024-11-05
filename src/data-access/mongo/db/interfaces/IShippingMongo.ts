import { ShipStateEnum } from '@model/index';
import { ObjectId } from 'mongodb';
import IArticleMongo from './IArticleMongo';

interface IShippingLineMongo {
  id: string;
  article: IArticleMongo['_id'];
  qty: number;
}

interface IShippingMongo {
  _id?: ObjectId;
  idTracking: string;
  idShipping: string;
  state: Partial<Record<ShipStateEnum, Date>>;
  payment: string;
  lines: IShippingLineMongo[];
}

export default IShippingMongo;
export {
  IShippingLineMongo,
  IShippingMongo
};
