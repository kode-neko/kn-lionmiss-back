import { ObjectId } from 'mongodb';
import { createFixPictureMongo } from './pictureFix';
import {
  ArticleAreaMongo, ArticleMongo, ArticleVariantMongo
} from '../data-access';
import { InstructEnum } from '../model';
import { faker } from '@faker-js/faker';

function createFixArticleVariantMongo (): ArticleVariantMongo {
  return {
    name: faker.vehicle.color(),
    sizes: {
      xs: faker.number.int(100),
      s: faker.number.int(100),
      m: faker.number.int(100),
      l: faker.number.int(100),
      xl: faker.number.int(100)
    }
  };
}

function createFixArticleAreaMongo (variantList: ArticleVariantMongo[], area: string): ArticleAreaMongo {
  const variantObj: ArticleAreaMongo['variantList'] = {};
  variantList.forEach((v) => variantObj[v.name] = faker.lorem.word());
  return {
    id: faker.string.ulid(),
    title: faker.lorem.words(),
    desc: faker.lorem.paragraph(),
    variantList: variantObj,
    price: parseFloat(faker.commerce.price()),
    tax: faker.number.int(100),

    area
  };
}

function createFixArticleMongo (): ArticleMongo {
  const articleVariantList = [
    createFixArticleVariantMongo(),
    createFixArticleVariantMongo(),
    createFixArticleVariantMongo()
  ];
  const articleAreaList = [
    createFixArticleAreaMongo(articleVariantList, 'spanish'),
    createFixArticleAreaMongo(articleVariantList, 'english-uk')
  ];
  return {
    _id: new ObjectId(),
    tags: [
      faker.word.noun(),
      faker.word.noun(),
      faker.word.noun()
    ],
    materials: {
      cotton: faker.number.int(100),
      nylon: faker.number.int(100)
    },
    instructs: {
      [InstructEnum.WHASING]: faker.word.noun(),
      [InstructEnum.IRONING]: faker.word.noun(),
      [InstructEnum.SPINNING]: faker.word.noun(),
      [InstructEnum.DRY_CLEANING]: faker.word.noun()
    },
    discolor: faker.datatype.boolean(),

    articleVariantList: articleVariantList,
    pictureList: [
      createFixPictureMongo(),
      createFixPictureMongo(),
      createFixPictureMongo()
    ],
    articleAreaList
  };
}

export {
  createFixArticleVariantMongo,
  createFixArticleAreaMongo,
  createFixArticleMongo
};
