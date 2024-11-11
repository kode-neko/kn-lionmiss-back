/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Shipping, ShippingLine } from '@model/index';
import { NotFoundDbException } from '../../error';
import { Connection, PoolConnection } from 'mariadb';
import { IModelDBShipping } from '../../interfaces';
import { getConnSql } from '../db/utils';
import ArticleSqlModelDB from './ArticleSqlModelDB';

class ShippingSqlModelDB implements IModelDBShipping {

  private conn: Connection | PoolConnection;

  private static instance: IModelDBShipping;

  public static getIntance (): IModelDBShipping {
    if (!ShippingSqlModelDB.instance) {
      ShippingSqlModelDB.instance = new ShippingSqlModelDB();
    }
    return ShippingSqlModelDB.instance;
  }

  private constructor () {
    this.conn = getConnSql();
  }

  public static parseSqlToShipping (shippingSql: any, articleListSql: any[]): Shipping {
    return {
      id: shippingSql._id?._id.toString(),
      idTracking: shippingSql.idTracking,
      idShipping: shippingSql.idShipping,
      state: shippingSql.state,
      payment: shippingSql.payment,
      lines: shippingSql.lines.map((l) => ShippingSqlModelDB.parseSqlToShippingLine(l, articleListSql.find((a) => a._id?.toString() === l.article?.toString()) as any))
    };
  }

  public static parseSqlToShippingLine (shippingLineSql: any, articleSql: any): ShippingLine {
    return {
      id: shippingLineSql.id,
      qty: shippingLineSql.qty,
      article: ArticleSqlModelDB.parseSqlToArticle(articleSql, [])
    };
  }

  read (id: string): NotFoundDbException | Promise<Shipping> {
    throw new Error('Method not implemented.');
  }

  readList (searchParams?: any): Promise<Shipping[]> {
    throw new Error('Method not implemented.');
  }

  create (obj: Shipping): Promise<Shipping> {
    throw new Error('Method not implemented.');
  }

  update (obj: Shipping): Promise<void> | NotFoundDbException {
    throw new Error('Method not implemented.');
  }

  delete (id: string): Promise<void> | NotFoundDbException {
    throw new Error('Method not implemented.');
  }

}

export default ShippingSqlModelDB;
