import { ObjectId } from 'mongodb';
import PictureMongo from './PictureMongo';
import ArticleMongo from './ArticleMongo';
import UserMongo from './UserMongo';

interface CommentMongo {
  _id: ObjectId;
  title: string;
  body: string;
  rating: number;
  pictureList: PictureMongo[];
  idArticle: ArticleMongo['_id'];
  idUser: UserMongo['_id'];
}

export default CommentMongo;
