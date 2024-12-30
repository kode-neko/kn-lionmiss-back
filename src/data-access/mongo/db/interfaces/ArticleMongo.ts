import { ObjectId } from 'mongodb';
import { InstructEnum } from '@model/index';
import { PictureMongo } from './PictureMongo';
import { AreaMongo } from './AreaMongo';

interface ArticleVariantMongo {
  name: string;
  sizes: Record<string, number>;
}

interface ArticleAreaMongo {
  id?: string;
  title: string;
  desc: string;
  variantList: Record<ArticleVariantMongo['name'], string>;
  price: number;
  tax: number;

  area: AreaMongo['name'];
}

interface ArticleMongo {
  _id?: ObjectId;
  tags: string[];
  materials: Record<string, number>;
  instructs: Partial<Record<InstructEnum, string>>;
  discolor: boolean;

  articleVariantList: ArticleVariantMongo[];
  pictureList: PictureMongo[];
  articleAreaList: ArticleAreaMongo[];
}

export {
  ArticleVariantMongo,
  ArticleAreaMongo,
  ArticleMongo
};
