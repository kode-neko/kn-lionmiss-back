import { InstructEnum } from '@model/index';
import { ObjectId } from 'mongodb';
import IArticleAreaMongo from './IArticleAreaMongo';

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
  pictureList: {
    id: string;
    ext: string;
    src: string;
    alt: string;
  } [];
  articleAreaList: IArticleAreaMongo['_id'][];
}

export default ArticleMongo;
