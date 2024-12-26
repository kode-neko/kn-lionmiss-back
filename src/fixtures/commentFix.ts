import { faker } from '@faker-js/faker';
import { ObjectId } from 'mongodb';
import { createFixPictureMongo } from './pictureFix';
import { CommentMongo } from '../data-access';

function createFixCommentMongo (idArticle: ObjectId, idUser: string): CommentMongo {
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
