import { ObjectId } from 'mongodb';
import { Comment } from '../../../../model';
import { CommentMongo } from '../interfaces';
import { parseMongoToPicture, parsePictureToMongo } from './pictureParsers';

function parseCommentToMongo (comment: Comment): CommentMongo {
  return {
    _id: new ObjectId(comment.id),
    title: comment.title,
    body: comment.body,
    rating: comment.rating,
    pictureList: comment.pictureList.map(parsePictureToMongo),

    idArticle: new ObjectId(comment.idArticle),
    idUser: comment.idUser
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
