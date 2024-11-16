import { ObjectId } from 'mongodb';
import IArticleMongo from './IArticleMongo';

interface ICartLineMongo {
  id: string;
  qty: number;
  article: IArticleMongo['_id'];
}

interface ICartMongo {
  _id?: ObjectId;
  lines: ICartLineMongo[];
}

export default ICartMongo;
export {
  ICartLineMongo,
  ICartMongo
};
