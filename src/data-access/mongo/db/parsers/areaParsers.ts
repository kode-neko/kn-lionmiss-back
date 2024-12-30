import { ObjectId } from 'mongodb';
import { AreaMongo } from '../interfaces';
import Area from '../../../../model/article/Area';

function parseAreaToMongo (area: Area): AreaMongo {
  return {
    _id: new ObjectId(area.id),
    name: area.name,
    country: area.country,
    locale: area.locale,
    currency: area.currency,
    dateFormat: area.dateFormat,
    gen: area.gen
  };
}

function parseMongoToArea (mongo: AreaMongo): Area {
  return {
    id: mongo._id?.toString(),
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
