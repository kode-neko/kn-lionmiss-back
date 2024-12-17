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

  read (id: string): Promise<Comment> {
    return this.collComment
      .findOne({ $or: [{ _id: new ObjectId(id) }, { name: id }] })
      .then((res) => {
        if (!res) throw new NotFoundDbException('Comment');
        return parseMongoToComment(res);
      });
  }

  readList (searchParams?: SearchParams<Comment>): Promise<Comment[]> {
    const {
      limit, skip, obj
    } = searchParams;
    let filter;
    if (obj) filter = [
      { article: obj.article },
      { user: obj.user }
    ];
    return this.collComment
      .find({ $or: filter }, { limit, skip })
      .toArray()
      .then((list) => {
        return list.map((e) => parseMongoToComment(e));
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
