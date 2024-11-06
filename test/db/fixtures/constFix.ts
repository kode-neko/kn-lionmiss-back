import { Area } from '@model/index';
import { faker } from '@faker-js/faker';

const constFixListArea: Area[] = [
  {
    id: faker.database.mongodbObjectId(),
    name: 'Spanish',
    locale: 'es',
    country: 'Spain',
    symbol: '€'
  },
  {
    id: faker.database.mongodbObjectId(),
    name: 'English-UK',
    locale: 'en-GB',
    country: 'United Kingdom',
    symbol: '£'
  },
  {
    id: faker.database.mongodbObjectId(),
    name: 'English-USA',
    locale: 'en-US',
    country: 'United States',
    symbol: '$'
  }
];

export { constFixListArea };
