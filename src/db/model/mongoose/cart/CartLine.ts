import IModelDB from '../../IModelDB';
import { CartLine } from '@model/index';

class CartLineMongoModelDB implements IModelDB<CartLine> {

  read (id: string): Promise<CartLine> {
    throw new Error('Method not implemented.');
  }

  readList (searchParams: CartLine): Promise<CartLine[]> {
    throw new Error('Method not implemented.');
  }

  create (obj: CartLine): Promise<CartLine> {
    throw new Error('Method not implemented.');
  }

  update (obj: CartLine): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  delete (id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

}

export default CartLineMongoModelDB;
