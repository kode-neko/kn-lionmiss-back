import {
  Shipping, ShippingLine, SearchParams, Article
} from '@model/index';
import { Types } from 'mongoose';
import { IModelDB, IModelDBShipping } from '../../interfaces';
import {
  ShippingAreaModelMongoose, ShippingModelMongoose, IShippingAreaMongoose, IShippingMongoose,
  CartModelMongoose,
  IArticleMongoose,
  IShippingLineMongoose,
  ArticleModelMongoose
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
      lines: shipping.lines.map(l => ShippingMongooseModelDB.parseShippingLineToMongoose(l)) 
    };
  }

  public static parseShippingLineToMongoose (shippingLine: ShippingLine): IShippingLineMongoose {
    return {
      id: shippingLine.id,
      qty: shippingLine.qty,
      article: new Types.ObjectId(shippingLine.article.id)
    };
  }

  public static parseMongooseToShipping (shippingMongo: IShippingMongoose, articleListMongo: IArticleMongoose[]): Shipping {
    return {
      id: shippingMongo._id?._id.toString(),
      idTracking: shippingMongo.idTracking,
      idShipping: shippingMongo.idShipping,
      state: shippingMongo.state,
      payment: shippingMongo.payment,
      lines: shippingMongo.lines.map(l => ShippingMongooseModelDB.parseMongooseToShippingLine(l, articleListMongo.find(a => a._id?.toString() === l.article._id?.toString()) as IArticleMongoose))
    };
  }

  public static parseMongooseToShippingLine (shippingLineMongo: IShippingLineMongoose, articleMongo: IArticleMongoose): ShippingLine {
    return {
      id: shippingLineMongo.id,
      qty: shippingLineMongo.qty,
      article: ArticleMongooseModelDB.parseMongooseToArticle(articleMongo)
    };
  }

  read(id: string): NotFoundDbException | Promise<Shipping> {
    let shipping: IShippingMongoose;
    return ShippingModelMongoose
      .findById(id)
      .then((res) => {
        if (!res) throw new NotFoundDbException();
        shipping = res;
        const articlesIds = shipping.lines.map(l => l.article);
        return ArticleModelMongoose.find({_id: {$in: articlesIds}})
      })
      .then(list => ShippingMongooseModelDB.parseMongooseToShipping(shipping, list));
  }

  readList({ limit, skip }: SearchParams): Promise<Shipping[]> {
    let shippingList: IShippingMongoose[];
    return ShippingModelMongoose
      .find()
      .skip(skip)
      .limit(limit)
      .then((list) => {
        const articleIds = list.flatMap(s => s.lines.map(l => l.article))
        return ArticleModelMongoose
        .find({_id: {$in: articleIds}})
      })
      .then(list => {
        return shippingList.map(s => ShippingMongooseModelDB.parseMongooseToShipping(s, list)) 
      });
  }

  create(obj: Shipping): Promise<Shipping> {
    let shipping;
    return ShippingModelMongoose
      .create(ShippingMongooseModelDB.parseShippingToMongoose(obj))
      .then((res) => {
        shipping = res
        const articleIds = shipping.lines.map(l => l.article)
        return ArticleModelMongoose
          .find({_id: {$in: articleIds}})
      })
      .then((list) => ShippingMongooseModelDB.parseMongooseToShipping(shipping, list));
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
      .deleteOne({ _id: new Types.ObjectId(id) })
      .then(({ deletedCount }) => {
        if (deletedCount === 0) throw new NotFoundDbException();
      });
  }

}

export default ShippingMongooseModelDB;
