import { Types } from 'mongoose';

interface IShippingLineMongoose {
  id: number;
  article: Types.ObjectId;
  qty: number;
}

export default IShippingLineMongoose;
