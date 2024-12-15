import { ObjectId } from 'mongodb';
import IAreaMongo from './IAreaMongo';

interface ArticleAreaMongo {
  _id: ObjectId;
  title: string;
  desc: string;
  variantList: Record<string, string>;
  price: number;
  tax: number;
  area: IAreaMongo['name'];
}

export default ArticleAreaMongo;
