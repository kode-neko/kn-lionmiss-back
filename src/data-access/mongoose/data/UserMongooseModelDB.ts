import { User } from '@model/index';
import { Types } from 'mongoose';
import { IModelDBUser } from '../../interfaces';
import { UserModelMongoose, IUserMongoose } from '../db';
import { NotFoundDbException } from '../../error';

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

  public static parseUserToMongoose (user: User): IUserMongoose {
    return {
      _id: new Types.ObjectId(user.id),
      userName: user.userName,
      email: user.email,
      cart: new Types.ObjectId(user.cart.id),
      shippings: user.shippings.map((s) => new Types.ObjectId(s.id)),
      bday: user.bday,
      sex: user.sex,
      area: user.area.name,
      measures: { ...user.measures },
      favs: user.favs.map((s) => new Types.ObjectId(s.id)),
      addresses: user.address
    };
  }

  public static parseMongooseToUser (mongo: IUserMongoose): User {
    return {
      _id: mongo._id?.toString(),
      userName: mongo.userName,
      email: mongo.email,
      cart: new Types.ObjectId(mongo.cart._id),
      shippings: mongo.shippings.map((s) => new Types.ObjectId(s._id)),
      bday: mongo.bday,
      sex: mongo.sex,
      // area: ,
      measures: mongo.measures,
      favs: [],
      addressList: mongo.addresses,
      commentList: []
    };
  }

  read (id: string): Promise<User> | NotFoundDbException {
    return UserModelMongoose
      .findOne({
        $or: [{ _id: id },
          { userName: id }]
      })
      .then((res) => {
        if (!res) throw new NotFoundDbException();
        return UserMongooseModelDB.parseMongooseToUser(res);
      });
  }

}

export default UserMongooseModelDB;
