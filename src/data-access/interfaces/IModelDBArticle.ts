import IModelDB from './IModelDB';
import { NotFoundDbException } from '../error';
import {
  Article, ArticleArea, SearchParams
} from '../../model';

interface IModelDBArticle extends IModelDB<Article> {
  readByArea(id: string, area: string): Promise<Article | NotFoundDbException>;
  readListByArea(searchParams: SearchParams<Article>, area: string): Promise<Article[]>;

  createArticleArea(id: string, articleArea: ArticleArea): Promise<ArticleArea>;
  updateArticleArea(id: string, articleArea: ArticleArea): Promise<void | NotFoundDbException>;
  deleteArticleArea(id: string, articleAreaId: string): Promise<void | NotFoundDbException>;
}

export default IModelDBArticle;
