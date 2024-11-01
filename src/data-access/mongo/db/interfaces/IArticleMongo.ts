import { InstructEnum } from '@model/index';
import { ObjectId } from 'mongodb';
import IArticleAreaMongo from './IArticleAreaMongo';

interface IArticleMongo {
  _id?: ObjectId;
  instructs: Partial<Record<InstructEnum, string>>;
  sizes: Record<string, number>;
  materials: Record<string, number>;
  tags: string[];
  variants: string[];
  discolor: boolean;
  articleAreaList: IArticleAreaMongo['_id'];
}

export default IArticleMongo;
