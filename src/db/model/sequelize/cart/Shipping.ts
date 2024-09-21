import IModelDB from '../../IModelDB';
import { Shipping } from '@model/index';

class ShippingSeqModelDB implements IModelDB<Shipping> {

  read (id: string): Promise<Shipping> {
    throw new Error('Method not implemented.');
  }

  readList (searchParams: Shipping): Promise<Shipping[]> {
    throw new Error('Method not implemented.');
  }

  create (obj: Shipping): Promise<Shipping> {
    throw new Error('Method not implemented.');
  }

  update (obj: Shipping): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  delete (id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

}

export default ShippingSeqModelDB;
