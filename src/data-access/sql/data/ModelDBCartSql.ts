import { CartLine } from '@model/index';
import { Cart } from '@model/cart';
import { NotFoundDbException } from '../../error';
import { IModelDBCart } from '../../interfaces';

class CartMongoModelDB implements IModelDBCart {

  private static instance: IModelDBCart;

  public static getIntance (): IModelDBCart {
    if (!CartMongoModelDB.instance) {
      CartMongoModelDB.instance = new CartMongoModelDB();
    }
    return CartMongoModelDB.instance;
  }

  private constructor () {
  }

  createLine (idCart: string, cartLine: CartLine): Promise<Cart | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  updateLine (idCart: string, cartLine: CartLine): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  deleteLine (idCart: string, idCartLine: string): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  read (id: string): Promise<Cart> {
    throw new Error('Method not implemented.');
  }

}

export default CartMongoModelDB;
