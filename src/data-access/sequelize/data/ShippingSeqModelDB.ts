/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Shipping } from '@model/index';
import { NotFoundDbException } from '../../error';
import { IModelDBShipping } from '../../interfaces';

class ShippingSeqModelDB implements IModelDBShipping {

  private static instance: IModelDBShipping;

  public static getIntance (): IModelDBShipping {
    if (!ShippingSeqModelDB.instance) {
      ShippingSeqModelDB.instance = new ShippingSeqModelDB();
    }
    return ShippingSeqModelDB.instance;
  }

  private constructor () {

  }

  read (id: string): NotFoundDbException | Promise<Shipping> {
    throw new Error('Method not implemented.');
  }

  readList (searchParams?: any): Promise<Shipping[]> {
    throw new Error('Method not implemented.');
  }

  create (obj: Shipping): Promise<Shipping> {
    throw new Error('Method not implemented.');
  }

  update (obj: Shipping): Promise<void> | NotFoundDbException {
    throw new Error('Method not implemented.');
  }

  delete (id: string): Promise<void> | NotFoundDbException {
    throw new Error('Method not implemented.');
  }

}

export default ShippingSeqModelDB;
