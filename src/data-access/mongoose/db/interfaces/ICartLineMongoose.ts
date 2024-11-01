import { Types } from 'mongoose';

interface ICartLineMongoose {
  id: string;
  article: Types.ObjectId;
  qty: number;
}

export default ICartLineMongoose;
