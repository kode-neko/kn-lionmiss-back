import { NotFoundDbException } from '@data-access/index';
import {
  User, SexEnum, Address
} from '@model/index';
import {
  Collection, Db, MongoClient,
  ObjectId
} from 'mongodb';
import { IModelDBUser } from '../../interfaces';
import {
  getClientDb,
  IAddressMongo,
  IAreaMongo,
  IArticleMongo, ICartMongo, IUserMongo
} from '../db';
import CartMongoModelDB from './CartMongoModelDB';

class UserMongoModelDB implements IModelDBUser {

  private client: MongoClient;

  private db: Db;

  private collUser: Collection<IUserMongo>;

  private collCart: Collection<ICartMongo>;

  private collArt: Collection<IArticleMongo>;

  private collArea: Collection<IAreaMongo>;

  private static instance: IModelDBUser;

  public static getIntance (): IModelDBUser {
    if (!UserMongoModelDB.instance) {
      UserMongoModelDB.instance = new UserMongoModelDB();
    }
    return UserMongoModelDB.instance;
  }

  private constructor () {
    [this.client,
      this.db] = getClientDb();
    this.collUser = this.db.collection<IUserMongo>('user');
    this.collCart = this.db.collection<ICartMongo>('cart');
    this.collArt = this.db.collection<IArticleMongo>('article');
    this.collArea = this.db.collection<IAreaMongo>('area');
  }

  public static parseUserToMongo (user: User): IUserMongo {
    return {
      _id: new ObjectId(user.id as string),
      userName: user.userName,
      email: user.email,
      cart: new ObjectId(user.cart?.id as string),
      shippings: user.shippings.map((s) => new ObjectId(s.id as string)),
      bday: user.bday,
      sex: user.sex,
      area: user.area.name,
      measures: { ...user.measures },
      favs: user.favs.map((s) => new ObjectId(s.id as string)),
      addresses: user.addresses.map((a) => UserMongoModelDB.parseAddressToMongo(a))
    };
  }

  public static parseMongoToUser (
    mongo: IUserMongo,
    areaMongo: IAreaMongo,
    cartMongo?: ICartMongo,
    cartArticleListMongo?: IArticleMongo[]
  ): User {
    return {
      id: mongo._id?.toString(),
      userName: mongo.userName,
      email: mongo.email,
      cart: cartMongo &&
        CartMongoModelDB.parseMongoToCart(
          cartMongo,
          cartArticleListMongo || []
        ),
      shippings: [],
      bday: mongo.bday,
      sex: SexEnum[mongo.sex],
      area: areaMongo,
      measures: mongo.measures,
      favs: [],
      addresses: mongo.addresses.map((a) => UserMongoModelDB.parseMongoToAddress(a))
    };
  }

  public static parseAddressToMongo (address: Address): IAddressMongo {
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

  public static parseMongoToAddress (mongo: IAddressMongo): Address {
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
    let userMongo: IUserMongo;
    let cartMongo: ICartMongo;
    let articleMongoList: IArticleMongo[];

    return this.collUser
      .findOne({
        $or: [{ _id: new ObjectId(id) },
          { userName: id }]
      })
      .then((res) => {
        if (!res) throw new NotFoundDbException('User');
        userMongo = res;
        return this.collCart.findOne({ _id: new ObjectId(userMongo._id) });
      })
      .then((res) => {
        if (res) cartMongo = res;
        const idsArticles = cartMongo.lines.map((l) => new ObjectId(l.article));
        return this.collArt.find({ _id: { $in: idsArticles } });
      })
      .then((list) => list.toArray())
      .then((list) => {
        articleMongoList = list;
        return this.collArea.findOne({ name: userMongo.area });
      })
      .then((res) => {
        UserMongoModelDB.parseMongoToUser(userMongo, res as IAreaMongo, cartMongo, articleMongoList);
      });
  }

}

export default UserMongoModelDB;
