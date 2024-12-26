import { ObjectId } from 'mongodb';
import { Comment } from '../../../../model';
import { CommentMongo } from '../interfaces';
import { parseMongoToPicture, parsePictureToMongo } from './pictureParsers';

function parseCommentToMongo (picture: Comment): CommentMongo {
  return {
    _id: new ObjectId(picture.id),
    title: picture.title,
    body: picture.body,
    rating: picture.rating,
    pictureList: picture.pictureList.map(parsePictureToMongo),

    idArticle: new ObjectId(picture.idArticle),
    idUser: new ObjectId(picture.idUser)
  };
}

function parseMongoToComment (mongo: CommentMongo): Comment {
  return {
    id: mongo._id?.toString(),
    title: mongo.title,
    body: mongo.body,
    rating: mongo.rating,
    pictureList: mongo.pictureList.map(parseMongoToPicture),

    idArticle: mongo.idArticle?.toString() as string,
    idUser: mongo.idUser?.toString() as string
  };
}

export {
  parseCommentToMongo,
  parseMongoToComment
};
