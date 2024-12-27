import { SearchParams, Shipping } from '../../../model';
import { NotFoundDbException } from '../../error';
import { IModelDBShipping } from '../../interfaces';

class ShippingMongoModelDB implements IModelDBShipping {

  private static instance: IModelDBShipping;

  public static getIntance (): IModelDBShipping {
    if (!ShippingMongoModelDB.instance) {
      ShippingMongoModelDB.instance = new ShippingMongoModelDB();
    }
    return ShippingMongoModelDB.instance;
  }

  private constructor () {

  }

  createFromUserCart (userId: string, shippingOps: Pick<Shipping, 'idTracking' | 'state' | 'idPayment' | 'payment'>): Promise<Shipping> {
    throw new Error('Method not implemented.');
  }

  read (id: string): Promise<Shipping | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  readList (searchParams: SearchParams<Shipping>): Promise<Shipping[]> {
    throw new Error('Method not implemented.');
  }

  update (obj: Shipping): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  delete (id: string): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

}

export default ShippingMongoModelDB;
