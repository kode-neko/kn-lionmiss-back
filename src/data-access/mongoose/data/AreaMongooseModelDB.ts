import { Area } from '@model/index';
import { IModelDBArticleArea } from '../../interfaces';
import IAreaMongo from '../db/interfaces/IAreaMongoose';
import { ArticleAreaModelMongoose } from '../db';

class AreaMongoModelDB implements IModelDBArticleArea {

  private static instance: IModelDBArticleArea;

  public static getIntance (): IModelDBArticleArea {
    if (!AreaMongoModelDB.instance) {
      AreaMongoModelDB.instance = new AreaMongoModelDB();
    }
    return AreaMongoModelDB.instance;
  }

  private constructor () {

  }

  private static parseAreaToMongo (area: Area): IAreaMongo {
    return { ...area };
  }

  private static parseMongoToArea (mongo: IAreaMongo): Area {
    return { ...mongo };
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
    ]).then((list) => AreaMongoModelDB.parseMongoToArea(list.shift()));
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
    ]).then((list) => list.map((res) => AreaMongoModelDB.parseMongoToArea(res.area)));
  }

}

export default AreaMongoModelDB;
