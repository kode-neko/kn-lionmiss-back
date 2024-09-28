import { Types } from 'mongoose';

interface ICommentMongo {
  title: string;
  text: string;
  article: Types.ObjectId;
  rating: number;
  pics: string[];
}

export default ICommentMongo;
