import { Types } from 'mongoose';

interface IArticleAreaMongoose {
  _id?: Types.ObjectId;
  title: string;
  desc: string;
  price: number;
  tax: number;
  area: string;
}

export default IArticleAreaMongoose;
