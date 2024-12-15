import { ObjectId } from 'mongodb';
import IArticleMongo from './IArticleMongo';
import IUserMongo from './IUserMongo';

interface CommentMongo {
  _id?: ObjectId;
  title: string;
  article: IArticleMongo['_id'];
  user: IUserMongo['_id'];
  text: string;
  rating: number;
  pics: string[];
}

export default CommentMongo;
