import IModelDB from './IModelDB';
import { NotFoundDbException } from '../error';
import { Cart, CartLine } from '../../model';

interface IModelDBCart extends Pick<IModelDB<Cart>, 'read'> {
  createLine(idCart: string, cartLine: CartLine): Promise<Cart | NotFoundDbException>;
  updateLine(idCart: string, cartLine: CartLine): Promise<void | NotFoundDbException>;
  deleteLine(idCart: string, orderLine: string): Promise<void | NotFoundDbException>;
}

export default IModelDBCart;
