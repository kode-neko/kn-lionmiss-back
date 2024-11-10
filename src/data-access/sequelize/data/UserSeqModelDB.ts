/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '@model/index';
import { NotFoundDbException } from '../../error';
import { IModelDBUser } from '../../interfaces';

class UserSeqModelDB implements IModelDBUser {

  private static instance: IModelDBUser;

  public static getIntance (): IModelDBUser {
    if (!UserSeqModelDB.instance) {
      UserSeqModelDB.instance = new UserSeqModelDB();
    }
    return UserSeqModelDB.instance;
  }

  private constructor () {
  }

  read (id: string): NotFoundDbException | Promise<User> {
    throw new Error('Method not implemented.');
  }

}

export default UserSeqModelDB;
