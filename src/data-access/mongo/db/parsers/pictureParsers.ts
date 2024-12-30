import { Picture } from '../../../../model';
import { PictureMongo } from '../interfaces';

function parsePictureToMongo (picture: Picture): PictureMongo {
  return { ...picture };
}

function parseMongoToPicture (mongo: PictureMongo): Picture {
  return { ...mongo };
}

export {
  parsePictureToMongo,
  parseMongoToPicture
};
