import { SearchParams } from '@model/index';
import ArticleMongoModelDB from '../../../../src/db/model/mongoose/article/Article';
import { initConnMongo } from '../../../../src/db/mongoose';
import {
  describe, expect, test, beforeAll
} from '@jest/globals';
import Article from '../../../../src/model/article/Article';

describe('sum module', () => {
  beforeAll(async () => {
    await initConnMongo();
  });

  test('adds 1 + 2 to equal 3', async () => {
    const m = ArticleMongoModelDB.getIntance();
    const article = await m.read('66db3e857f97b60ae12b4a1e');
    const list = await m.readList({ limit: 10, skip: 0 } as SearchParams);
    const ar: Article = {
      instructs: {
        whasing: '30º',
        ironing: '180º',
        spining: 'low',
        dryCleaning: 'no'
      },
      sizes: {
        s: 20, m: 4, l: 20
      },
      materials: { cotton: 30, rayon: 70 },
      tags: ['man'],
      discolor: false,
      articleAreaList: []
    };
    const created = await m.create(ar);
    const updated = await m.update({
      ...created,
      tags: ['man',
        'shirt']
    });
    const del = await m.delete('66fbb7cd3bc2657d805764ec');
    console.log(del);
    expect(true).toBeFalsy();
  });
});
