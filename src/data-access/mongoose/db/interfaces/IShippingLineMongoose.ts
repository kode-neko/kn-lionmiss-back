import { Types } from 'mongoose';

interface IShippingLineMongoose {
  id: string;
  article: Types.ObjectId;
  qty: number;
}

export default IShippingLineMongoose;
