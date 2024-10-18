/* eslint-disable @typescript-eslint/no-unused-vars */
import { faker } from '@faker-js/faker';
import {
  CartLine, Article, Cart, Shipping, PaymentEnum
} from '@model/index';
import { createFixArticle } from './articleFix';

// Cart

function createFixCartLine (order: string, article?: Article): CartLine {
  return {
    id: order,
    qty: faker.helpers.rangeToNumber({ min: 1, max: 3 }),
    article: article || createFixArticle()
  };
}

function createFixCart (cartLinesNum = 4): Cart {
  return {
    id: faker.database.mongodbObjectId(),
    lines: Array(cartLinesNum).fill({})
      .map((_, i) => createFixCartLine(i.toString()))
  };
}

function createFixCartNoId (): Cart {
  const { id, ...rest } = createFixCart();
  return rest;
}

// Shipping

function createFixShipping (): Shipping {
  return {
    id: faker.database.mongodbObjectId(),
    idTracking: faker.lorem.words(),
    idShipping: faker.lorem.words(),
    state: {},
    payment: PaymentEnum.CARD
  };
}

function createFixShippingNoId (): Shipping {
  const { id, ...rest } = createFixShipping();
  return rest;
}

export {
  createFixCartLine,
  createFixCart,
  createFixCartNoId,

  createFixShipping,
  createFixShippingNoId
};
