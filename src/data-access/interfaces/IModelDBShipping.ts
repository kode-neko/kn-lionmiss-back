
import { Shipping } from '../../model';
import IModelDB from './IModelDB';

interface IModelDBShipping extends Omit<IModelDB<Shipping>, 'create'> {
  createFromUserCart(userId: string, shippingOps: Pick<Shipping, 'idTracking' | 'state' | 'idPayment' | 'payment'>): Promise<Shipping>;
}

export default IModelDBShipping;
