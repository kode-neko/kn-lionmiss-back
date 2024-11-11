/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Area } from '@model/index';
import { NotFoundDbException } from '../../error';
import { IModelDBArea } from '../../interfaces';

class AreaSeqModelDB implements IModelDBArea {

  private static instance: AreaSeqModelDB;

  public static getIntance (): AreaSeqModelDB {
    if (!AreaSeqModelDB.instance) {
      AreaSeqModelDB.instance = new AreaSeqModelDB();
    }
    return AreaSeqModelDB.instance;
  }

  private constructor () {

  }

  readByProps (obj: Omit<Area, 'id'>): Promise<Area | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  read (id: string): NotFoundDbException | Promise<Area> {
    throw new Error('Method not implemented.');
  }

  readList (searchParams?: any): Promise<Area[]> {
    throw new Error('Method not implemented.');
  }

  create (obj: Area): Promise<Area> {
    throw new Error('Method not implemented.');
  }

  update (obj: Area): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  delete (id: string): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

}

export default AreaSeqModelDB;
