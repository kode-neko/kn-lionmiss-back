import {
  Article,
  Area,
  ArticleArea,
  SearchParams
} from '@model/index';
import IModelDB from './IModelDB';
import { NotFoundDbException } from '../error';

interface IModelDBArticle extends IModelDB<Article> {
  readByArea(id: string, area: string): Promise<Article | NotFoundDbException>;
  readListByArea(searchParams: SearchParams<Article>, area: string): Promise<Article[]>;

  createArticleArea(id: string, articleArea: ArticleArea): Promise<Article>;
  updateArticleArea(articleArea: ArticleArea): Promise<void | NotFoundDbException>;
  deleteArticleArea(id: string, articleAreaId: string): Promise<void | NotFoundDbException>;
}

export default IModelDBArticle;
