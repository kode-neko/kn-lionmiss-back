import {shipping} from '@fixtures/shipping';
import {Shipping, SearchParams} from '@model/index';

class ShippingService {

  constructor () {

  }

  public getShipping (id: string): Shipping {
    return shipping;
  }

  public getListShippings (searchParams: SearchParams): Shipping[] {
    return [shipping];
  }

  public createShipping (shipping: Shipping): Shipping {
    return {
      ...shipping,
      id: String(Date.now())
    };
  }

  public modifyShipping (shipping: Required<Shipping>): Shipping {
    return {
      ...shipping,
      id: String(Date.now())
    };
  }

  public deleteShipping (id: string): boolean {
    return true;
  }

}

export default ShippingService;
