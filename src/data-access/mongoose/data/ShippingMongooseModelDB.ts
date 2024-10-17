import { Shipping, SearchParams } from '@model/index';
import { Types } from 'mongoose';
import { IModelDB, IModelDBShipping } from '../../interfaces';
import {
  ShippingAreaModelMongoose, ShippingModelMongoose, IShippingAreaMongoose, IShippingMongoose,
  CartModelMongoose
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

  public static parseShippingToMongoose (shipping: Shipping): IShippingMongoose {
    return {
      idTracking: shipping.idTracking,
      idShipping: shipping.idShipping,
      state: shipping.state,
      payment: shipping.payment
    };
  }

  public static parseMongooseToShipping (mongo: IShippingMongoose, idCart: string): Shipping {
    return {
      id: new Types.ObjectId(idCart),
      idTracking: mongo.idTracking,
      idShipping: mongo.idShipping,
      state: mongo.state,
      payment: mongo.payment
    };
  }

  read (id: string): NotFoundDbException | Promise<Shipping> {
    return CartModelMongoose
      .findById(id)
      .then((res) => {
        if (!res) throw new NotFoundDbException();
        return ShippingMongooseModelDB
          .parseMongooseToShipping(res.shipping, res.id.toString());
      });
  }

  readList ({ limit, skip }: SearchParams): Promise<Shipping[]> {
    return CartModelMongoose
      .find()
      .skip(skip)
      .limit(limit)
      .then((list) => list.map((c) => ShippingMongooseModelDB
        .parseMongooseToShipping(c.shipping, c.id.toString())));
  }

  create (obj: Shipping & { id: string }): Promise<Shipping> {
    return CartModelMongoose
      .create(ArticleMongooseModelDB.parseArticleToMongoose(obj))
      .then((res) => ArticleMongooseModelDB.parseMongooseToArticle(res));
  }

  update (obj: any): Promise<void> | NotFoundDbException {
    throw new Error('Method not implemented.');
  }

  delete (id: string): Promise<void> | NotFoundDbException {
    throw new Error('Method not implemented.');
  }

}

export default ShippingMongooseModelDB;
