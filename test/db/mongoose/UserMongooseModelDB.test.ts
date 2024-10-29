import { Article, ArticleArea, User } from '@model/index';
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
  createFixArticle, createFixArticleArea, createFixArticleAreaNoId, createFixArticleNoId, createFixCart, createFixListArticle,
  createFixListArticleArea,
  createFixUser
} from '../fixtures';
import { AreaMongooseModelDB, UserMongooseModelDB, ArticleMongooseModelDB } from '../../../src/data-access/mongoose';
import { ArticleAreaModelMongoose } from '../../../src/data-access/mongoose/db';
import CartMongooseModelDB from '../../../src/data-access/mongoose/data/CartMongooseModelDB';

const {
  DB,
  USER_ADMIN,
  PASS_USER_ADMIN,
  HOST_MONGO,
  PORT_MONGO
} = process.env;

describe('UserMongooseModelDB', () => {
  let client: MongoClient;
  let db: Db;
  let collArea: Collection;
  let collArticle: Collection;
  let collCart: Collection;
  let collUser: Collection;
  let userExample: User;
  const userMongooseModel = UserMongooseModelDB.getIntance();

  beforeAll(async () => {
    // Mongoose
    const url = `mongodb://${USER_ADMIN}:${PASS_USER_ADMIN}@${HOST_MONGO}:${PORT_MONGO}/${DB}?authSource=${DB}`;
    client = new MongoClient(url);
    await client.connect();
    db = client.db('lionmiss');
    
    collArea = await db.createCollection('area');
    collArticle = await db.createCollection('article');
    collCart = await db.createCollection('cart');
    collUser = await db.createCollection('user');

    // Mongooseose
    await initConnMongoose();
  });

  beforeEach(async () => {

    const user = createFixUser();
    const area = user.area;
    const cart = user.cart;
    const articles = cart.lines.map(l => l.article);
    
    const userMongoose = UserMongooseModelDB.parseUserToMongoose(user);
    const areaMongoose = AreaMongooseModelDB.parseAreaToMongoose(area);
    const cartMongoose = CartMongooseModelDB.parseCartToMongoose(cart);
    const articleMongoose = articles.map(a => ArticleMongooseModelDB.parseArticleToMongoose(a));

    await collUser.insertOne(userMongoose);
    await collArea.insertOne(areaMongoose);
    await collCart.insertOne(cartMongoose);
    await collArticle.insertMany(articleMongoose);

    userExample = user;
  });

  afterEach(async () => {
    await collArea.deleteMany();
    await collArticle.deleteMany();
    await collCart.deleteMany();
    await collUser.deleteMany();
  });

  afterAll(async () => {
    await db.dropCollection('area');
    await db.dropCollection('article');
    await db.dropCollection('cart');
    await db.dropCollection('user');
    await client.close();
  });

  test('Read existing user using id', async () => {
    const user = await userMongooseModel.read(userExample.id);
    expect(user).toEqual(userExample);
  });

  test('Read existing user using name', async () => {
    const user = await userMongooseModel.read(userExample.userName);
    expect(user).toEqual(userExample);
  });

  test('Read not existing user', async () => {
    expect(async () => await userMongooseModel.read(faker.database.mongodbObjectId()))
      .toThrow(NotFoundDbException);
  });

});
