import { Comment, SearchParams } from '@model/index';
import {
  Collection, Db, MongoClient,
  ObjectId
} from 'mongodb';
import { IModelDBComment } from '../../interfaces';
import { ICommentMongo } from '../db/interfaces';
import { getConnMongo } from '../db';
import { IdRequiredDbException, NotFoundDbException } from '../../error';

class CommentMongoModelDB implements IModelDBComment {

  private client: MongoClient;

  private db: Db;

  private collComment: Collection<ICommentMongo>;

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
    this.collComment = this.db.collection<ICommentMongo>('cart');
  }

  public static parseCommentToMongo (comment: Comment): ICommentMongo {
    return {
      _id: new ObjectId(comment.id as string),
      title: comment.title,
      text: comment.text,
      rating: comment.rating,
      pics: comment.pics,
      article: new ObjectId(comment.article as string),
      user: new ObjectId(comment.user as string)
    };
  }

  public static parseMongoToComment (mongoComment: ICommentMongo): Comment {
    return {
      id: mongoComment._id?.toString(),
      title: mongoComment.title,
      text: mongoComment.text,
      rating: mongoComment.rating,
      pics: mongoComment.pics,
      user: mongoComment.user?.toString(),
      article: mongoComment.article?.toString()
    };
  }

  read (id: string): Promise<Comment> | NotFoundDbException {
    return this.collComment
      .findOne({ _id: new ObjectId(id) })
      .then((res) => {
        if (!res) throw new NotFoundDbException('Comment');
        return CommentMongoModelDB.parseMongoToComment(res);
      });
  }

  readList ({ limit, skip }: SearchParams<Comment>): Promise<Comment[]> {
    return this.collComment
      .find({}, { limit, skip })
      .toArray()
      .then((list) => {
        return list.map((c) => CommentMongoModelDB.parseMongoToComment(c));
      });
  }

  create (obj: Comment): Promise<Comment> {
    const commentMongo = CommentMongoModelDB.parseCommentToMongo(obj);
    return this.collComment
      .insertOne(commentMongo)
      .then(({ insertedId: id }) => ({ ...obj, id: id.toString() }));
  }

  update (obj: Comment): Promise<void> | NotFoundDbException {
    if (!obj.id) throw new IdRequiredDbException();
    return this.collComment
      .updateOne({ _id: new ObjectId(obj.id as string) }, obj)
      .then(({ modifiedCount }) => {
        if (modifiedCount === 0) throw new NotFoundDbException('Comment');
      });
  }

  delete (id: string): Promise<void> | NotFoundDbException {
    return this.collComment
      .deleteOne({ _id: new ObjectId(id as string) })
      .then(({ deletedCount }) => {
        if (deletedCount === 0) throw new NotFoundDbException('Comment');
      });
  }

}

export default CommentMongoModelDB;
