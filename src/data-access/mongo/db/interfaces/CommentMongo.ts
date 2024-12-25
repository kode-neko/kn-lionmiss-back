import { ArticleMongo } from './ArticleMongo';
import { PictureMongo } from './PictureMongo';
import { UserMongo } from './UserMongo';

interface CommentMongo {
  _id?: string;
  title: string;
  body: string;
  rating: number;
  pictureList: PictureMongo[];

  idArticle: ArticleMongo['_id'];
  idUser: UserMongo['_id'];
}

export { CommentMongo };
