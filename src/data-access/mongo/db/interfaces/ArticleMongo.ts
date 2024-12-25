import { InstructEnum } from '@model/index';
import { PictureMongo } from './PictureMongo';

interface ArticleVariantMongo {
  name: string;
  sizes: Record<string, number>;
}

interface ArticleAreaMongo {
  _id?: string;
  title: string;
  desc: string;
  variantList: Record<ArticleVariantMongo['name'], string>;
  price: number;
  tax: number;

  area: string;
}

interface ArticleMongo {
  _id?: string;
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
