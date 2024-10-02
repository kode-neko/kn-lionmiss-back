import { Types } from 'mongoose';
import IAreaMongo from './IAreaMongo';

interface IArticleAreaMongo {
  title: string;
  article: Types.ObjectId;
  desc: string;
  variants: Map<string, string>;
  price: number;
  tax: number;
  area: IAreaMongo;
}

export default IArticleAreaMongo;
