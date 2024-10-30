import { Article, ArticleArea } from '@model/index';
import {
  describe, expect, test, beforeAll, afterAll
} from '@jest/globals';
import { NotFoundDbException } from '@data-access/index';
import {
  initConnMongoose
} from '@data-access/mongoose/index';
import {
  Collection, Db, MongoClient
} from 'mongodb';
import { faker } from '@faker-js/faker';
import {
  createFixArticle, createFixArticleArea, createFixArticleAreaNoId, createFixArticleNoId, createFixListArticle,
  createFixListArticleArea
} from '../fixtures';
import { AreaMongooseModelDB, ArticleAreaMongooseModelDB, ArticleMongooseModelDB } from '../../../src/data-access/mongoose';
import { ArticleAreaModelMongoose } from '../../../src/data-access/mongoose/db';

const {
  DB,
  USER_ADMIN,
  PASS_USER_ADMIN,
  HOST_MONGO,
  PORT_MONGO
} = process.env;

describe('ArticleAreaMongooseModelDB', () => {
  let client: MongoClient;
  let db: Db;
  let collArticle: Collection;
  let collArtArea: Collection;
  let collArea: Collection;
  let artAreaExample: ArticleArea;
  let artExample: Article;
  const articleAreaMongooseModel = ArticleAreaMongooseModelDB.getIntance();

  beforeAll(async () => {
    // Mongoose
    const url = `mongodb://${USER_ADMIN}:${PASS_USER_ADMIN}@${HOST_MONGO}:${PORT_MONGO}/${DB}?authSource=${DB}`;
    client = new MongoClient(url);
    await client.connect();
    db = client.db('lionmiss');
    collArticle = await db.createCollection('article');
    collArtArea = await db.createCollection('articleArea');
    collArea = await db.createCollection('area');

    // Mongooseose
    await initConnMongoose();
  });

  beforeEach(async () => {
    const articleList = createFixListArticle();
    const artAreaList = createFixListArticleArea();
    artAreaExample = { ...artAreaList[0] };
    artExample = { ...articleList[0] };

    const articleListMongoose = articleList.map((a) => ArticleMongooseModelDB.parseArticleToMongoose(a));
    const articleAreaListMongoose = artAreaList.map((aa, i) =>
      ArticleAreaMongooseModelDB.parseArticleAreaToMongoose(aa)
    );
    const areaListMongoose = artAreaList.map(aa => AreaMongooseModelDB.parseAreaToMongoose(aa.area));

    await collArticle.insertMany(articleListMongoose);
    await collArtArea.insertMany(articleAreaListMongoose);
    await collArea.insertMany(areaListMongoose);
  });

  afterEach(async () => {
    await collArticle.deleteMany();
    await collArtArea.deleteMany();
    await collArea.deleteMany();
  });

  afterAll(async () => {
    await db.dropCollection('article');
    await db.dropCollection('articleArea');
    await db.dropCollection('area');
    await client.close();
  });

  test('Read existing', async () => {
    const artArea = await articleAreaMongooseModel.read(artAreaExample.id);
    expect(artArea).toEqual(artAreaExample);
  });

  test('Read not existing', async () => {
    expect(async () => await articleAreaMongooseModel.read(faker.database.mongodbObjectId()))
      .rejects
      .toThrow(NotFoundDbException);
  });

  test('Read all', async () => {
    const list = await articleAreaMongooseModel.readList({ limit: 10, skip: 0 });
    expect(list).toHaveLength(10);
  });

  test('Create', async () => {
    const newArtArea = createFixArticleAreaNoId();
    const { id, ...newArtAreaId } = await articleAreaMongooseModel.create(newArtArea);
    expect({ id, ...newArtArea }).toEqual({ id, ...newArtAreaId });
  });

  test('Update existing', async () => {
    const artArea = createFixArticleArea();
    await collArtArea.insertOne(ArticleAreaMongooseModelDB.parseArticleAreaToMongoose(artArea));
    artArea.desc = faker.lorem.text();
    expect(async () => await articleAreaMongooseModel.update(artArea))
      .not
      .toThrow(NotFoundDbException);
  });

  test('Update not existing', async () => {
    const artArea = createFixArticleArea();
    expect(async () => await articleAreaMongooseModel.update(artArea))
      .rejects
      .toThrow(NotFoundDbException);
  });

  test('Delete existing', async () => {
    const artArea = createFixArticleArea();
    await collArticle.insertOne(ArticleAreaMongooseModelDB.parseArticleAreaToMongoose(artArea));
    expect(async () => await articleAreaMongooseModel.delete(artArea.id))
      .not
      .toThrow(NotFoundDbException);
  });

  test('Delete not existing', async () => {
    expect(async () => await articleAreaMongooseModel.delete(faker.database.mongodbObjectId()))
      .rejects
      .toThrow(NotFoundDbException);
  });
});
