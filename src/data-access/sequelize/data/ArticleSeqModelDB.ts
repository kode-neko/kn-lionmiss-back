/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Article, ArticleArea } from '@model/index';
import { NotFoundDbException } from '../../error';
import { IModelDBArticle } from '../../interfaces';

class ArticleSeqModelDB implements IModelDBArticle {

  private static instance: IModelDBArticle;

  public static getIntance (): IModelDBArticle {
    if (!ArticleSeqModelDB.instance) {
      ArticleSeqModelDB.instance = new ArticleSeqModelDB();
    }
    return ArticleSeqModelDB.instance;
  }

  private constructor () {

  }

  readInfoArea (idArticle: string, nameArea: string): Promise<ArticleArea | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  createInfoArea (idArticle: string, articleArea: ArticleArea): Promise<ArticleArea> {
    throw new Error('Method not implemented.');
  }

  updateInfoArea (articleArea: ArticleArea): Promise<void> {
    throw new Error('Method not implemented.');
  }

  deleteInfoArea (idArtArea: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  read (id: string): NotFoundDbException | Promise<Article> {
    throw new Error('Method not implemented.');
  }

  readList (searchParams?: any): Promise<Article[]> {
    throw new Error('Method not implemented.');
  }

  create (obj: Article): Promise<Article> {
    throw new Error('Method not implemented.');
  }

  update (obj: Article): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  delete (id: string): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

}

export default ArticleSeqModelDB;
