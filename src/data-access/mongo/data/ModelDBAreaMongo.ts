import {
  Collection, Db, MongoClient,
  ObjectId
} from 'mongodb';
import { IModelDBArea } from '../../interfaces';
import { AreaMongo } from '../db/interfaces';
import { getConnMongo } from '../db/utils';
import { Area, SearchParams } from '../../../model';
import { NotFoundDbException } from '../../error';
import { parseAreaToMongo, parseMongoToArea } from '../db/parsers';

class AreaMongoModelDB implements IModelDBArea {

  private client: MongoClient;

  private db: Db;

  private collArea: Collection<AreaMongo>;

  private static instance: AreaMongoModelDB;

  public static getInstance (): AreaMongoModelDB {
    if (!AreaMongoModelDB.instance) {
      AreaMongoModelDB.instance = new AreaMongoModelDB();
    }
    return AreaMongoModelDB.instance;
  }

  private constructor () {
    [this.client,
      this.db] = getConnMongo();
    this.collArea = this.db.collection<AreaMongo>('area');
  }

  read (id: string): Promise<Area> {
    return this.collArea
      .findOne({ $or: [{ _id: new ObjectId(id) }, { name: id }] })
      .then((res) => {
        if (!res) throw new NotFoundDbException('Area');
        return parseMongoToArea(res);
      });
  }

  readList (searchParams: SearchParams<Area>): Promise<Area[]> {
    const {
      limit, skip, tags
    } = searchParams;
    const filter = tags.length !== 0
      ? { name: { $in: tags } }
      : {};
    return this.collArea
      .find(filter, { limit, skip })
      .toArray()
      .then((list) => {
        return list.map((e) => parseMongoToArea(e));
      });
  }

  create (obj: Area): Promise<Area> {
    const areaMongo = parseAreaToMongo(obj);
    return this.collArea
      .insertOne(areaMongo)
      .then(({ insertedId }) => ({ ...obj, id: insertedId.toString() }));
  }

  update (obj: Area): Promise<void | NotFoundDbException> {
    const { _id, ...rest } = parseAreaToMongo(obj);
    return this.collArea
      .updateOne({ _id }, { $set: rest })
      .then(({ modifiedCount }) => {
        if (modifiedCount === 0) throw new NotFoundDbException('Area');
      });
  }

  delete (id: string): Promise<void | NotFoundDbException> {
    return this.collArea
      .deleteOne({ _id: new ObjectId(id) })
      .then(({ deletedCount }) => {
        if (deletedCount === 0) throw new NotFoundDbException('Area');
      });
  }

}

export default AreaMongoModelDB;
