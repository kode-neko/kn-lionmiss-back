import { Types } from 'mongoose';

interface ICommentMongoose {
  _id?: Types.ObjectId;
  article: Types.ObjectId;
  user: string;
  title: string;
  text: string;
  rating: number;
  pics: string[];
}

export default ICommentMongoose;
