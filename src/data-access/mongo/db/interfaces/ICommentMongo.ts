import { Comment } from '@model/article';
import { ObjectId } from 'mongodb';

interface ICommentMongo extends Omit<Comment, 'id'> {
  _id?: ObjectId;
}

export default ICommentMongo;
