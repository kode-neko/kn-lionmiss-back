import { Comment, Article } from '@model/index';
import {
  describe, expect, test, beforeAll, afterAll
} from '@jest/globals';
import { NotFoundDbException } from '@data-access/index';
import {
  initConnMongoose,
  CommentMongooseModelDB
} from '@data-access/mongoose/index';
import {
  Collection, Db, MongoClient,
  ObjectId
} from 'mongodb';
import { faker } from '@faker-js/faker';
import {
  createFixComment, createFixCommentNoId,
  createFixListComment
} from '../fixtures';
import ArticleMongooseModelDB from '../../../src/data-access/mongoose/data/ArticleMongooseModelDB';

const {
  DB,
  USER_ADMIN,
  PASS_USER_ADMIN,
  HOST_MONGO,
  PORT_MONGO
} = process.env;

describe('CommentMongooseModelDB', () => {
  let client: MongoClient;
  let db: Db;
  let collComment: Collection;
  let collArticle: Collection;
  let commentExample: Comment;

  const commentMongooseModel = CommentMongooseModelDB.getIntance();

  beforeAll(async () => {
    // Mongoose
    const url = `mongodb://${USER_ADMIN}:${PASS_USER_ADMIN}@${HOST_MONGO}:${PORT_MONGO}/${DB}?authSource=${DB}`;
    client = new MongoClient(url);
    await client.connect();
    db = client.db('lionmiss');
    collComment = await db.createCollection('comment');
    collArticle = await db.createCollection('article');

    // Mongooseose
    await initConnMongoose();
  });

  beforeEach(async () => {
    const commentList = createFixListComment();
    await collComment.insertMany(commentList.map((a) => CommentMongooseModelDB.parseCommentToMongoose(a)));

    const articleList = commentList.map((c) => c.article);
    await collArticle.insertMany(articleList.map((a) => ArticleMongooseModelDB.parseArticleToMongoose(a)));

    commentExample = commentList[0];
  });

  afterEach(async () => {
    await collComment.deleteMany();
    await collArticle.deleteMany();
  });

  afterAll(async () => {
    await db.dropCollection('comment');
    await db.dropCollection('article');
    await client.close();
  });

  test('Read existing', async () => {
    const comment = await commentMongooseModel.read(commentExample.id as string);
    expect(comment).toEqual(commentExample);
  });

  test('Read not existing', async () => {
    expect(async () => await commentMongooseModel.read(faker.database.mongodbObjectId()))
      .rejects
      .toThrow(NotFoundDbException);
  });

  test('Read all', async () => {
    const list = await commentMongooseModel.readList({ limit: 10, skip: 0 });
    expect(list).toHaveLength(10);
  });

  test('Create', async () => {
    const newComment = createFixCommentNoId();
    const { id, ...newCommentId } = await commentMongooseModel.create(newComment);
    expect({ id, ...newComment }).toEqual({ id, ...newCommentId });
  });

  test('Update existing', async () => {
    const comm = createFixComment();
    expect(async () => {
      await collComment.insertOne(CommentMongooseModelDB.parseCommentToMongoose(comm));
      comm.title = faker.lorem.sentences();
      await commentMongooseModel.update(comm);
    })
      .not
      .toThrow(NotFoundDbException);
  });

  test('Update not existing', async () => {
    const comm = createFixComment();
    expect(async () => await commentMongooseModel.update(comm))
      .rejects
      .toThrow(NotFoundDbException);
  });

  test('Delete existing', async () => {
    expect(async () => await commentMongooseModel.delete(commentExample.id))
      .not
      .toThrow(NotFoundDbException);
  });

  test('Delete not existing', async () => {
    expect(async () => await commentMongooseModel.delete(faker.database.mongodbObjectId()))
      .rejects
      .toThrow(NotFoundDbException);
  });
});
