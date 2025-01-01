import { faker } from '@faker-js/faker';
import {
  deleteArea,
  getAreaById, postArea, postAreaList,
  putArea
} from '../../../src/api/express/controllers/areaCtrl';
import {
  Collection, Db, MongoClient, ObjectId
} from 'mongodb';
import { createConnMongo, getConnMongo } from '../../../src/data-access';
import { parseMongoToArea } from '../../../src/data-access/mongo/db/parsers';
import { createAreaMongoListFix } from '../../../src/fixtures';
import { Area } from '../../../src/model';

describe('Validation Middleware', () => {
  let client: MongoClient;
  let db: Db;
  let collArea: Collection;
  let areaExample: Area;
  let areaExamplList: Area[];
  // Mock funcs ctrl
  let req, res;

  beforeAll(async () => {
    // Init DB
    await createConnMongo();
    [client, db] = getConnMongo();
    db = client.db('lionmiss');
    collArea = await db.createCollection('area');
  });

  beforeEach(async () => {
    // Init DB
    areaExample = parseMongoToArea(createAreaMongoListFix[0]);
    areaExamplList = createAreaMongoListFix.map(parseMongoToArea);
    await collArea.insertMany(createAreaMongoListFix);
    // Func mocks
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
  });

  afterEach(async () => {
    // Reset Data
    await collArea.deleteMany();
    // Func mocks
    req = {};
    res = {};
  });

  afterAll(async () => {
    await db.dropCollection('area');
    await client.close();
  });

  test('getAreaById', async () => {
    req.params = { id: areaExample.id };
    await getAreaById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(areaExample);
  });

  test('getAreaById wrong', async () => {
    req.params = { id: faker.database.mongodbObjectId() };
    await getAreaById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('Resource not found');
  });

  test('postAreaList', async () => {
    req.body = {
      skip: 0, limit: 10, tags: []
    };
    await postAreaList(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(areaExamplList);
  });

  test('postAreaList wrong', async () => {
    req.body = {
      skip: 10, limit: 10, tags: []
    };
    await postAreaList(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith([]);
  });

  test('postArea', async () => {
    const { id, ...expec } = { ...areaExample, name: 'test' };
    req.body = { ...expec };
    await postArea(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({ ...expec, id: res.send.mock.calls[0][0].id });
  });

  test('putArea', async () => {
    const modifiedArea = { ...areaExample, name: 'test' };
    req.body = modifiedArea;
    await putArea(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).not.toHaveBeenCalled();
  });

  test('putArea wrong', async () => {
    const modifiedArea = {
      ...areaExample, name: 'test', id: faker.database.mongodbObjectId()
    };
    req.body = modifiedArea;
    await putArea(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('Resource not found');
  });

  test('deleteArea', async () => {
    req.params.id = areaExample.id;
    await deleteArea(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).not.toHaveBeenCalled();
  });

  test('deleteArea wrong', async () => {
    req.params.id = faker.database.mongodbObjectId();
    await deleteArea(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('Resource not found');
  });
});
