import {
  Collection, Db, MongoClient
} from 'mongodb';
import { IModelDBUser } from '../../interfaces';
import {
  AreaMongo, ArticleMongo, CartMongo, ShippingMongo, UserMongo
} from '../db/interfaces';
import { NotFoundDbException } from '../../error';
import { getConnMongo } from '../db/utils';
import { User } from '../../../model';

class UserMongoModelDB implements IModelDBUser {

  private client: MongoClient;

  private db: Db;

  private collUser: Collection<UserMongo>;

  private collCart: Collection<CartMongo>;

  private collArt: Collection<ArticleMongo>;

  private collArea: Collection<AreaMongo>;

  private collShipping: Collection<ShippingMongo>;

  private static instance: IModelDBUser;

  public static getIntance (): IModelDBUser {
    if (!UserMongoModelDB.instance) {
      UserMongoModelDB.instance = new UserMongoModelDB();
    }
    return UserMongoModelDB.instance;
  }

  private constructor () {
    [this.client,
      this.db] = getConnMongo();
    this.collUser = this.db.collection<UserMongo>('user');
    this.collCart = this.db.collection<CartMongo>('cart');
    this.collArt = this.db.collection<ArticleMongo>('article');
    this.collArea = this.db.collection<AreaMongo>('area');
    this.collShipping = this.db.collection<ShippingMongo>('shipping');
  }

  read (id: string): Promise<User | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  /*
  read (id: string): Promise<User> {
    let userMongo: UserMongo;
    let artFavList: ArticleMongo[];
    let cartMongo: CartMongo;
    let cartMongoArtList: ArticleMongo[];
    let shippingMongoList: ShippingMongo[];
    let shippingMongoArtList: ArticleMongo[];

    return this.collUser
      .findOne({
        OR: [
          { _id: new ObjectId(id) },
          { userName: id }
        ]
      })
      .then((res) => {
        if (!res) throw new NotFoundDbException('User');
        userMongo = res;
        return this.collCart
          .findOne({ _id: new ObjectId(userMongo._id) });
      })
      .then((res) => {
        if (!res) throw new NotFoundDbException('Cart');
        cartMongo = res;
        const idArticleList = cartMongo.cartLineList.map((clm) => clm.article);
        return this.collArt
          .find({ _id: { $in: idArticleList } });
      })
      .then((res) => res.toArray())
      .then((list) => {
        cartMongoArtList = list;
        return this.collArt
          .find({ _id: { $in: userMongo.favList } });
      })
      .then((res) => res.toArray())
      .then((list) => {
        artFavList = list;
        const idShippingList = userMongo.shippingList.map((sl) => new ObjectId(sl));
        return this.collShipping.find({ _id: { $in: idShippingList } });
      })
      .then((res) => res.toArray())
      .then((list) => {
        shippingMongoList = list;
        const idArticleList = shippingMongoList.flatMap((s) => s.shippingLineList.map((sl) => sl.article));
        return this.collArt.find({ _id: { $in: idArticleList } });
      })
      .then((res) => res.toArray())
      .then((list) => {
        shippingMongoArtList = list;
        return this.collArea.find({ name: userMongo.area });
      })
      .then((res) => {
        if (!res) throw new NotFoundDbException('Area');
        const area = parseMongoToArea(res);
        const shippingList = shippingMongoList.map((sm) => parseMongoToShiping(sm, shippingMongoArtList));
        const cart = parseMongoToCart(cartMongo, cartMongoArtList);
        return parseMongoToUser(userMongo, area, artFavList, cart, shippingList);
      });
  }
*/

}

export default UserMongoModelDB;
