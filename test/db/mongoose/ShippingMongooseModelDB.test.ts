import { Shipping } from '@model/index';
import {
  Collection, Db, MongoClient
} from 'mongodb';
import { ShippingMongooseModelDB } from '../../../src/data-access/mongoose/data';
import { createConnMongo, getConnMongo } from '../../../src/data-access/mongo/db';
import { createConnMongoose } from '../../../src/data-access/mongoose/db/utils';
import { createFixShipping } from '../fixtures';
import { NotFoundDbException } from '../../../src/data-access/error';
import { faker } from '@faker-js/faker';

describe('ShippingMongooseModelDB', () => {
  let client: MongoClient;
  let db: Db;
  let collShipping: Collection;
  let shippingExample: Shipping;
  const shippingMongooseModel = ShippingMongooseModelDB.getIntance();

  beforeAll(async () => {
    // Mongo
    await createConnMongo();
    [client, db] = getConnMongo();
    db = client.db('lionmiss');
    collShipping = await db.createCollection('shipping');

    // Mongoose
    await createConnMongoose();
  });

  beforeEach(async () => {
    const shippingList = [createFixShipping(), createFixShipping()];
    const shippingListMongoose = shippingList.map((s) => ShippingMongooseModelDB.parseShippingToMongoose(s));
    shippingExample = { ...shippingList[0] };
    await collShipping.insertMany(shippingListMongoose);
  });

  afterEach(async () => {
    await collShipping.deleteMany();
  });

  afterAll(async () => {
    await db.dropCollection('shipping'); s;
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
