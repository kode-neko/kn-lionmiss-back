import IModelDB from '../../IModelDB';
import { Address } from '@model/index';

class AddressSeqModelDB implements IModelDB<Address> {

  read (id: string): Promise<Address> {
    throw new Error('Method not implemented.');
  }

  readList (searchParams: Address): Promise<Address[]> {
    throw new Error('Method not implemented.');
  }

  create (obj: Address): Promise<Address> {
    throw new Error('Method not implemented.');
  }

  update (obj: Address): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  delete (id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

}

export default AddressSeqModelDB;
