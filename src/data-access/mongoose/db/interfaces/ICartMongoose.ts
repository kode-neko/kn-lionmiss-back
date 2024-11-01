import { Types } from 'mongoose';
import ICartLineMongoose from './ICartLineMongoose';

interface ICartMongoose {
  _id?: Types.ObjectId;
  lines: ICartLineMongoose[];
}

export default ICartMongoose;
