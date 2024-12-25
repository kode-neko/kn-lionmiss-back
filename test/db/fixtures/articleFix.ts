/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  InstructEnum, Article, ArticleArea, Area
} from '@model/index';
import { faker } from '@faker-js/faker';
import { constFixListArea } from './constFix';

// Area

function createFixArea (area?: Area): Area {
  const {
    name,
    country,
    locale,
    currency,
    dateFormat,
    gen
  }: Area = area || faker.helpers.arrayElement(constFixListArea);
  return {
    id: faker.database.mongodbObjectId(),
    name,
    country,
    locale,
    currency,
    dateFormat,
    gen
  };
}

function createFixAreaNoId (area?: Area): Area {
  const { id, ...rest } = createFixArea(area);
  return rest;
}

function createFixListArea (size = 10): Area[] {
  return Array(size)
    .fill({})
    .map(() => createFixArea());
}

// Article Area

function createFixArticleArea (area?): ArticleArea {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.lorem.words(),
    desc: faker.lorem.sentence(),
    price: faker.number.float({
      min: 6, max: 100, fractionDigits: 2
    }),
    tax: faker.helpers.rangeToNumber({ min: 0, max: 99 }),
    area: area || createFixArea()
  };
}

function createFixArticleAreaNoId (area?): ArticleArea {
  const { id, ...rest } = createFixArticleArea(area);
  return rest;
}

function createFixListArticleArea (size = 10): ArticleArea[] {
  return Array(size)
    .fill({})
    .map(() => createFixArticleArea());
}

// Article

function createFixArticle (): Article {
  return {
    id: faker.database.mongodbObjectId(),
    instructs: { [InstructEnum.IRONING]: '100º' },
    sizes: { sm: 12 },
    materials: { cotton: 30 },
    tags: [faker.lorem.word()],
    variants: [faker.lorem.word()],
    discolor: faker.datatype.boolean(),
    articleAreaList: []
  };
}

function createFixArticleNoId (): Article {
  const { id, ...rest } = createFixArticle();
  return rest;
}

function createFixListArticle (size = 10): Article[] {
  return Array(size)
    .fill({})
    .map(() => createFixArticle());
}

export {
  createFixArea,
  createFixAreaNoId,
  createFixListArea,

  createFixArticleArea,
  createFixArticleAreaNoId,
  createFixListArticleArea,

  createFixArticle,
  createFixArticleNoId,
  createFixListArticle
};
