import { Types } from 'mongoose';

interface ICommentMongoose {
  _id?: Types.ObjectId;
  title: string;
  text: string;
  rating: number;
  pics: string[];
  article: Types.ObjectId;
}

export default ICommentMongoose;
