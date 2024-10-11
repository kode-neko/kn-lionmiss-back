import { Types } from 'mongoose';
import IAreaMongoose from './IAreaMongoose';

interface IArticleAreaMongoose {
  id?: Types.ObjectId;
  title: string;
  article: Types.ObjectId;
  desc: string;
  variants: Map<string, string>;
  price: number;
  tax: number;
  area: IAreaMongoose;
}

export default IArticleAreaMongoose;
