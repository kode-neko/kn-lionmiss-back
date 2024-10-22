import { Article, ArticleArea } from '@model/index';
import IModelDB from './IModelDB';
import { NotFoundDbException } from '../error';

interface IModelDBArticle extends IModelDB<Article> {
  readInfoArea(idArticle: string, nameArea: string): Promise<ArticleArea> | NotFoundDbException;
  createInfoArea(idArticle: string, articleArea: ArticleArea): Promise<ArticleArea>;
  updateInfoArea(articleArea: ArticleArea): Promise<void>;
  deleteInfoArea(idArtArea: string): Promise<void>;
}

export default IModelDBArticle;
