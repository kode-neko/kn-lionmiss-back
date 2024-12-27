import { faker } from '@faker-js/faker';
import { loginValidMid } from '../../../src/api/express/middlewares/validationsMid';
import { ZodError } from 'zod';

describe('AreaMongooseModelDB', () => {
  let req, res, next;

  beforeAll(async () => {

  });

  beforeEach(async () => {
    req = { body: {} };
    next = jest.fn();
  });

  afterEach(async () => {

  });

  afterAll(async () => {

  });

  test('loginValidMid', async () => {
    req.body = {
      userName: faker.internet.username(),
      pass: faker.internet.password()
    };

    expect(async () => loginValidMid(req, res, next))
      .not
      .toThrow(ZodError);
  });

  test('loginValidMid wrong', async () => {
    req.body = { userName: faker.internet.username() };

    expect(async () => loginValidMid(req, res, next))
      .toThrow(ZodError);
  });
});
