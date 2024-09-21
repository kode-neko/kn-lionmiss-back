import IModelDB from '../../IModelDB';
import { Cart } from '@model/index';

class CartSeqModelDB implements IModelDB<Cart> {

  read (id: string): Promise<Cart> {
    throw new Error('Method not implemented.');
  }

  readList (searchParams: Cart): Promise<Cart[]> {
    throw new Error('Method not implemented.');
  }

  create (obj: Cart): Promise<Cart> {
    throw new Error('Method not implemented.');
  }

  update (obj: Cart): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  delete (id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

}

export default CartSeqModelDB;
