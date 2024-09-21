import IModelDB from '../../IModelDB';
import { Area } from '@model/index';

class AreaSeqModelDB implements IModelDB<Area> {

  read (id: string): Promise<Area> {
    throw new Error('Method not implemented.');
  }

  readList (searchParams: Area): Promise<Area[]> {
    throw new Error('Method not implemented.');
  }

  create (obj: Area): Promise<Area> {
    throw new Error('Method not implemented.');
  }

  update (obj: Area): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  delete (id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

}

export default AreaSeqModelDB;
