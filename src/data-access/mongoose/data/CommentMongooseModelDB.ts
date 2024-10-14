import { Comment, SearchParams } from '@model/index';
import { Types } from 'mongoose';
import { IModelDB } from '../../interfaces';
import {
  ArticleModelMongoose, CommentModelMongoose, IArticleMongoose, ICommentMongoose
} from '../db';
import { NotFoundDbException } from '../../error';
import ArticleMongooseModelDB from './ArticleMongooseModelDB';

class CommentMongooseModelDB implements IModelDB<Comment> {

  private static instance: IModelDB<Comment>;

  public static getIntance (): IModelDB<Comment> {
    if (!CommentMongooseModelDB.instance) {
      CommentMongooseModelDB.instance = new CommentMongooseModelDB();
    }
    return CommentMongooseModelDB.instance;
  }

  private constructor () {

  }

  public static parseCommentToMongoose (comment: Comment): ICommentMongoose {
    return {
      _id: new Types.ObjectId(comment.id),
      title: comment.title,
      text: comment.text,
      rating: comment.rating,
      pics: comment.pics,
      article: new Types.ObjectId(comment.article.id)
    };
  }

  public static parseMongooseToComment (mongoComment: ICommentMongoose, mongoArticle?: IArticleMongoose): Comment {
    return {
      id: mongoComment._id?.toString(),
      title: mongoComment.title,
      text: mongoComment.text,
      rating: mongoComment.rating,
      pics: mongoComment.pics,
      article: mongoArticle
        ? ArticleMongooseModelDB.parseMongooseToArticle(mongoArticle)
        : undefined
    };
  }

  read (id: string): Promise<Comment> | NotFoundDbException {
    let commentMongoose: ICommentMongoose;
    return CommentModelMongoose
      .findById(id)
      .then((res) => {
        if (!res) throw new NotFoundDbException();
        commentMongoose = res as ICommentMongoose;
        return ArticleModelMongoose.findById(res?.article);
      })
      .then((res) => {
        if (!res) throw new NotFoundDbException();
        return CommentMongooseModelDB.parseMongooseToComment(commentMongoose as ICommentMongoose, res as IArticleMongoose);
      });
  }

  readList ({ limit, skip }: SearchParams): Promise<Comment[]> {
    return CommentModelMongoose
      .find({})
      .limit(limit)
      .skip(skip)
      .then((list) => {
        const promList = list.map(async (c) => {
          const article = await ArticleModelMongoose.findById(c.article);
          return CommentMongooseModelDB.parseMongooseToComment(c, article as IArticleMongoose);
        });
        return Promise.all(promList);
      });
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
