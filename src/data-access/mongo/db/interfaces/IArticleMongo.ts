import { ObjectId } from 'mongodb';
import { Article } from '@model/article';

interface IArticleMongo extends Omit<Article, 'id' | 'articleAreaList'> {
  _id?: ObjectId;
}

export default IArticleMongo;
