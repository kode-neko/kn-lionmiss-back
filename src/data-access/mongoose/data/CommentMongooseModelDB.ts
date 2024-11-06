import { Comment, SearchParams } from '@model/index';
import { Types } from 'mongoose';
import { IModelDBComment } from '../../interfaces';
import { CommentModelMongoose, ICommentMongoose } from '../db';
import { NotFoundDbException } from '../../error';

class CommentMongooseModelDB implements IModelDBComment {

  private static instance: IModelDBComment;

  public static getIntance (): IModelDBComment {
    if (!CommentMongooseModelDB.instance) {
      CommentMongooseModelDB.instance = new CommentMongooseModelDB();
    }
    return CommentMongooseModelDB.instance;
  }

  private constructor () {

  }

  public static parseCommentToMongoose (comment: Comment): ICommentMongoose {
    return {
      _id: new Types.ObjectId(comment.id as string),
      title: comment.title,
      text: comment.text,
      rating: comment.rating,
      pics: comment.pics,
      article: new Types.ObjectId(comment.article as string),
      user: comment.user
    };
  }

  public static parseMongooseToComment (mongoComment: ICommentMongoose): Comment {
    return {
      id: mongoComment._id?.toString(),
      title: mongoComment.title,
      text: mongoComment.text,
      rating: mongoComment.rating,
      pics: mongoComment.pics,
      user: mongoComment.user,
      article: mongoComment.article._id?.toString()
    };
  }

  read (id: string): Promise<Comment> | NotFoundDbException {
    return CommentModelMongoose
      .findById(id)
      .then((res) => {
        if (!res) throw new NotFoundDbException();
        return CommentMongooseModelDB.parseMongooseToComment(res);
      });
  }

  readList ({ limit, skip }: SearchParams<Comment>): Promise<Comment[]> {
    return CommentModelMongoose
      .find({})
      .limit(limit)
      .skip(skip)
      .then((list) => list.map((c) => CommentMongooseModelDB
        .parseMongooseToComment(c)));
  }

  create (obj: Comment): Promise<Comment> {
    return CommentModelMongoose
      .create(CommentMongooseModelDB.parseCommentToMongoose(obj))
      .then((res) => {
        const resId = CommentMongooseModelDB.parseMongooseToComment(res);
        return { ...resId, article: obj.article };
      });
  }

  update (obj: Comment): Promise<void> | NotFoundDbException {
    const { _id, ...rest } = CommentMongooseModelDB.parseCommentToMongoose(obj);
    return CommentModelMongoose
      .updateOne({ _id }, rest)
      .then(({ modifiedCount }) => {
        if (modifiedCount === 0) throw new NotFoundDbException();
      });
  }

  delete (id: string): Promise<void> | NotFoundDbException {
    return CommentModelMongoose
      .deleteOne({ _id: new Types.ObjectId(id) })
      .then(({ deletedCount }) => {
        if (deletedCount === 0) throw new NotFoundDbException();
      });
  }

}

export default CommentMongooseModelDB;
