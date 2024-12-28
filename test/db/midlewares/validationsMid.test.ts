import { faker } from '@faker-js/faker';
import {
  attrValidMidCreate,
  bodyParamValidMidCreate, bodyValidMidCreate, idBodyValidMid, idParamValidMid, loginValidMid,
  searchParamsBodyValidMid
} from '../../../src/api/express/middlewares/validationsMid';

describe('Validation Middleware', () => {
  let req, res, next;

  beforeEach(async () => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    next = jest.fn();
  });

  afterEach(async () => {
    req = {};
    res = {};
  });

  test('loginValidMid', () => {
    req.body = {
      userName: faker.internet.username(),
      pass: faker.internet.password()
    };

    expect(() => loginValidMid(req, res, next))
      .not
      .toThrow(Error);
    expect(next.mock.calls.length).toBe(1);
  });

  test('loginValidMid wrong', () => {
    req.body = { userName: faker.internet.username() };

    expect(() => loginValidMid(req, res, next))
      .toThrow(Error);
    expect(next.mock.calls.length).toBe(0);
  });

  test('bodyValidMidCreate', () => {
    req.body = {
      name: 'spanish',
      country: 'Spain',
      locale: 'es-ES',
      currency: '€',
      dateFormat: 'dd/mm/yyyy',
      gen: true
    };

    expect(() => bodyValidMidCreate('area')(req, res, next))
      .not
      .toThrow(Error);
  });

  test('bodyValidMidCreate wrong', () => {
    req.body = {};

    expect(() => bodyValidMidCreate('area')(req, res, next))
      .toThrow(Error);
  });

  test('bodyParamValidMidCreate', () => {
    req.body = {
      area: {
        name: 'spanish',
        country: 'Spain',
        locale: 'es-ES',
        currency: '€',
        dateFormat: 'dd/mm/yyyy',
        gen: true
      }
    };

    expect(() => bodyParamValidMidCreate('area')(req, res, next))
      .not
      .toThrow(Error);
  });

  test('bodyParamValidMidCreate wrong', () => {
    req.body = {};

    expect(() => bodyParamValidMidCreate('area')(req, res, next))
      .toThrow(Error);
  });

  test('searchParamsBodyValidMid', () => {
    req.body = {
      limit: 1,
      skip: 1,
      tags: []
    };

    expect(() => searchParamsBodyValidMid(req, res, next))
      .not
      .toThrow(Error);
  });

  test('searchParamsBodyValidMid wrong', () => {
    req.body = {};

    expect(() => searchParamsBodyValidMid(req, res, next))
      .toThrow(Error);
  });

  test('idParamValidMid', () => {
    req.params = { id: faker.string.uuid() };

    expect(() => idParamValidMid()(req, res, next))
      .not
      .toThrow(Error);
  });

  test('idParamValidMid wrong', () => {
    req.params = {};

    expect(() => idParamValidMid()(req, res, next))
      .toThrow(Error);
  });

  test('idBodyValidMid', () => {
    req.body = { id: faker.string.uuid() };

    expect(() => idBodyValidMid()(req, res, next))
      .not
      .toThrow(Error);
  });

  test('idBodyValidMid wrong', () => {
    req.body = {};

    expect(() => idBodyValidMid()(req, res, next))
      .toThrow(Error);
  });

  test('attrValidMidCreate', () => {
    req.body = { patata: faker.string.uuid() };

    expect(() => attrValidMidCreate('patata', 'body')(req, res, next))
      .not
      .toThrow(Error);
  });

  test('attrValidMidCreate wrong', () => {
    req.body = {};

    expect(() => attrValidMidCreate('patata', 'body')(req, res, next))
      .toThrow(Error);
  });
});
