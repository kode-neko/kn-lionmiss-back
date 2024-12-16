import {
  Collection, Db, MongoClient
} from 'mongodb';
import { IModelDBArea } from '../../interfaces';
import { AreaMongo } from '../db/interfaces';
import { getConnMongo } from '../db/utils';
import { Area, SearchParams } from '../../../model';
import { NotFoundDbException } from '../../error';

class AreaMongoModelDB implements IModelDBArea {

  private client: MongoClient;

  private db: Db;

  private collArea: Collection<AreaMongo>;

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
    this.collArea = this.db.collection<AreaMongo>('area');
  }

  read (id: string): Promise<Area> {
    throw new Error('Method not implemented.');
  }

  readList (searchParams: SearchParams<Area>): Promise<Area[]> {
    throw new Error('Method not implemented.');
  }

  create (obj: Area): Promise<Area> {
    throw new Error('Method not implemented.');
  }

  update (obj: Area): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  delete (id: string): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

}

export default AreaMongoModelDB;
