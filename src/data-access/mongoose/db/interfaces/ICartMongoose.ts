import { Types } from 'mongoose';
import ICartLineMongoose from './ICartLineMongoose';
import IShippingMongoose from './IShippingMongoose';

interface ICartMongoose {
  _id?: Types.ObjectId;
  lines: ICartLineMongoose[];
  shipping: IShippingMongoose;
}

export default ICartMongoose;
