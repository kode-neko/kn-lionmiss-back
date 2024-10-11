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

  private static parseCommentToMongoose (article: Comment): ICommentMongoose {
    const { id, ...rest } = article;
    return {
      _id: new Types.ObjectId(id),
      ...rest,
      article: new Types.ObjectId(article.id)
    };
  }

  private static parseMongooseToComment (mongoComment: ICommentMongoose, mongoArticle?: IArticleMongoose): Comment {
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
        if (!res) Promise.reject();
        commentMongoose = res as ICommentMongoose;
        return ArticleModelMongoose.findById(res?.article);
      })
      .then((res) => {
        if (!res) Promise.reject();
        return CommentMongooseModelDB.parseMongooseToComment(commentMongoose, res as IArticleMongoose);
      });
  }

  readList ({ limit, skip }: SearchParams): Promise<Comment[]> {
    return CommentModelMongoose
      .find({})
      .limit(limit)
      .skip(skip)
      .then((list) => {
        if (!list) Promise.reject();
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
        if (modifiedCount === 0) throw NotFoundDbException;
      });
  }

  delete (id: string): Promise<void> | NotFoundDbException {
    return CommentModelMongoose
      .deleteOne({ _id: id })
      .then(({ deletedCount }) => {
        if (deletedCount === 0) throw NotFoundDbException;
      });
  }

}

export default CommentMongooseModelDB;
