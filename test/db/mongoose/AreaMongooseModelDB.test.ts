import { Article, Area } from '@model/index';
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

import { AreaMongooseModelDB, ArticleMongooseModelDB } from '../../../src/data-access/mongoose';
import { AreaModelMongoose } from '../../../src/data-access/mongoose/db';
import { createFixArea, createFixAreaNoId, createFixListArea } from '../fixtures';

const {
  DB,
  USER_ADMIN,
  PASS_USER_ADMIN,
  HOST_MONGO,
  PORT_MONGO
} = process.env;

describe('AreaMongooseModelDB', () => {
  let client: MongoClient;
  let db: Db;
  let collArea: Collection;
  let areaExample: Area;
  const areaMongooseModel = AreaMongooseModelDB.getIntance();

  beforeAll(async () => {
    // Mongoose
    const url = `mongodb://${USER_ADMIN}:${PASS_USER_ADMIN}@${HOST_MONGO}:${PORT_MONGO}/${DB}?authSource=${DB}`;
    client = new MongoClient(url);
    await client.connect();
    db = client.db('lionmiss');
    collArea = await db.createCollection('area');

    // Mongooseose
    await initConnMongoose();
  });

  beforeEach(async () => {
    const areaList = createFixListArea();
    areaExample = { ...areaList[0] };
    const areaListMongoose = areaList.map(a => AreaMongooseModelDB.parseAreaToMongoose(a));
    await collArea.insertMany(areaListMongoose);
  });

  afterEach(async () => {
    await collArea.deleteMany();
  });

  afterAll(async () => {
    await db.dropCollection('area');
    await client.close();
  });

  test('Read existing', async () => {
    const area = await areaMongooseModel.read(areaExample.id);
    expect(area).toEqual(areaExample);
  });

  test('Read not existing', async () => {
    expect(async () => await areaMongooseModel.read(faker.database.mongodbObjectId()))
      .rejects
      .toThrow(NotFoundDbException);
  });

  test('Read all', async () => {
    const list = await areaMongooseModel.readList({ limit: 10, skip: 0 });
    expect(list).toHaveLength(10);
  });

  test('Create', async () => {
    const newArtArea = createFixAreaNoId();
    const { id, ...newArtAreaId } = await areaMongooseModel.create(newArtArea);
    expect({ id, ...newArtArea }).toEqual({ id, ...newArtAreaId });
  });

  test('Update existing', async () => {
    const area = createFixArea();
    await collArea.insertOne(AreaMongooseModelDB.parseAreaToMongoose(area));
    area.name = faker.lorem.text();
    expect(async () => await areaMongooseModel.update(area))
      .not
      .toThrow(NotFoundDbException);
  });

  test('Update not existing', async () => {
    const area = createFixArea();
    expect(async () => await areaMongooseModel.update(area))
      .rejects
      .toThrow(NotFoundDbException);
  });

  test('Delete existing', async () => {
    const area = createFixArea();
    await collArea.insertOne(AreaMongooseModelDB.parseAreaToMongoose(area));
    expect(async () => await areaMongooseModel.delete(area.id))
      .not
      .toThrow(NotFoundDbException);
  });

  test('Delete not existing', async () => {
    expect(async () => await areaMongooseModel.delete(faker.database.mongodbObjectId()))
      .rejects
      .toThrow(NotFoundDbException);
  });
});
