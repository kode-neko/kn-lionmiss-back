
import { Shipping } from '../../model';
import IModelDB from './IModelDB';

interface IModelDBShipping extends Omit<IModelDB<Shipping>, 'create'> {
  createFromCart(cartId: string): Promise<Shipping>;
}

export default IModelDBShipping;
