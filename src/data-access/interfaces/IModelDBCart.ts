import { Cart, CartLine } from '@model/cart';
import IModelDB from './IModelDB';
import { NotFoundDbException } from '../error';

interface IModelDBCart extends Pick<IModelDB<Cart>, 'read'> {
  createLine(idCart: string, cartLine: CartLine): Promise<Cart | NotFoundDbException>;
  updateLine(idCart: string, cartLine: CartLine): Promise<void | NotFoundDbException>;
  deleteLine(idCart: string, orderLine: string): Promise<void | NotFoundDbException>;
}

export default IModelDBCart;
