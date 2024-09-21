import IModelDB from '../../IModelDB';
import { Comment } from '@model/index';

class CommentMongoModelDB implements IModelDB<Comment> {

  read (id: string): Promise<Comment> {
    throw new Error('Method not implemented.');
  }

  readList (searchParams: Comment): Promise<Comment[]> {
    throw new Error('Method not implemented.');
  }

  create (obj: Comment): Promise<Comment> {
    throw new Error('Method not implemented.');
  }

  update (obj: Comment): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  delete (id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

}

export default CommentMongoModelDB;
