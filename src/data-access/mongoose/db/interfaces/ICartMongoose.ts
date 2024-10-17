import { Types } from 'mongoose';
import ICartLineMongoose from './ICartLineMongoose';

interface ICartMongoose {
  _id?: Types.ObjectId;
  lines: ICartLineMongoose[];
  user: string;
}

export default ICartMongoose;
