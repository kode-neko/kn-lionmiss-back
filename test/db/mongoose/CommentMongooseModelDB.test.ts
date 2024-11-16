import { Comment } from '@model/index';
import {
  Collection, Db, MongoClient
} from 'mongodb';
import { createConnMongo, getConnMongo } from '../../../src/data-access/mongo/db';
import { ArticleMongooseModelDB, CommentMongooseModelDB } from '../../../src/data-access/mongoose/data';
import {
  createFixComment, createFixCommentNoId, createFixListArticle, createFixListComment
} from '../fixtures';
import { createConnMongoose } from '../../../src/data-access/mongoose/db/utils';
import { faker } from '@faker-js/faker';
import { NotFoundDbException } from '../../../src/data-access/error';

describe('CommentMongooseModelDB', () => {
  let client: MongoClient;
  let db: Db;
  let collComment: Collection;
  let collArticle: Collection;
  let commentExample: Comment;

  const commentMongooseModel = CommentMongooseModelDB.getIntance();

  beforeAll(async () => {
    // Mongo
    await createConnMongo();
    [client, db] = getConnMongo();
    db = client.db('lionmiss');
    collComment = await db.createCollection('comment');
    collArticle = await db.createCollection('article');

    // Mongoose
    await createConnMongoose();
  });

  beforeEach(async () => {
    const commentList = createFixListComment();
    const articleList = createFixListArticle()
      .map((a, i) => ({ ...a, id: commentList[i].article }));

    await collComment.insertMany(commentList
      .map((c) => CommentMongooseModelDB.parseCommentToMongoose(c)));
    await collArticle.insertMany(articleList
      .map((a) => ArticleMongooseModelDB.parseArticleToMongoose(a)));

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
