import IModelDB from '../../IModelDB';
import { UserMeasures } from '@model/index';

class UserMeasuresMongoModelDB implements IModelDB<UserMeasures> {

  read (id: string): Promise<UserMeasures> {
    throw new Error('Method not implemented.');
  }

  readList (searchParams: UserMeasures): Promise<UserMeasures[]> {
    throw new Error('Method not implemented.');
  }

  create (obj: UserMeasures): Promise<UserMeasures> {
    throw new Error('Method not implemented.');
  }

  update (obj: UserMeasures): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  delete (id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

}

export default UserMeasuresMongoModelDB;
