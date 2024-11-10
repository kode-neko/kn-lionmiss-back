import { Area, SearchParams } from '@model/index';
import { IModelDBArea } from '../../interfaces';
import { IAreaMongoose } from '../db/interfaces';
import { NotFoundDbException } from '../../error';
import { AreaModelMongoose } from '../db/models';
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
      _id: new Types.ObjectId(area.id as string),
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

  create (obj: Area): Promise<Area> {
    return AreaModelMongoose
      .create(AreaMongooseModelDB.parseAreaToMongoose(obj))
      .then((res) => AreaMongooseModelDB.parseMongooseToArea(res));
  }

  update (obj: Area): Promise<void> | NotFoundDbException {
    const { _id, ...rest } = AreaMongooseModelDB.parseAreaToMongoose(obj);
    return AreaModelMongoose
      .updateOne({ _id }, rest)
      .then(({ modifiedCount }) => {
        if (modifiedCount === 0) throw new NotFoundDbException();
      });
  }

  delete (id: string): Promise<void> | NotFoundDbException {
    return AreaModelMongoose
      .deleteMany({ _id: new Types.ObjectId(id) })
      .then(({ deletedCount }) => {
        if (deletedCount === 0) throw new NotFoundDbException();
      });
  }

}

export default AreaMongooseModelDB;
