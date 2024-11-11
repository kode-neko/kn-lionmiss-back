/* eslint-disable @typescript-eslint/no-unused-vars */
import { CartLine } from '@model/cart';
import { Cart } from '@model/index';
import { NotFoundDbException } from '../../error';
import { IModelDBCart } from '../../interfaces';

class CartSeqModelDB implements IModelDBCart {

  private static instance: IModelDBCart;

  public static getIntance (): IModelDBCart {
    if (!CartSeqModelDB.instance) {
      CartSeqModelDB.instance = new CartSeqModelDB();
    }
    return CartSeqModelDB.instance;
  }

  private constructor () {

  }

  newCartUser (idUser: string): Promise<Cart | NotFoundDbException> {
    throw new Error('Method not implemented.');
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

  read (id: string): NotFoundDbException | Promise<Cart> {
    throw new Error('Method not implemented.');
  }

}

export default CartSeqModelDB;
