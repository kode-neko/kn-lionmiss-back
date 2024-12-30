import {
  Collection, Db, MongoClient
} from 'mongodb';
import { ModelDBAreaMongo } from '../../../src/data-access/mongo/data';
import { Area } from '../../../src/model';
import {
  createConnMongo, getConnMongo, NotFoundDbException
} from '../../../src/data-access';
import { createAreaMongoListFix } from '../../../src/fixtures';
import { parseMongoToArea } from '../../../src/data-access/mongo/db/parsers';
import { faker } from '@faker-js/faker';
import AreaMongoModelDB from '../../../src/data-access/mongo/data/ModelDBAreaMongo';

describe('AreaMongooseModelDB', () => {
  let client: MongoClient;
  let db: Db;
  let collArea: Collection;
  let areaExample: Area;
  let areaMongooseModel: AreaMongoModelDB;

  beforeAll(async () => {
    await createConnMongo();
    [client, db] = getConnMongo();
    db = client.db('lionmiss');
    collArea = await db.createCollection('area');
    areaMongooseModel = ModelDBAreaMongo.getInstance();
  });

  beforeEach(async () => {
    areaExample = parseMongoToArea(createAreaMongoListFix[0]);
    await collArea.insertMany(createAreaMongoListFix);
  });

  afterEach(async () => {
    await collArea.deleteMany();
  });

  afterAll(async () => {
    await db.dropCollection('area');
    await client.close();
  });

  test('Read existing', async () => {
    const area = await areaMongooseModel.read(areaExample.id as string);
    expect(area).toEqual(areaExample);
  });

  test('Read not existing', async () => {
    expect(async () => await areaMongooseModel.read(faker.database.mongodbObjectId()))
      .rejects
      .toThrow(NotFoundDbException);
  });

  test('Read all', async () => {
    const list = await areaMongooseModel.readList({
      limit: 10, skip: 0, tags: []
    });
    expect(list).toHaveLength(3);
  });

  test('Create', async () => {
    const newNameArea = faker.lorem.word();
    const idModified = faker.database.mongodbObjectId();
    const newArtArea = {
      ...areaExample, name: newNameArea, id: idModified
    };
    const newArtAreaId = await areaMongooseModel.create(newArtArea);
    expect(newArtAreaId).toEqual(newArtArea);
  });

  test('Update existing', async () => {
    const modifiedArea = { ...areaExample, name: faker.lorem.word() };
    expect(async () => await areaMongooseModel.update(modifiedArea))
      .not
      .toThrow(NotFoundDbException);
  });

  test('Update not existing', async () => {
    const area = { ...areaExample };
    expect(async () => await areaMongooseModel.update(area))
      .rejects
      .toThrow(NotFoundDbException);
  });

  test('Delete existing', async () => {
    const area = { ...areaExample };
    expect(async () => await areaMongooseModel.delete(area.id as string))
      .not
      .toThrow(NotFoundDbException);
  });

  test('Delete not existing', async () => {
    expect(async () => await areaMongooseModel.delete(faker.database.mongodbObjectId()))
      .rejects
      .toThrow(NotFoundDbException);
  });
});
