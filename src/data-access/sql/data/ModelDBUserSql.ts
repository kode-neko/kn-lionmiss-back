import { User } from '@model/index';
import { IModelDBUser } from '../../interfaces';

class UserMongoModelDB implements IModelDBUser {

  private static instance: IModelDBUser;

  public static getInstance (): IModelDBUser {
    if (!UserMongoModelDB.instance) {
      UserMongoModelDB.instance = new UserMongoModelDB();
    }
    return UserMongoModelDB.instance;
  }

  private constructor () {
  }

  read (id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

}

export default UserMongoModelDB;
