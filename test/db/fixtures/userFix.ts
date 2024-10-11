/* eslint-disable @typescript-eslint/no-unused-vars */
// User

import { faker } from '@faker-js/faker';
import {
  createFixArea, createFixArticle, createFixListArticle
} from './articleFix';
import {
  Comment, Address, UnitsHeightEnum, UnitsWeightEnum, SexEnum, User
} from '@model/index';
import { createFixCart } from './cartFix';

// Comment

function createFixComment (): Comment {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.lorem.words(),
    text: faker.lorem.words(),
    rating: faker.helpers.rangeToNumber({ min: 0, max: 5 }),
    pics: [],
    article: createFixArticle()
  };
}

function createFixCommentNoId (): Comment {
  const { id, ...rest } = createFixComment();
  return rest;
}

function createFixListComment (size = 10): Comment[] {
  return Array(size)
    .fill({})
    .map(() => createFixComment());
}

// Address

function createFixAddress (): Address {
  return {
    id: faker.database.mongodbObjectId,
    alias: faker.internet.userName(),
    name: faker.person.firstName(),
    surname: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    phone: faker.phone.number(),
    obs: faker.lorem.paragraph()
  };
}

function createFixAddressNoId (): Comment {
  const { id, ...rest } = createFixAddress();
  return rest;
}

// Measures

function createFixMeasures () {
  return {
    shoulder: faker.helpers.rangeToNumber({ min: 38, max: 46 }),
    chest: faker.helpers.rangeToNumber({ min: 90, max: 110 }),
    waist: faker.helpers.rangeToNumber({ min: 60, max: 90 }),
    hips: faker.helpers.rangeToNumber({ min: 90, max: 110 }),
    foot: faker.helpers.rangeToNumber({ min: 36, max: 42 }),
    height: faker.helpers.rangeToNumber({ min: 150, max: 200 }),
    weight: faker.helpers.rangeToNumber({ min: 55, max: 75 }),
    unitsHeight: UnitsHeightEnum.CM,
    unitsWeight: UnitsWeightEnum.KG
  };
}

// Users

function createFixUser (): User {
  return {
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    bday: faker.date.birthdate(),
    sex: faker.helpers.arrayElement(Object.values(SexEnum)),
    area: createFixArea(),
    measures: createFixMeasures(),
    commentList: createFixListComment(),
    addressList: createFixAddress(),
    favList: createFixListArticle(),
    cart: createFixCart()
  };
}

export {
  createFixComment,
  createFixCommentNoId,
  createFixListComment,

  createFixAddress,
  createFixAddressNoId,

  createFixMeasures,
  createFixUser
};
