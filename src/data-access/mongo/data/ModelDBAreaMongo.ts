import {
  Collection,
  Db, MongoClient, ObjectId
} from 'mongodb';
import { NotFoundDbException } from '@data-access/index';
import { Area, SearchParams } from '@model/index';
import { IAreaMongo } from '../db/interfaces';
import { IModelDBArea } from '../../interfaces';
import { getConnMongo } from '../db';

class AreaMongoModelDB implements IModelDBArea {

  private client: MongoClient;

  private db: Db;

  private collArea: Collection<IAreaMongo>;

  private static instance: AreaMongoModelDB;

  public static getIntance (): AreaMongoModelDB {
    if (!AreaMongoModelDB.instance) {
      AreaMongoModelDB.instance = new AreaMongoModelDB();
    }
    return AreaMongoModelDB.instance;
  }

  private constructor () {
    [this.client,
      this.db] = getConnMongo();
    this.collArea = this.db.collection<IAreaMongo>('area');
  }

  public static parseAreaToMongo (area: Area): IAreaMongo {
    return {
      _id: new ObjectId(area.id as string),
      name: area.name,
      locale: area.locale,
      country: area.country,
      symbol: area.symbol
    };
  }

  public static parseMongoToArea (mongo: IAreaMongo): Area {
    return {
      id: mongo._id?.toString(),
      name: mongo.name,
      locale: mongo.locale,
      country: mongo.country,
      symbol: mongo.symbol
    };
  }

  read (id: string): Promise<Area | NotFoundDbException> {
    return this.collArea
      .findOne({ _id: new ObjectId(id) })
      .then((res) => {
        if (!res) throw new NotFoundDbException('area');
        return AreaMongoModelDB.parseMongoToArea(res);
      });
  }

  readByProps (obj: Omit<Area, 'id'>): Promise<Area | NotFoundDbException> {
    return this.collArea
      .findOne(obj)
      .then((res) => {
        if (!res) throw new NotFoundDbException('area');
        return AreaMongoModelDB.parseMongoToArea(res);
      });
  }

  readList ({ limit, skip }: SearchParams<Area>): Promise<Area[]> {
    return this.collArea
      .find({}, { skip, limit })
      .toArray()
      .then((list) => list.map((a) => AreaMongoModelDB
        .parseMongoToArea(a)));
  }

  create (obj: Area): Promise<Area> {
    const objMongo: IAreaMongo = AreaMongoModelDB.parseAreaToMongo(obj);
    return this.collArea
      .insertOne(objMongo)
      .then(({ insertedId: id }) => ({ ...obj, id: id.toString() } as Area));
  }

  update (obj: Area): Promise<void | NotFoundDbException> {
    const { _id, ...rest } = AreaMongoModelDB.parseAreaToMongo(obj);
    return this.collArea
      .updateOne({ _id }, rest)
      .then(({ modifiedCount }) => {
        if (modifiedCount === 0) throw new NotFoundDbException('area');
      });
  }

  delete (id: string): Promise<void | NotFoundDbException> {
    return this.collArea
      .deleteOne({ _id: new ObjectId(id) })
      .then(({ deletedCount }) => {
        if (deletedCount === 0) throw new NotFoundDbException('area');
      });
  }

}

export default AreaMongoModelDB;
