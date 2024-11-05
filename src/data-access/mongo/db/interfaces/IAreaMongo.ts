import { ObjectId } from 'mongodb';

interface IAreaMongo {
  _id?: ObjectId;
  name: string;
  locale: string;
  country: string;
  symbol: string;
}

export default IAreaMongo;
