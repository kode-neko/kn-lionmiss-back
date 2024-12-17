import { ObjectId } from 'mongodb';

interface AreaMongo {
  _id?: ObjectId;
  name: string;
  country: string;
  locale: string;
  currency: string;
  dateFormat: string;
  gen: boolean;
}

export default AreaMongo;
