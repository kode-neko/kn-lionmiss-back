import { Types } from 'mongoose';
import IAreaMongo from './IAreaMongo';

interface IArticleAreaMongo {
  title: string;
  article: Types.ObjectId;
  desc: string;
  variant: Record<string, string>;
  price: number;
  tax: number;
  area: IAreaMongo;
}

export default IArticleAreaMongo;
