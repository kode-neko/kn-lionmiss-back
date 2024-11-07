/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NotFoundDbException } from '@data-access/index';
import { ArticleArea } from '@model/index';
import { Connection, PoolConnection } from 'mariadb';
import { IModelDBArticleArea } from '../../interfaces';
import { getConn } from '../db/utils';
import AreaSqlModelDB from './AreaSqlModelDB';

class ArticleAreaSqlModelDB implements IModelDBArticleArea {

  private conn: Connection | PoolConnection;

  private static instance: ArticleAreaSqlModelDB;

  public static getIntance (): ArticleAreaSqlModelDB {
    if (!ArticleAreaSqlModelDB.instance) {
      ArticleAreaSqlModelDB.instance = new ArticleAreaSqlModelDB();
    }
    return ArticleAreaSqlModelDB.instance;
  }

  private constructor () {
    this.conn = getConn();
  }

  public static parseSqlToArticleArea (articleAreaSql: any, areaSql: any): ArticleArea {
    return {
      id: articleAreaSql._id?.toString(),
      title: articleAreaSql.title,
      desc: articleAreaSql.desc,
      price: articleAreaSql.price,
      tax: articleAreaSql.tax,
      area: AreaSqlModelDB.parseSqlToArea(areaSql)
    };
  }

  read (id: string): NotFoundDbException | Promise<ArticleArea> {
    throw new Error('Method not implemented.');
  }

  readList (searchParams?: any): Promise<ArticleArea[]> {
    throw new Error('Method not implemented.');
  }

  create (obj: ArticleArea): Promise<ArticleArea> {
    throw new Error('Method not implemented.');
  }

  update (obj: ArticleArea): Promise<void> | NotFoundDbException {
    throw new Error('Method not implemented.');
  }

  delete (id: string): Promise<void> | NotFoundDbException {
    throw new Error('Method not implemented.');
  }

}

export default ArticleAreaSqlModelDB;
