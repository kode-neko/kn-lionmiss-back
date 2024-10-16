import { Types } from 'mongoose';
import IAreaMongoose from './IAreaMongoose';

interface IArticleAreaMongoose {
  _id?: Types.ObjectId;
  article: Types.ObjectId;
  title: string;
  desc: string;
  price: number;
  tax: number;
  area: IAreaMongoose;
}

export default IArticleAreaMongoose;
