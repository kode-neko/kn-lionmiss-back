import { SearchParams } from '@model/index';
import { NotFoundDbException } from '../../error';
import { IModelDBComment } from '../../interfaces';

class CommentMongoModelDB implements IModelDBComment {

  private static instance: IModelDBComment;

  public static getIntance (): IModelDBComment {
    if (!CommentMongoModelDB.instance) {
      CommentMongoModelDB.instance = new CommentMongoModelDB();
    }
    return CommentMongoModelDB.instance;
  }

  private constructor () {
  }

  read (id: string): Promise<Comment> {
    throw new Error('Method not implemented.');
  }

  readList (searchParams?: SearchParams<Comment>): Promise<Comment[]> {
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
