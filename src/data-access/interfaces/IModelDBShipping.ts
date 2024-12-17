import { Shipping } from '@model/article';
import IModelDB from './IModelDB';

interface IModelDBShipping extends Omit<IModelDB<Shipping>, 'create'> {
  createFromCart(cartId: string): Promise<Shipping>;
}

export default IModelDBShipping;
