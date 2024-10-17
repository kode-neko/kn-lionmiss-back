import { NotFoundDbException } from '@data-access/index';
import { Area, SearchParams } from '@model/index';
import { AreaModelMongoose, IAreaMongoose } from '../db';
import { IModelDBArea } from '../../interfaces';
import { Types } from 'mongoose';

class AreaMongooseModelDB implements IModelDBArea {

  private static instance: AreaMongooseModelDB;

  public static getIntance (): AreaMongooseModelDB {
    if (!AreaMongooseModelDB.instance) {
      AreaMongooseModelDB.instance = new AreaMongooseModelDB();
    }
    return AreaMongooseModelDB.instance;
  }

  private constructor () {

  }

  public static parseAreaToMongoose (area: Area): IAreaMongoose {
    return {
      _id: new Types.ObjectId(area.id),
      name: area.name,
      locale: area.locale,
      country: area.country,
      symbol: area.symbol
    };
  }

  public static parseMongooseToArea (mongo: IAreaMongoose): Area {
    return {
      id: mongo._id?.toString(),
      name: mongo.name,
      locale: mongo.locale,
      country: mongo.country,
      symbol: mongo.symbol
    };
  }

  read (id: string): Promise<Area> | NotFoundDbException {
    return AreaModelMongoose
      .findById(id)
      .then((res) => {
        if (!res) throw new NotFoundDbException();
        return AreaMongooseModelDB.parseMongooseToArea(res as IAreaMongoose);
      });
  }

  readByProps (obj: Partial<Area>): Promise<Area> | NotFoundDbException {
    return AreaModelMongoose
      .findOne(obj)
      .then((res) => {
        if (!res) throw new NotFoundDbException();
        return AreaMongooseModelDB.parseMongooseToArea(res as IAreaMongoose);
      });
  }

  readList ({ limit, skip }: SearchParams<Area>): Promise<Area[]> {
    return AreaModelMongoose
      .find()
      .skip(skip)
      .limit(limit)
      .then((list) => list.map((a) => AreaMongooseModelDB
        .parseMongooseToArea(a)));
  }

  /*
  read (id: string): Promise<Area> {
    return ArticleAreaModelMongoose.aggregate([
      { $match: { 'area.name': id } },
      { $group: { _id: '$area' } },
      {
        $project: {
          _id: 0,
          area: '$_id'
        }
      }
    ]).then((list) => AreaMongooseModelDB.parseMongoToArea(list.shift()));
  }

  readList (): Promise<Area[]> {
    return ArticleAreaModelMongoose.aggregate([
      { $group: { _id: '$area' } },
      {
        $project: {
          _id: 0,
          area: '$_id'
        }
      }
    ]).then((list) => list.map((res) => AreaMongooseModelDB.parseMongoToArea(res.area)));
  }
*/

}

export default AreaMongooseModelDB;
