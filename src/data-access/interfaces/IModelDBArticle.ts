import {
  Article, Area, ArticleArea, SearchParams
} from '@model/index';
import IModelDB from './IModelDB';
import { NotFoundDbException } from '../error';

interface IModelDBArticle extends IModelDB<Article> {
  readByArea(id: string, area: Area): Promise<Article | NotFoundDbException>;
  readListByArea(searchParams: SearchParams<Article>, area: Area): Promise<Article[]>;

  createArticleArea(id: string, articleArea: ArticleArea): Promise<ArticleArea>;
  updateArticleArea(articleArea: ArticleArea): Promise<void | NotFoundDbException>;
  deleteArticleArea(id: string): Promise<void | NotFoundDbException>;
}

export default IModelDBArticle;
