import { NotFoundDbException } from '@data-access/index';
import { Area } from '@model/index';
import {
  Collection, Db, MongoClient
} from 'mongodb';
import { AreaMongooseModelDB } from '../../../src/data-access/mongoose/data';
import { createConnMongoose } from '../../../src/data-access/mongoose/db/utils';
import { createConnMongo, getConnMongo } from '../../../src/data-access/mongo/db';
import {
  createFixArea, createFixAreaNoId, createFixListArea
} from '../fixtures';
import { faker } from '@faker-js/faker';

describe('AreaMongooseModelDB', () => {
  let client: MongoClient;
  let db: Db;
  let collArea: Collection;
  let areaExample: Area;
  const areaMongooseModel = AreaMongooseModelDB.getIntance();

  beforeAll(async () => {
    // Mongo
    await createConnMongo();
    [client, db] = getConnMongo();
    db = client.db('lionmiss');
    collArea = await db.createCollection('area');

    // Mongoose
    await createConnMongoose();
  });

  beforeEach(async () => {
    const areaList = createFixListArea();
    areaExample = { ...areaList[0] };
    const areaListMongoose = areaList.map((a) => AreaMongooseModelDB.parseAreaToMongoose(a));
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
