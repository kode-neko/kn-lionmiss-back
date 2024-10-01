import { Area } from '@model/index';
import { ArticleAreaModelMongo, IAreaMongo } from '../../../mongoose';
import { IModelDBArticleArea } from '../../interfaces';
import { Types } from 'mongoose';

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
    const { id, ...rest } = area;
    return { _id: new Types.ObjectId(id), ...rest };
  }

  private static parseMongoToArea (mongo: IAreaMongo): Area {
    const { _id, ...rest } = mongo;
    return { id: _id?.toString(), ...rest };
  }

  read (id: string): Promise<Area> {
    return ArticleAreaModelMongo.aggregate([
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
    return ArticleAreaModelMongo.aggregate([
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
