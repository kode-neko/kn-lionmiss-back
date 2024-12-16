import { InstructEnum } from '@model/index';
import { ObjectId } from 'mongodb';
import IArticleAreaMongo from './IArticleAreaMongo';
import PictureMongo from './PictureMongo';

interface ArticleMongo {
  _id?: ObjectId;
  tags: string[];
  materials: Record<string, number>;
  instructs: Partial<Record<InstructEnum, string>>;
  discolor: boolean;
  articleVariantList: {
    name: string;
    sizes: Record<string, number>;
  }[];
  pictureList: PictureMongo[];
  articleAreaList: IArticleAreaMongo['_id'][];
}

export default ArticleMongo;
