import { faker } from '@faker-js/faker';
import { ObjectId } from 'mongodb';
import { CommentMongo } from '../../../src/data-access';
import { createFixPictureMongo } from './pictureFix';

function createFixCommentMongo (idArticle: ObjectId, idUser: ObjectId): CommentMongo {
  return {
    _id: new ObjectId(),
    title: faker.lorem.word(),
    body: faker.lorem.paragraph(),
    rating: faker.number.int(5),
    pictureList: [
      createFixPictureMongo(),
      createFixPictureMongo(),
      createFixPictureMongo()
    ],

    idArticle,
    idUser
  };
}

export { createFixCommentMongo };
