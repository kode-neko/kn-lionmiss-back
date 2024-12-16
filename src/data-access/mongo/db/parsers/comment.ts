import { ObjectId } from 'mongodb';
import { CommentMongo } from '../../interfaces';
import { Comment } from '../../../../../model';
import { parseMongoToPicture, parsePictureToMongo } from './picture';

function parseCommentToMongo (obj: Comment) {
  return {
    _id: new ObjectId(obj.id),
    title: obj.title,
    body: obj.body,
    rating: obj.rating,
    pictureList: obj.pictureList.map((p) => parsePictureToMongo(p)),
    idArticle: new ObjectId(obj.idArticle),
    idUser: new ObjectId(obj.idUser)
  };
}

function parseMongoToComment (mongo: CommentMongo) {
  return {
    id: mongo._id.toString(),
    title: mongo.title,
    body: mongo.body,
    rating: mongo.rating,
    pictureList: mongo.pictureList.map((p) => parseMongoToPicture(p)),
    idArticle: mongo.idArticle.toString(),
    idUser: mongo.idUser.toString()
  };
}

export {
  parseCommentToMongo,
  parseMongoToComment
};
