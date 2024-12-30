import {
  Collection, Db, MongoClient,
  ObjectId
} from 'mongodb';
import { IModelDBUser } from '../../interfaces';
import { UserMongo } from '../db/interfaces';
import { NotFoundDbException } from '../../error';
import { getConnMongo } from '../db/utils';
import { User } from '../../../model';
import { parseMongoToUser } from '../db/parsers';

class UserMongoModelDB implements IModelDBUser {

  private client: MongoClient;

  private db: Db;

  private collUser: Collection<UserMongo>;

  private static instance: UserMongoModelDB;

  public static getInstance (): UserMongoModelDB {
    if (!UserMongoModelDB.instance) {
      UserMongoModelDB.instance = new UserMongoModelDB();
    }
    return UserMongoModelDB.instance;
  }

  private constructor () {
    [this.client,
      this.db] = getConnMongo();
    this.collUser = this.db.collection<UserMongo>('user');
  }

  read (id: string): Promise<User | NotFoundDbException> {
    return this.collUser
      .aggregate([
        { $match: { $or: [{ _id: new ObjectId(id) }, { name: id }] } },
        {
          $lookup: {
            from: 'area',
            localField: 'area',
            foreignField: 'name',
            as: 'area'
          }
        },
        {
          $lookup: {
            from: 'article',
            localField: 'favList',
            foreignField: '_id',
            as: 'favList'
          }
        },
        {
          $lookup: {
            from: 'area',
            localField: 'favList.articleAreaList.area',
            foreignField: 'name',
            as: 'areaList'
          }
        }
      ])
      .toArray()
      .then((list) => {
        if (list.length === 0) throw new NotFoundDbException('User');
        const { areaList, ...rest } = list[0];
        return parseMongoToUser(rest as UserMongo, areaList, []);
      });
  }

}

export default UserMongoModelDB;
