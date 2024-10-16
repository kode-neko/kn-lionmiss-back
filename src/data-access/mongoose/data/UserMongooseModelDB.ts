import { User } from '@model/index';
import { Types } from 'mongoose';
import { IModelDB, IModelDBUser } from '../../interfaces';
import {
  UserAreaModelMongoose, UserModelMongoose, IUserAreaMongoose, IUserMongoose
} from '../db';
import { NotFoundDbException } from '../../error';
import UserAreaMongooseModelDB from './UserAreaMongooseModelDB';

class UserMongooseModelDB implements IModelDBUser {

  private static instance: IModelDBUser;

  public static getIntance (): IModelDBUser {
    if (!UserMongooseModelDB.instance) {
      UserMongooseModelDB.instance = new UserMongooseModelDB();
    }
    return UserMongooseModelDB.instance;
  }

  private constructor () {

  }

  public static parseUserToMongoose (article: User): IUserMongoose {
    return {
      _id: new Types.ObjectId(article.id),
      instructs: new Map(Object.entries(article.instructs)),
      sizes: new Map(Object.entries(article.sizes)),
      materials: new Map(Object.entries(article.materials)),
      tags: article.tags,
      variants: article.variants,
      discolor: article.discolor
    };
  }

  public static parseMongooseToUser (mongo: IUserMongoose): User {
    return {
      id: mongo._id?.toString(),
      instructs: Object.fromEntries(mongo.instructs),
      sizes: Object.fromEntries(mongo.sizes),
      materials: Object.fromEntries(mongo.materials),
      tags: mongo.tags,
      variants: mongo.variants,
      discolor: mongo.discolor,
      articleAreaList: []
    };
  }

  read (id: string): NotFoundDbException | Promise<User> {
    throw new Error('Method not implemented.');
  }

}

export default UserMongooseModelDB;
