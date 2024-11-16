/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Comment } from '@model/index';
import { Connection, PoolConnection } from 'mariadb';
import { NotFoundDbException } from '../../error';
import { IModelDBComment } from '../../interfaces';
import { getConnSql } from '../db/utils';

class CommentSqlModelDB implements IModelDBComment {

  private conn: Connection | PoolConnection;

  private static instance: IModelDBComment;

  public static getIntance (): IModelDBComment {
    if (!CommentSqlModelDB.instance) {
      CommentSqlModelDB.instance = new CommentSqlModelDB();
    }
    return CommentSqlModelDB.instance;
  }

  private constructor () {
    this.conn = getConnSql();
  }

  public static parseSqlToComment (mongoComment: any): Comment {
    return {
      id: mongoComment._id?.toString(),
      title: mongoComment.title,
      text: mongoComment.text,
      rating: mongoComment.rating,
      pics: mongoComment.pics,
      user: mongoComment.user,
      article: mongoComment.article?.toString()
    };
  }

  read (id: string): NotFoundDbException | Promise<Comment> {
    throw new Error('Method not implemented.');
  }

  readList (searchParams?: any): Promise<Comment[]> {
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

export default CommentSqlModelDB;
