/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CartLine } from '@model/cart';
import { NotFoundDbException } from '@data-access/index';
import { Cart } from '@model/index';
import { Connection, PoolConnection } from 'mariadb';
import { IModelDBCart } from '../../interfaces';
import { getConnSql } from '../db/utils';
import ArticleSqlModelDB from './ArticleSqlModelDB';

class CartSqlModelDB implements IModelDBCart {

  private conn: Connection | PoolConnection;

  private static instance: IModelDBCart;

  public static getIntance (): IModelDBCart {
    if (!CartSqlModelDB.instance) {
      CartSqlModelDB.instance = new CartSqlModelDB();
    }
    return CartSqlModelDB.instance;
  }

  private constructor () {
    this.conn = getConnSql();
  }

  public static parseSqlToCart (mongoCart: any, articleListSql: any[]): Cart {
    return {
      id: mongoCart._id?.toString(),
      lines: mongoCart.lines.map((l) => CartSqlModelDB.parseSqlToCartLine(
        l,
        articleListSql.find((a) => a._id?.toString() === l.article?.toString()) as any
      ))
    };
  }

  public static parseSqlToCartLine (mongo: any, articleSql: any): CartLine {
    return {
      id: mongo.id,
      qty: mongo.qty,
      article: ArticleSqlModelDB.parseSqlToArticle(articleSql, [])
    };
  }

  newCartUser (idUser: string): Promise<Cart> | NotFoundDbException {
    throw new Error('Method not implemented.');
  }

  createLine (idCart: string, cartLine: CartLine): Promise<Cart> | NotFoundDbException {
    throw new Error('Method not implemented.');
  }

  updateLine (idCart: string, cartLine: CartLine): Promise<void> | NotFoundDbException {
    throw new Error('Method not implemented.');
  }

  deleteLine (idCart: string, idCartLine: string): Promise<void> | NotFoundDbException {
    throw new Error('Method not implemented.');
  }

  read (id: string): NotFoundDbException | Promise<Cart> {
    throw new Error('Method not implemented.');
  }

}

export default CartSqlModelDB;
