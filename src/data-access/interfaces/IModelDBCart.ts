import { CartLine } from '@model/cart';
import { Cart } from '@model/article';
import IModelDB from './IModelDB';
import { NotFoundDbException } from '../error';

interface IModelDBCart extends Pick<IModelDB<Cart>, 'read'> {
  newCartUser(idUser: string): Promise<Cart> | NotFoundDbException;
  createLine(idCart: string, cartLine: CartLine): Promise<Cart> | NotFoundDbException;
  updateLine(idCart: string, cartLine: CartLine): Promise<void> | NotFoundDbException;
  deleteLine(idCart: string, idCartLine: string): Promise<void> | NotFoundDbException;
}

export default IModelDBCart;
