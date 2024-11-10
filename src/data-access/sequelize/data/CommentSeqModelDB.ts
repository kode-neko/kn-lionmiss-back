/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Comment } from '@model/index';
import { NotFoundDbException } from '../../error';
import { IModelDBComment } from '../../interfaces';

class CommentSeqModelDB implements IModelDBComment {

  private static instance: IModelDBComment;

  public static getIntance (): IModelDBComment {
    if (!CommentSeqModelDB.instance) {
      CommentSeqModelDB.instance = new CommentSeqModelDB();
    }
    return CommentSeqModelDB.instance;
  }

  private constructor () {

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

  update (obj: Comment): Promise<void> | NotFoundDbException {
    throw new Error('Method not implemented.');
  }

  delete (id: string): Promise<void> | NotFoundDbException {
    throw new Error('Method not implemented.');
  }

}

export default CommentSeqModelDB;
