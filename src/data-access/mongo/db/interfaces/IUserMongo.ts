import { User } from '@model/article';
import { ObjectId } from 'mongodb';

interface IUserMongo extends User {
  _id: ObjectId;
  cart: ObjectId;
  favs: ObjectId[];
}

export default IUserMongo;
