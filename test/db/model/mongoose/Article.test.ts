import { SearchParams, Article } from '@model/index';
// import ArticleMongoModelDB from '../../../../src/db/model/mongoose/article/Article';

import {
  describe, expect, test, beforeAll
} from '@jest/globals';

/* import Article from '../../../../src/model/article/Article';
   import AreaMongoModelDB from '../../../../src/db/model/mongoose/article/Area'; */
import CommentMongoModelDB from '../../../../src/data-access/mongoose/data/CommentMongoModelDB';
import Comment from '../../../../src/model/user/Comment';
import { initConnMongo } from '../../../../src/data-access/mongoose/db';

describe('sum module', () => {
  beforeAll(async () => {
    await initConnMongo();
  });

  /* test('test mongoose Article', async () => {
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
     }); */
  test('test mongoose Comment', async () => {
    const c = CommentMongoModelDB.getIntance();
    const comment = await c.read('66db43c97f97b60ae12b4a2d');
    const list = await c.readList({ limit: 10, skip: 0 } as SearchParams);
    console.log(comment);
    console.log(list);

    const co: Comment = {
      title: 'r',
      text: 'r',
      rating: 4,
      pics: []
    };
    const created = await c.create(co);
    console.log(created);

    const updated = await c.update({
      ...created,
      text: 'patata'
    });
    console.log(updated);

    const del = await c.delete('66fd97c333351ed18e5a3138');
    console.log(del);
    expect(true).toBeFalsy();
  });

/* test('test mongoose Area aggregations', async () => {
     const list = await AreaMongoModelDB.getIntance().readList();
     console.log(list);
     expect(true).toBeFalsy();
   }); */
});
