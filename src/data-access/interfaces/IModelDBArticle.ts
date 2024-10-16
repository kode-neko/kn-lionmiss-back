import { Article, ArticleArea } from '@model/index';
import IModelDB from './IModelDB';
import { NotFoundDbException } from '../error';

interface IModelDBArticle extends IModelDB<Article> {
  readInfoArea(idArticle: string, nameArea: string): Promise<ArticleArea> | NotFoundDbException;
  createInfoArea(idArticle: string, articleArea: Exclude<ArticleArea, 'id'>): Promise<ArticleArea>;
}

export default IModelDBArticle;
