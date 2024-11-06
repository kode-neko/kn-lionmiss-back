import { ObjectId } from 'mongodb';
import IAreaMongo from './IAreaMongo';

interface IArticleAreaMongo {
  _id?: ObjectId;
  title: string;
  desc: string;
  price: number;
  tax: number;
  area: IAreaMongo['name'];
}

export default IArticleAreaMongo;
