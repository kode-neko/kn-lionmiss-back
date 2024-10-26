import { Cart, User } from '@model/index';
import {
  describe, expect, test, beforeAll, afterAll
} from '@jest/globals';
import {
  initConnMongoose,
  ArticleMongooseModelDB
} from '@data-access/mongoose/index';
import {
  Collection, Db, MongoClient
} from 'mongodb';
import { faker } from '@faker-js/faker';
import {
  createFixCart,
  createFixUser
} from '../fixtures';
import CartMongooseModelDB from '../../../src/data-access/mongoose/data/CartMongooseModelDB';
import UserMongooseModelDB from '../../../src/data-access/mongoose/data/UserMongooseModelDB';

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
  let collCart: Collection;
  let collArticle: Collection;
  let collUser: Collection;
  let cartExample: Cart;
  let userExample: User;
  const cartMongooseModel = CartMongooseModelDB.getIntance();

  beforeAll(async () => {
    // Mongoose
    const url = `mongodb://${USER_ADMIN}:${PASS_USER_ADMIN}@${HOST_MONGO}:${PORT_MONGO}/${DB}?authSource=${DB}`;
    client = new MongoClient(url);
    await client.connect();
    db = client.db('lionmiss');
    collCart = await db.createCollection('cart');
    collArticle = await db.createCollection('article');
    collUser = await db.createCollection('user');

    // Mongooseose
    await initConnMongoose();
  });

  beforeEach(async () => {
    const cartList = [createFixCart(), createFixCart()];
    const articleList = cartList.flatMap(c => c.lines.map(l => l.article));
    const user = createFixUser();
    user.cart = { ...cartList[0] };
    cartExample = { ...cartList[0] };
    userExample = { ...user };

    await collArticle.insertMany(articleList.map((a) => ArticleMongooseModelDB.parseArticleToMongoose(a)));
    await collCart.insertMany(cartList.map((c) => CartMongooseModelDB.parseCartToMongoose(c)));
    await collUser.insertOne(UserMongooseModelDB.parseUserToMongoose(user));
  });

  afterEach(async () => {
    await collArticle.deleteMany();
    await collCart.deleteMany();
    await collUser.deleteMany();
  });

  afterAll(async () => {
    await db.dropCollection('cart');
    await db.dropCollection('article');
    await db.dropCollection('user');
    await client.close();
  });

  test('Read existing', async () => {
    const cart = await cartMongooseModel.read(cartExample.id);
    expect(cart).toEqual(cartExample);
  });

  test('Create Cart for user with not previuos cart', async () => {
    const newCart = await cartMongooseModel.newCartUser(userExample.id);
    expect(newCart).not.toEqual(userExample.cart);
  });

  test('Create Cart for user with previous cart', async () => {
    const userNotCart = { ...userExample, cart: undefined };
    const newCart = await cartMongooseModel.newCartUser(userExample.userName);
    expect(newCart).not.toEqual(userNotCart.cart);
  });


});
