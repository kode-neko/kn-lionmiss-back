import {
  describe, expect, test
} from '@jest/globals';
import { createRequest, createResponse } from 'node-mocks-http';
import { validationBodyMidCreateFunc } from '../src/api/express/middlewares/validationsMid';
import { ZodError } from 'zod';

describe(
  'sum module',
  () => {
    test(
      'adds 1 + 2 to equal 3',
      () => {
        const request = createRequest({
          params: { id: 42 },
          body: { patata: 'patata' }
        });
        const response = createResponse();

        const testFunc = validationBodyMidCreateFunc('article');

        expect(() => {
          testFunc(
            request,
            response,
            () => {}
          );
        }).toThrow(ZodError);

        expect(3).toBe(5);
      }
    );
  }
);
