import { Types } from 'mongoose';

interface ICartLineMongoose {
  id?: number;
  article: Types.ObjectId;
  qty: number;
}

export default ICartLineMongoose;
