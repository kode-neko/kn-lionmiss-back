import { Types } from 'mongoose';

interface IAreaMongo {
  _id?: Types.ObjectId;
  name: string;
  country: string;
  symbol: string;
}

export default IAreaMongo;
