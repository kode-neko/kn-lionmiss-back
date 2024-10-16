import { Area } from '@model/index';
import { IModelDBArticleArea } from '../../interfaces';
import { ArticleAreaModelMongoose, IAreaMongoose } from '../db';

class AreaMongooseModelDB implements IModelDBArticleArea {

  private static instance: IModelDBArticleArea;

  public static getIntance (): IModelDBArticleArea {
    if (!AreaMongooseModelDB.instance) {
      AreaMongooseModelDB.instance = new AreaMongooseModelDB();
    }
    return AreaMongooseModelDB.instance;
  }

  private constructor () {

  }

  public static parseAreaToMongo (area: Area): IAreaMongoose {
    return {
      name: area.name,
      country: area.country,
      symbol: area.symbol
    };
  }

  public static parseMongoToArea (mongo: IAreaMongoose): Area {
    return {
      name: mongo.name,
      country: mongo.country,
      symbol: mongo.symbol
    };
  }

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

}

export default AreaMongooseModelDB;
