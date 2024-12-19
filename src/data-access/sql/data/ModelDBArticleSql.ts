import {
  Area, Article, SearchParams, ArticleArea
} from '@model/index';
import { NotFoundDbException } from '../../error';
import { IModelDBArticle } from '../../interfaces';

class ArticleMongoModelDB implements IModelDBArticle {

  private static instance: IModelDBArticle;

  public static getIntance (): IModelDBArticle {
    if (!ArticleMongoModelDB.instance) {
      ArticleMongoModelDB.instance = new ArticleMongoModelDB();
    }
    return ArticleMongoModelDB.instance;
  }

  private constructor () {

  }

  readByArea (id: string, area: Area): Promise<Article | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  readListByArea (searchParams: SearchParams<Article>, area: Area): Promise<Article[]> {
    throw new Error('Method not implemented.');
  }

  createArticleArea (id: string, articleArea: ArticleArea): Promise<Article> {
    throw new Error('Method not implemented.');
  }

  updateArticleArea (articleArea: ArticleArea): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  deleteArticleArea (id: string, articleAreaId: string): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  read (id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  readList (searchParams: SearchParams<Article>): Promise<Article[]> {
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

export default ArticleMongoModelDB;
