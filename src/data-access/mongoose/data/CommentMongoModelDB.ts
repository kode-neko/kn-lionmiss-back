import { Comment, SearchParams } from '@model/index';
import { Types } from 'mongoose';
import { IModelDB } from '../../interfaces';
import {
  ArticleModelMongo,
  CommentModelMongo, IArticleMongo, ICommentMongo
} from '../db';
import ArticleMongoModelDB from './ArticleMongoModelDB';

class CommentMongoModelDB implements IModelDB<Comment> {

  private static instance: IModelDB<Comment>;

  public static getIntance (): IModelDB<Comment> {
    if (!CommentMongoModelDB.instance) {
      CommentMongoModelDB.instance = new CommentMongoModelDB();
    }
    return CommentMongoModelDB.instance;
  }

  private constructor () {

  }

  private static parseCommentToMongo (article: Comment): ICommentMongo {
    const { id, ...rest } = article;
    return {
      _id: new Types.ObjectId(id),
      ...rest,
      article: new Types.ObjectId(article.id)
    };
  }

  private static parseMongoToComment (mongoComment: ICommentMongo, mongoArticle?: IArticleMongo): Comment {
    return {
      id: mongoComment._id?.toString(),
      title: mongoComment.title,
      text: mongoComment.text,
      rating: mongoComment.rating,
      pics: mongoComment.pics,
      article: mongoArticle
        ? ArticleMongoModelDB.parseMongoToArticle(mongoArticle)
        : undefined
    };
  }

  read (id: string): Promise<Comment> {
    let commentMongo: ICommentMongo;
    return CommentModelMongo
      .findById(id)
      .then((res) => {
        if (!res) Promise.reject();
        commentMongo = res as ICommentMongo;
        return ArticleModelMongo.findById(res?.article);
      })
      .then((res) => {
        if (!res) Promise.reject();
        return CommentMongoModelDB.parseMongoToComment(commentMongo, res as IArticleMongo);
      });
  }

  readList ({ limit, skip }: SearchParams): Promise<Comment[]> {
    return CommentModelMongo
      .find({})
      .limit(limit)
      .skip(skip)
      .then((list) => {
        if (!list) Promise.reject();
        const promList = list.map(async (c) => {
          const article = await ArticleModelMongo.findById(c.article);
          return CommentMongoModelDB.parseMongoToComment(c, article as IArticleMongo);
        });
        return Promise.all(promList);
      });
  }

  create (obj: Comment): Promise<Comment> {
    return CommentModelMongo
      .create(CommentMongoModelDB.parseCommentToMongo(obj))
      .then((res) => {
        const resId = CommentMongoModelDB.parseMongoToComment(res);
        return { ...resId, article: obj.article };
      });
  }

  update (obj: Comment): Promise<boolean> {
    const { _id, ...rest } = CommentMongoModelDB.parseCommentToMongo(obj);
    return CommentModelMongo
      .updateOne(
        { _id },
        rest
      )
      .then(({ modifiedCount }) => Boolean(modifiedCount));
  }

  delete (id: string): Promise<boolean> {
    return CommentModelMongo
      .deleteOne({ _id: id })
      .then(({ deletedCount }) => Boolean(deletedCount));
  }

}

export default CommentMongoModelDB;
