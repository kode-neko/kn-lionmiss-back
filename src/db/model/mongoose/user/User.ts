import IModelDB from '../../IModelDB';
import { User } from '@model/index';

class UserMongoModelDB implements IModelDB<User> {

  read (id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  readList (searchParams: User): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  create (obj: User): Promise<User> {
    throw new Error('Method not implemented.');
  }

  update (obj: User): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  delete (id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

}

export default UserMongoModelDB;
