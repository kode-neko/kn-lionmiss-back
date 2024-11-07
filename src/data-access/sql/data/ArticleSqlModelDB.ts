/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NotFoundDbException } from '@data-access/index';
import {
  Article, SearchParams, ArticleArea
} from '@model/index';
import { IModelDBArticle } from '../../interfaces';
import { getConn } from '../db/utils';
import { Connection, PoolConnection } from 'mariadb';

class ArticleSqlModelDB implements IModelDBArticle {

  private conn: Connection | PoolConnection;

  private static instance: IModelDBArticle;

  public static getIntance (): IModelDBArticle {
    if (!ArticleSqlModelDB.instance) {
      ArticleSqlModelDB.instance = new ArticleSqlModelDB();
    }
    return ArticleSqlModelDB.instance;
  }

  private constructor () {
    this.conn = getConn();
  }

  public static parseSqlToArticle (article: any, artAreaList: any[]): Article {
    return {
      id: article.id,
      instructs: article.instructs,
      sizes: article.sizes,
      materials: article.materials,
      tags: article.tags,
      variants: article.variants,
      discolor: article.discolor,
      articleAreaList: artAreaList
    };
  }

  readInfoArea (idArticle: string, nameArea: string): Promise<ArticleArea> | NotFoundDbException {
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

  update (obj: Article): Promise<void> | NotFoundDbException {
    throw new Error('Method not implemented.');
  }

  delete (id: string): Promise<void> | NotFoundDbException {
    throw new Error('Method not implemented.');
  }

}

export default ArticleSqlModelDB;
