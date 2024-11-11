import {
  User, SexEnum, Address
} from '@model/index';
import { IModelDBUser } from '../../interfaces';
import {
  IAddressMongoose, IAreaMongoose, IArticleMongoose, ICartMongoose, IShippingMongoose, IUserMongoose
} from '../db/interfaces';
import CartMongooseModelDB from './CartMongooseModelDB';
import ShippingMongooseModelDB from './ShippingMongooseModelDB';
import { NotFoundDbException } from '../../error';
import {
  AreaModelMongoose, ArticleModelMongoose, CartModelMongoose, UserModelMongoose
} from '../db/models';
import { Types } from 'mongoose';

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
      cart: user.cart && new Types.ObjectId(user.cart.id),
      shippings: user.shippings.map((s) => new Types.ObjectId(s.id)),
      bday: user.bday,
      sex: user.sex,
      area: user.area.name,
      measures: { ...user.measures },
      favs: user.favs.map((s) => new Types.ObjectId(s.id)),
      addresses: user.addresses.map((a) => UserMongooseModelDB.parseAddressToMongoose(a))
    };
  }

  public static parseMongooseToUser (
    mongo: IUserMongoose,
    areaMongoose: IAreaMongoose,
    cartMongoose?: ICartMongoose,
    shippingMongoose?: IShippingMongoose[],
    cartArticleListMongoose?: IArticleMongoose[],
    shippingArticleListMongoose?: IArticleMongoose[]
  ): User {
    return {
      id: mongo._id?.toString(),
      userName: mongo.userName,
      email: mongo.email,
      cart: cartMongoose &&
        CartMongooseModelDB.parseMongooseToCart(
          cartMongoose,
          cartArticleListMongoose || []
        ),
      shippings: shippingMongoose &&
        shippingMongoose.map((s) => ShippingMongooseModelDB.parseMongooseToShipping(
          s,
          shippingArticleListMongoose || []
        )),
      bday: mongo.bday,
      sex: SexEnum[mongo.sex],
      area: areaMongoose,
      measures: mongo.measures,
      favs: [],
      addresses: mongo.addresses.map((a) => UserMongooseModelDB.parseMongooseToAddress(a))
    };
  }

  public static parseAddressToMongoose (address: Address): IAddressMongoose {
    return {
      alias: address.alias,
      name: address.name,
      surname: address.surname,
      address: address.address,
      city: address.city,
      state: address.state,
      country: address.country,
      phone: address.phone,
      obs: address.obs
    };
  }

  public static parseMongooseToAddress (mongo: IAddressMongoose): Address {
    return {
      alias: mongo.alias,
      name: mongo.name,
      surname: mongo.surname,
      address: mongo.address,
      city: mongo.city,
      state: mongo.state,
      country: mongo.country,
      phone: mongo.phone,
      obs: mongo.obs
    };
  }

  read (id: string): Promise<User> | NotFoundDbException {
    let userMongoose: IUserMongoose;
    let cartMongoose: ICartMongoose;
    let articleMongooseList: IArticleMongoose[];
    return UserModelMongoose
      .findOne({
        $or: [{ _id: id },
          { userName: id }]
      })
      .then((res) => { // Find User
        if (!res) throw new NotFoundDbException('User');
        userMongoose = res;
        return CartModelMongoose.findById(userMongoose.cart);
      })
      .then((res) => { // Find Cart
        if (!res) throw new NotFoundDbException('Cart');
        cartMongoose = res;
        const idsArticles = cartMongoose?.lines.map((l) => new Types.ObjectId(l.article));
        return ArticleModelMongoose.find({ _id: { $in: idsArticles } });
      })
      .then((list) => { // Find Articles from Cart
        articleMongooseList = list;
        return AreaModelMongoose.findOne({ name: userMongoose.userName });
      })
      .then((res) => { // Find Area
        if (!res) throw new NotFoundDbException('Area');
        return UserMongooseModelDB.parseMongooseToUser(userMongoose, res, cartMongoose, [], articleMongooseList);
      });
  }

}

export default UserMongooseModelDB;
