import { ArticleAreaMongo } from '../../../mongoose';
import { Area } from '@model/index';
import IModelDBArticleArea from '../../IModelDBArticleArea';

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

  read (id: string): Promise<Area> {
    return ArticleAreaMongo.aggregate([
      { $match: { 'area.name': id } },
      { $group: { _id: '$area' } },
      {
        $project: {
          _id: 0,
          area: '$_id'
        }
      }
    ]).then((list) => list.shift());
  }

  readList (): Promise<Area[]> {
    return ArticleAreaMongo.aggregate([
      { $group: { _id: '$area' } },
      {
        $project: {
          _id: 0,
          area: '$_id'
        }
      }
    ]).then((list) => list.map((area) => ({ ...area })));
  }

}

export default AreaMongoModelDB;
