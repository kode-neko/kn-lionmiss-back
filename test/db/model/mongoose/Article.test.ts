import ArticleMongoModelDB from '../../../../src/db/model/mongoose/article/Article';
import { ArticleMongo, initConnMongo } from '../../../../src/db/mongoose';
import {
  describe, expect, test, beforeAll
} from '@jest/globals';

describe('sum module', () => {
  beforeAll(async () => {
    await initConnMongo();
  });

  test('adds 1 + 2 to equal 3', async () => {
    const m = ArticleMongoModelDB.getIntance();
    const article = await m.read('66db3e857f97b60ae12b4a1e');
    console.log(article);
    expect(true).toBeFalsy();
  });
});
