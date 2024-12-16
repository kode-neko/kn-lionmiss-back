import { ObjectId } from 'mongodb';
import { PictureMongo } from '../../interfaces';
import { Picture } from '../../../../../model';

function parsePictureToMongo (obj: Picture) {
  return {
    _id: new ObjectId(obj.id),
    ext: obj.ext,
    src: obj.src,
    alt: obj.alt
  };
}

function parseMongoToPicture (mongo: PictureMongo) {
  return {
    id: mongo._id.toString(),
    ext: mongo.ext,
    src: mongo.src,
    alt: mongo.alt
  };
}

export {
  parsePictureToMongo,
  parseMongoToPicture
};
