import { ArticleArea } from '@model/index';
import { ObjectId } from 'mongodb';
import IAreaMongo from './IAreaMongo';

interface IArticleAreaMongo extends Omit<ArticleArea, 'id'> {
  _id?: ObjectId;
  area: IAreaMongo;
}

export default IArticleAreaMongo;
