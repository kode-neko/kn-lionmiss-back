import {
  Collection, Db, MongoClient,
  ObjectId
} from 'mongodb';
import { NotFoundDbException } from '../../error';
import { IModelDBComment } from '../../interfaces';
import { CommentMongo } from '../db/interfaces';
import { getConnMongo } from '../db/utils';
import { parseCommentToMongo, parseMongoToComment } from '../db/parsers';
import { Comment, SearchParams } from '../../../model';

class CommentMongoModelDB implements IModelDBComment {

  private client: MongoClient;

  private db: Db;

  private collComment: Collection<CommentMongo>;

  private static instance: CommentMongoModelDB;

  public static getIntance (): CommentMongoModelDB {
    if (!CommentMongoModelDB.instance) {
      CommentMongoModelDB.instance = new CommentMongoModelDB();
    }
    return CommentMongoModelDB.instance;
  }

  private constructor () {
    [this.client,
      this.db] = getConnMongo();
    this.collComment = this.db.collection<CommentMongo>('comment');
  }

  read (id: string): Promise<Comment | NotFoundDbException> {
    return this.collComment
      .findOne({ _id: new ObjectId(id) })
      .then((res) => {
        if (!res) throw new NotFoundDbException('Comment');
        return parseMongoToComment(res);
      });
  }

  readList (searchParams: SearchParams<Comment>): Promise<Comment[]> {
    const { skip, limit } = searchParams;
    return this.collComment
      .find({}, { skip, limit })
      .toArray()
      .then((list) => {
        return list.map(parseMongoToComment);
      });
  }

  create (obj: Comment): Promise<Comment> {
    const commentMongo = parseCommentToMongo(obj);
    return this.collComment
      .insertOne(commentMongo)
      .then(({ insertedId }) => ({ ...obj, _id: insertedId.toString() }));
  }

  update (obj: Comment): Promise<void | NotFoundDbException> {
    const { _id, ...rest } = parseCommentToMongo(obj);
    return this.collComment
      .updateOne({ _id }, { ...rest })
      .then(({ modifiedCount }) => {
        if (modifiedCount === 0) throw new NotFoundDbException('Comment');
      });
  }

  delete (id: string): Promise<void | NotFoundDbException> {
    return this.collComment
      .deleteOne(new ObjectId(id))
      .then(({ deletedCount }) => {
        if (deletedCount === 0) throw new NotFoundDbException('Comment');
      });
  }

}

export default CommentMongoModelDB;
