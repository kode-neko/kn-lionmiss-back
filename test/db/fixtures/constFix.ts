import { Area } from '@model/index';
import { faker } from '@faker-js/faker';

const constFixListArea: Area[] = [
  {
    id: faker.database.mongodbObjectId(),
    name: 'UK',
    country: 'UK',
    symbol: '£'
  },
  {
    id: faker.database.mongodbObjectId(),
    name: 'Sapin',
    country: 'Spain',
    symbol: '€'
  },
  {
    id: faker.database.mongodbObjectId(),
    name: 'USA',
    country: 'USA',
    symbol: '$'
  }
];

export { constFixListArea };
