import { Article } from '@model/index';
import {
  describe, expect, test, beforeAll, afterAll
} from '@jest/globals';
import { NotFoundDbException } from '@data-access/index';
import {
  initConnMongoose,
  ArticleMongooseModelDB
} from '@data-access/mongoose/index';
import {
  Collection, Db, MongoClient,
  ObjectId
} from 'mongodb';
import {
  createArticleFixMongo,
  createArticleListFixMongo,
  createArticleNoIdFixMongo
} from '../fixtures/utilsFixMongo';
import { faker } from '@faker-js/faker';

const {
  DB,
  USER_ADMIN,
  PASS_USER_ADMIN,
  HOST_MONGO,
  PORT_MONGO
} = process.env;

describe('ArticleMongooseModelDB', () => {
  let client: MongoClient;
  let db: Db;
  let collArticle: Collection;
  let artExample: Article;
  const articleMongooseModel = ArticleMongooseModelDB.getIntance();

  beforeAll(async () => {
    // Mongoose
    const url = `mongodb://${USER_ADMIN}:${PASS_USER_ADMIN}@${HOST_MONGO}:${PORT_MONGO}/${DB}?authSource=${DB}`;
    client = new MongoClient(url);
    await client.connect();
    db = client.db('lionmiss');
    collArticle = await db.createCollection('article');

    // Mongooseose
    await initConnMongoose();
  });

  beforeEach(async () => {
    const articleList = createArticleListFixMongo();
    await collArticle.insertMany(articleList.map((a) => ArticleMongooseModelDB.parseArticleToMongoose(a)));
    artExample = articleList[0];
  });

  afterEach(async () => {
    await collArticle.deleteMany();
  });

  afterAll(async () => {
    await db.dropCollection('article');
    await client.close();
  });

  test('Read existing', async () => {
    const article = await articleMongooseModel.read(artExample.id as string);
    expect(article).toEqual(artExample);
  });

  test('Read not existing', async () => {
    expect(async () => await articleMongooseModel.read(faker.database.mongodbObjectId()))
      .rejects
      .toThrow(NotFoundDbException);
  });

  test('Read all', async () => {
    const list = await articleMongooseModel.readList({ limit: 10, skip: 0 });
    expect(list).toHaveLength(10);
  });

  test('Create', async () => {
    const newArt = createArticleNoIdFixMongo();
    const { id, ...newArtId } = await articleMongooseModel.create(newArt);
    expect({ id, ...newArt }).toEqual({ id, ...newArtId });
  });

  test('Update existing', async () => {
    const art = createArticleFixMongo();
    collArticle.insertOne(ArticleMongooseModelDB.parseArticleToMongoose(art));
    art.tags = [faker.lorem.word()];
    expect(async () => await articleMongooseModel.update(art))
      .not
      .toThrow(NotFoundDbException);
  });

  test('Update not existing', async () => {
    const art = createArticleFixMongo();
    expect(async () => await articleMongooseModel.update(art))
      .rejects
      .toThrow(NotFoundDbException);
  });

  test('Delete existing', async () => {
    const art = createArticleFixMongo();
    await collArticle.insertOne(ArticleMongooseModelDB.parseArticleToMongoose(art));
    expect(async () => await articleMongooseModel.delete(art.id))
      .not
      .toThrow(NotFoundDbException);
  });

  test('Delete not existing', async () => {
    expect(async () => await articleMongooseModel.delete(faker.database.mongodbObjectId()))
      .rejects
      .toThrow(NotFoundDbException);
  });
});
