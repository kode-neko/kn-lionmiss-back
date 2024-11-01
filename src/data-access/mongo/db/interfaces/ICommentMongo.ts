import { ObjectId } from 'mongodb';
import IArticleMongo from './IArticleMongo';
import IUserMongo from './IUserMongo';

interface ICommentMongo {
  _id?: ObjectId;
  article: IArticleMongo['_id'];
  user: IUserMongo['_id'];
  text: string;
  rating: number;
  pics: string[];
}

export default ICommentMongo;
