import {
  Shipping, ShippingLine, SearchParams, Article
} from '@model/index';
import { Types } from 'mongoose';
import { IModelDB, IModelDBShipping } from '../../interfaces';
import {
  ShippingAreaModelMongoose, ShippingModelMongoose, IShippingAreaMongoose, IShippingMongoose,
  CartModelMongoose,
  IArticleMongoose,
  IShippingLineMongoose
} from '../db';
import { NotFoundDbException } from '../../error';
import ShippingAreaMongooseModelDB from './ShippingAreaMongooseModelDB';
import ArticleMongooseModelDB from './ArticleMongooseModelDB';

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
      _id: new Types.ObjectId(shipping.id),
      idTracking: shipping.idTracking,
      idShipping: shipping.idShipping,
      state: shipping.state,
      payment: shipping.payment,
      lines: shipping.lines
    };
  }

  public static parseMongooseToShipping (shippingMongo: IShippingMongoose, shippingList?: ShippingLine[]): Shipping {
    return {
      id: shippingMongo._id?._id.toString(),
      idTracking: shippingMongo.idTracking,
      idShipping: shippingMongo.idShipping,
      state: shippingMongo.state,
      payment: shippingMongo.payment,
      lines: shippingMongo.lines.map((l) => ({
        id: l.id,
        article: ,
        qty: l.qty
      }))
    };
  }

  public static parseShippingLineToMongoose (shippingLine: Shipping): IShippingLineMongoose {
    return {
      id: shippingLine.id,
      qty: shippingLine.qty,
      article: new Types.ObjectId(shippingLine.article.id)
    };
  }

  public static parseMongooseToShippingLine (shippingLineMongo: IShippingLineMongoose, article: Article): ShippingLine {
    return {
      id: shippingLineMongo.id,
      qty: shippingLineMongo.qty,
      article: article
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

  create (obj: Shipping): Promise<Shipping> {
    return ShippingModelMongoose
      .create(ShippingMongooseModelDB.parseShippingToMongoose(obj))
      .then((res) => ShippingMongooseModelDB.parseMongooseToShipping(res));
  }

  update (obj: Shipping): Promise<void> | NotFoundDbException {
    const { _id, ...rest } = ShippingMongooseModelDB.parseShippingToMongoose(obj);
    return ShippingModelMongoose
      .updateOne({ _id }, rest)
      .then(({ modifiedCount }) => {
        if (modifiedCount === 0) throw new NotFoundDbException();
      });
  }

  delete (id: string): Promise<void> | NotFoundDbException {
    return ShippingModelMongoose
      .deleteMany({ _id: new Types.ObjectId(id) })
      .then(({ deletedCount }) => {
        if (deletedCount === 0) throw new NotFoundDbException();
      });
  }

}

export default ShippingMongooseModelDB;
