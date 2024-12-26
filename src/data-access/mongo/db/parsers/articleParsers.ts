import { ObjectId } from 'mongodb';
import Article from '../../../../model/article/Article';
import {
  AreaMongo,
  ArticleAreaMongo, ArticleMongo, ArticleVariantMongo,
  PictureMongo
} from '../interfaces';
import ArticleArea from '../../../../model/article/ArticleArea';
import ArticleVariant from '../../../../model/article/ArticleVariant';
import { parseMongoToArea } from './areaParsers';
import { parseMongoToPicture, parsePictureToMongo } from './pictureParsers';

function parseArticleVariantToMongo (articleVariant: ArticleVariant): ArticleVariantMongo {
  return {
    name: articleVariant.name,
    sizes: articleVariant.sizes
  };
}
function parseArticleAreaToMongo (articleArea: ArticleArea): ArticleAreaMongo {
  return {
    id: articleArea.id,
    title: articleArea.title,
    desc: articleArea.desc,
    variantList: articleArea.variantList,
    price: articleArea.price,
    tax: articleArea.tax,

    area: articleArea.area.name
  };
}
function parseArticleToMongo (article: Article): ArticleMongo {
  return {
    _id: new ObjectId(article.id),
    tags: article.tags,
    materials: article.materials,
    instructs: article.instructs,
    discolor: article.discolor,

    articleVariantList: article.articleVariantList.map(parseArticleVariantToMongo),
    pictureList: article.pictureList.map(parsePictureToMongo),
    articleAreaList: article.articleAreaList.map(parseArticleAreaToMongo)
  };
}

function parseMongoToArticleVariant (mongo: ArticleVariantMongo, index: number): ArticleVariant {
  return {
    id: index.toString(),
    name: mongo.name,
    sizes: mongo.sizes
  };
}
function parseMongoToArticleArea (mongo: ArticleAreaMongo, areaMongo: AreaMongo): ArticleArea {
  return {
    id: mongo.id,
    title: mongo.title,
    desc: mongo.desc,
    variantList: mongo.variantList,
    price: mongo.price,
    tax: mongo.tax,

    area: parseMongoToArea(areaMongo)
  };
}
function parseMongoToArticle (mongo: ArticleMongo, pictureListMongo: PictureMongo[], areaListMongo: AreaMongo[]): Article {
  return {
    id: mongo._id?.toString(),
    tags: mongo.tags,
    materials: mongo.materials,
    instructs: mongo.instructs,
    discolor: mongo.discolor,

    articleVariantList: mongo.articleVariantList.map(parseMongoToArticleVariant),
    pictureList: pictureListMongo.map(parseMongoToPicture),
    articleAreaList: areaListMongo.length === mongo.articleAreaList.length
      ? mongo.articleAreaList.map((aa) => parseMongoToArticleArea(aa, areaListMongo.find((a) => a.name === aa.area) as AreaMongo))
      : []
  };
}

export {
  parseArticleVariantToMongo,
  parseArticleAreaToMongo,
  parseArticleToMongo,
  parseMongoToArticleVariant,
  parseMongoToArticleArea,
  parseMongoToArticle
};
