import { ObjectId } from 'mongodb';
import { ArticleArea } from '../../../../../model';
import { ArticleAreaMongo } from '../../interfaces';

function parseArticleAreaToMongo (obj: ArticleArea): ArticleAreaMongo {
  return {
    _id: new ObjectId(obj.id),
    title: obj.title,
    desc: obj.desc,
    variantList: obj.variantList,
    price: obj.price,
    tax: obj.tax,
    area: obj.area
  };
}

function parseMongoToArticleArea (mongo: ArticleAreaMongo): ArticleArea {
  return {
    id: mongo._id.toString(),
    title: mongo.title,
    desc: mongo.desc,
    variantList: mongo.variantList,
    price: mongo.price,
    tax: mongo.tax,
    area: mongo.area
  };
}

export {
  parseArticleAreaToMongo,
  parseMongoToArticleArea
};
