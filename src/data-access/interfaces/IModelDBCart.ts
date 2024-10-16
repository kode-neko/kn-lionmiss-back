import { CartLine } from '@model/cart';
import { Cart } from '@model/article';
import IModelDB from './IModelDB';
import { NotFoundDbException } from '../error';

interface IModelDBCart extends Pick<IModelDB<Cart>, 'read'> {
  createLine(idCart: string, cartLine: CartLine): Promise<Cart> | NotFoundDbException;
  updateLine(idCart: string, cartLine: CartLine): Promise<void> | NotFoundDbException;
  deleteLine(idCart: string, cartLine: CartLine): Promise<void> | NotFoundDbException;
}

export default IModelDBCart;
