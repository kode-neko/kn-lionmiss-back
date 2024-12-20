import { shipping } from '@fixtures/shipping';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { faker } from '@faker-js/faker';
import {
  createFixArea, createFixArticle, createFixListArticle
} from './articleFix';
import {
  Comment, Address, UnitsHeightEnum, UnitsWeightEnum, SexEnum, User
} from '@model/index';
import { createFixCart, createFixShipping } from './cartFix';

// Comment

function createFixComment (): Comment {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.lorem.words(),
    text: faker.lorem.words(),
    rating: faker.helpers.rangeToNumber({ min: 0, max: 5 }),
    pics: [],
    user: faker.internet.userName(),
    article: faker.database.mongodbObjectId()
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
    id: faker.database.mongodbObjectId(),
    alias: faker.internet.userName(),
    name: faker.person.firstName(),
    surname: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    phone: Number(faker.phone.number()),
    obs: faker.lorem.paragraph()
  };
}

function createFixAddressNoId (): Address {
  const { id, ...rest } = createFixAddress();
  return rest;
}

function createFixListAddress (size = 3): Address[] {
  return Array(size)
    .fill({})
    .map(() => createFixAddress());
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
    id: faker.database.mongodbObjectId(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    bday: faker.date.birthdate(),
    sex: faker.helpers.arrayElement(Object.values(SexEnum)),
    area: createFixArea(),
    measures: createFixMeasures(),
    addresses: createFixListAddress(),
    favs: createFixListArticle(),
    cart: createFixCart(),
    shippings: [createFixShipping()]
  };
}

export {
  createFixComment,
  createFixCommentNoId,
  createFixListComment,

  createFixAddress,
  createFixAddressNoId,
  createFixListAddress,

  createFixMeasures,
  createFixUser
};
