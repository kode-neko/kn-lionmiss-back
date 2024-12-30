import { ObjectId } from 'mongodb';
import { faker } from '@faker-js/faker';
import { ArticleMongo, CartLineMongo } from '../data-access';
import {
  AddressMongo, CartMongo, MeasuresMongo, ShippingMongo, UserMongo
} from '../data-access/mongo';
import {
  SexEnum, UnitsHeightEnum, UnitsWeightEnum
} from '../model';

function createFixCartLineMongo (article: ArticleMongo['_id']): CartLineMongo {
  return {
    order: faker.string.ulid(),
    qty: faker.number.int(),

    article
  };
}

function createFixCartMongo (articleList: ArticleMongo['_id'][]): CartMongo {
  return {
    id: faker.string.ulid(),

    cartLineList: articleList.map(createFixCartLineMongo)
  };
}

function createFixMeasuresMongo (): MeasuresMongo {
  return {
    shoulder: faker.number.int({ min: 38, max: 44 }),
    chest: faker.number.int({ min: 90, max: 110 }),
    waist: faker.number.int({ min: 70, max: 80 }),
    hips: faker.number.int({ min: 96, max: 106 }),
    foot: faker.number.int({ min: 38, max: 42 }),
    height: faker.number.int({ min: 156, max: 180 }),
    weight: faker.number.int({ min: 52, max: 68 }),
    unitsHeight: UnitsHeightEnum.CM,
    unitsWeight: UnitsWeightEnum.KG
  };
}

function createFixAddressMongo (): AddressMongo {
  return {
    id: faker.string.ulid(),
    alias: faker.lorem.words(),
    name: faker.person.firstName(),
    surname: faker.person.lastName(),
    address: faker.location.direction(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    phone: faker.phone.number(),
    obs: faker.lorem.paragraph()
  };
}

function createFixUserMongo (
  favList: ArticleMongo['_id'][],
  cartArtList: ArticleMongo['_id'][],
  shippingList: ShippingMongo['_id'][]
): UserMongo {
  return {
    _id: new ObjectId(),
    userName: faker.internet.username(),
    pass: faker.internet.password(),
    salt: faker.internet.password(),
    email: faker.internet.email(),
    bday: faker.date.birthdate(),
    sex: SexEnum.FEMALE,
    area: 'spanish',
    measures: createFixMeasuresMongo(),
    addressList: [
      createFixAddressMongo(),
      createFixAddressMongo()
    ],
    favList,
    cart: createFixCartMongo(cartArtList),
    shippingList
  };
}

export {
  createFixCartLineMongo,
  createFixCartMongo,
  createFixMeasuresMongo,
  createFixAddressMongo,
  createFixUserMongo
};
