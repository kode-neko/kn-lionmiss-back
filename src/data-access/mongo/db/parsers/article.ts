import { ObjectId } from 'mongodb';
import Article from '../../../../model/article/Article';
import { parseMongoToPicture, parsePictureToMongo } from './picture';
import { parseMongoToArticleArea } from './articleArea';
import ArticleMongo from '../interfaces/ArticleMongo';

function parseArticleToMongo (article: Article): ArticleMongo {
  return {
    _id: new ObjectId(article.id),
    tags: article.tags,
    materials: article.materials,
    instructs: article.instructs,
    discolor: article.discolor,
    articleVariantList:
      article.articleVariantList.map((av) => ({
        name: av.name,
        sizes: av.sizes
      })),
    pictureList:
      article.pictureList.map(parsePictureToMongo),
    articleAreaList:
      article.articleAreaList.map((aa) => new ObjectId(aa.id))
  };
}

function parseMongoToArticle (mongo: ArticleMongo): Article {
  return {
    id: mongo._id.toString(),
    tags: mongo.tags,
    materials: mongo.materials,
    instructs: mongo.instructs,
    discolor: mongo.discolor,
    articleVariantList:
      mongo.articleVariantList
        .map((maa, i) => ({ ...maa, id: i.toString() })),
    pictureList:
      mongo.pictureList.map((mp) => parseMongoToPicture(mp)),
    articleAreaList:
      mongo.articleAreaList.map(parseMongoToArticleArea)
  };
}

export {
  parseArticleToMongo,
  parseMongoToArticle
};
