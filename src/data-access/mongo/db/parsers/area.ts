import { ObjectId } from 'mongodb';
import { Area } from '../../../../../model';
import { AreaMongo } from '../../interfaces';

function parseAreaToMongo (obj: Area): AreaMongo {
  return {
    _id: new ObjectId(obj.id),
    name: obj.name,
    country: obj.country,
    locale: obj.locale,
    currency: obj.currency,
    dateFormat: obj.dateFormat,
    gen: obj.gen
  };
}

function parseMongoToArea (mongo: AreaMongo): Area {
  return {
    id: mongo._id.toString(),
    name: mongo.name,
    country: mongo.country,
    locale: mongo.locale,
    currency: mongo.currency,
    dateFormat: mongo.dateFormat,
    gen: mongo.gen
  };
}

export {
  parseAreaToMongo,
  parseMongoToArea
};
