import { Article, ArticleArea, Shipping } from '@model/index';
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
  createFixListArticleArea,
  createFixShipping
} from '../fixtures';
import { AreaMongooseModelDB, ShippingMongooseModelDB, ArticleMongooseModelDB } from '../../../src/data-access/mongoose';
import { ArticleAreaModelMongoose } from '../../../src/data-access/mongoose/db';

const {
  DB,
  USER_ADMIN,
  PASS_USER_ADMIN,
  HOST_MONGO,
  PORT_MONGO
} = process.env;

describe('ShippingMongooseModelDB', () => {
  let client: MongoClient;
  let db: Db;
  let collShipping: Collection;
  let collArticle: Collection;
  let collArea: Collection;
  let shippingExample: Shipping;
  const shippingMongooseModel = ShippingMongooseModelDB.getIntance();

  beforeAll(async () => {
    // Mongoose
    const url = `mongodb://${USER_ADMIN}:${PASS_USER_ADMIN}@${HOST_MONGO}:${PORT_MONGO}/${DB}?authSource=${DB}`;
    client = new MongoClient(url);
    await client.connect();
    db = client.db('lionmiss');
    collShipping = await db.createCollection('shipping');
    collArticle = await db.createCollection('article');
    collArea = await db.createCollection('area');

    // Mongooseose
    await initConnMongoose();
  });

  beforeEach(async () => {
    const shippingList = [createFixShipping(), createFixShipping()];
    const shippingListMongoose = shippingList.map(s =>
      ShippingMongooseModelDB.parseShippingToMongoose(s)
    );
    shippingExample = { ...shippingList[0] };
    await collShipping.insertMany(shippingListMongoose);
  });

  afterEach(async () => {
    await collShipping.deleteMany();
  });

  afterAll(async () => {
    await db.dropCollection('shipping');
    await db.dropCollection('article');
    await db.dropCollection('area');
    await client.close();
  });

  test('Read existing', async () => {
    const shipping = await shippingMongooseModel.read(shippingExample.id);
    expect(shipping).toEqual(shippingExample);
  });

  test('Read not existing', async () => {
    expect(async () => await shippingMongooseModel.read(faker.database.mongodbObjectId()))
      .rejects
      .toThrow(NotFoundDbException);
  });

  test('Read all', async () => {
    const list = await shippingMongooseModel.readList({ limit: 10, skip: 0 });
    expect(list).toHaveLength(2);
  });

  test('Create', async () => {
    const newShipping = createFixShipping();
    const { id, ...newShippingId } = await shippingMongooseModel.create(newShipping);
    expect({ id, ...newShipping }).toEqual({ id, ...newShippingId });
  });

  test('Update existing', async () => {
    const shipping = createFixShipping();
    await collShipping.insertOne(ShippingMongooseModelDB.parseShippingToMongoose(shipping));
    shipping.idTracking = faker.lorem.word();
    expect(async () => await shippingMongooseModel.update(shipping))
      .not
      .toThrow(NotFoundDbException);
  });

  test('Update not existing', async () => {
    const shipping = createFixShipping();
    expect(async () => await shippingMongooseModel.update(shipping))
      .rejects
      .toThrow(NotFoundDbException);
  });

  test('Delete existing', async () => {
    const shipping = createFixShipping();
    await collShipping.insertOne(ShippingMongooseModelDB.parseShippingToMongoose(shipping));
    expect(async () => await shippingMongooseModel.delete(shipping.id))
      .not
      .toThrow(NotFoundDbException);
  });

  test('Delete not existing', async () => {
    expect(async () => await shippingMongooseModel.delete(faker.database.mongodbObjectId()))
      .rejects
      .toThrow(NotFoundDbException);
  });
});
