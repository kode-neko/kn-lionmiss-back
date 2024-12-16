import {
  Collection, Db, MongoClient
} from 'mongodb';
import { NotFoundDbException } from '../../error';
import { IModelDBComment } from '../../interfaces';
import { CommentMongo } from '../db/interfaces';

class CommentMongoModelDB implements IModelDBComment {

  private client: MongoClient;

  private db: Db;

  private collComment: Collection<CommentMongo>;

  private static instance: IModelDBComment;

  public static getIntance (): IModelDBComment {
    if (!CommentMongoModelDB.instance) {
      CommentMongoModelDB.instance = new CommentMongoModelDB();
    }
    return CommentMongoModelDB.instance;
  }

  private constructor () {
    [this.client,
      this.db] = getConnMongo();
    this.collComment = this.db.collection<CommentMongo>('cart');
  }

  read (id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  readList (searchParams?: SearchParams<T>): Promise<Comment[]> {
    throw new Error('Method not implemented.');
  }

  create (obj: Comment): Promise<Comment> {
    throw new Error('Method not implemented.');
  }

  update (obj: Comment): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  delete (id: string): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

}

export default CommentMongoModelDB;
