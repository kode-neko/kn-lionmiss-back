import { NotFoundDbException } from '../../error';
import { IModelDBCart } from '../../interfaces';
import { CartLine, Cart } from '../../../model';

class CartMongoModelDB implements IModelDBCart {

  private static instance: CartMongoModelDB;

  public static getIntance (): CartMongoModelDB {
    if (!CartMongoModelDB.instance) {
      CartMongoModelDB.instance = new CartMongoModelDB();
    }
    return CartMongoModelDB.instance;
  }

  private constructor () {
  }

  createLine (idCart: string, cartLine: CartLine): Promise<CartLine | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  updateLine (idCart: string, cartLine: CartLine): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  deleteLine (idCart: string, orderLine: string): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  read (id: string): Promise<Cart | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

}

export default CartMongoModelDB;
