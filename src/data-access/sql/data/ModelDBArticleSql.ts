import {
  Article, ArticleArea, SearchParams
} from '../../../model';
import { NotFoundDbException } from '../../error';
import { IModelDBArticle } from '../../interfaces';
import { getPrismaClient } from '../db/utils';
import { PrismaClient } from '@prisma/client';

class ArticleMongoModelDB implements IModelDBArticle {

  private prisma: PrismaClient;

  private static instance: ArticleMongoModelDB;

  public static getIntance (): ArticleMongoModelDB {
    if (!ArticleMongoModelDB.instance) {
      ArticleMongoModelDB.instance = new ArticleMongoModelDB();
    }
    return ArticleMongoModelDB.instance;
  }

  private constructor () {
    this.prisma = getPrismaClient();
  }

  readByArea (id: string, area: string): Promise<Article | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  readListByArea (searchParams: SearchParams<Article>, area: string): Promise<Article[]> {
    throw new Error('Method not implemented.');
  }

  createArticleArea (id: string, articleArea: ArticleArea): Promise<ArticleArea> {
    throw new Error('Method not implemented.');
  }

  updateArticleArea (id: string, articleArea: ArticleArea): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  deleteArticleArea (id: string, articleAreaId: string): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  read (id: string): Promise<Article> {
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
