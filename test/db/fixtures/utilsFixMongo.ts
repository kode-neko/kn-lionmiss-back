/* eslint-disable @typescript-eslint/no-unused-vars */
import { Article, InstructEnum } from '@model/index';
import { faker } from '@faker-js/faker';

function createArticleFixMongo (): Article {
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

function createArticleNoIdFixMongo (): Article {
  const { id, ...rest } = createArticleFixMongo();
  return rest;
}

function createArticleListFixMongo (size = 10): Article[] {
  return Array(size)
    .fill({})
    .map(() => createArticleFixMongo());
}

export {
  createArticleFixMongo,
  createArticleNoIdFixMongo,
  createArticleListFixMongo
};
