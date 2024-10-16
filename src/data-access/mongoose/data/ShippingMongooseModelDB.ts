import { Shipping } from '@model/index';
import { Types } from 'mongoose';
import { IModelDB, IModelDBShipping } from '../../interfaces';
import {
  ShippingAreaModelMongoose, ShippingModelMongoose, IShippingAreaMongoose, IShippingMongoose
} from '../db';
import { NotFoundDbException } from '../../error';
import ShippingAreaMongooseModelDB from './ShippingAreaMongooseModelDB';

class ShippingMongooseModelDB implements IModelDBShipping {

  private static instance: IModelDBShipping;

  public static getIntance (): IModelDBShipping {
    if (!ShippingMongooseModelDB.instance) {
      ShippingMongooseModelDB.instance = new ShippingMongooseModelDB();
    }
    return ShippingMongooseModelDB.instance;
  }

  private constructor () {

  }

  read (id: string): NotFoundDbException | Promise<Shipping> {
    throw new Error('Method not implemented.');
  }

  readList (searchParams?: any): Promise<Shipping[]> {
    throw new Error('Method not implemented.');
  }

  create (obj: any): Promise<Shipping> {
    throw new Error('Method not implemented.');
  }

  update (obj: any): Promise<void> | NotFoundDbException {
    throw new Error('Method not implemented.');
  }

  delete (id: string): Promise<void> | NotFoundDbException {
    throw new Error('Method not implemented.');
  }

}

export default ShippingMongooseModelDB;
