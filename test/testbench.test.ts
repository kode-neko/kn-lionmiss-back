import {
  describe, expect, test, beforeAll, afterAll
} from '@jest/globals';
import { getArea, IModelDBArea } from '../src/data-access';
import { createConnMongo } from '../src/data-access/mongo/db';

describe('---- TEST BENCH ----', () => {
  beforeAll(async () => {
    await createConnMongo();
  });
  test('Get conenctions data-access', async () => {
    const area: IModelDBArea = getArea();
    const list = await area.readList({ skip: 0, limit: 10 });
    expect(list).toHaveLength(2);
  });
});
