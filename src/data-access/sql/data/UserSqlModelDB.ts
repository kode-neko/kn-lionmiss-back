/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  User, SexEnum, Address
} from '@model/index';
import { Connection, PoolConnection } from 'mariadb';
import { NotFoundDbException } from '../../error';
import { IModelDBUser } from '../../interfaces';
import { getConnSql } from '../db/utils';
import CartSqlModelDB from './CartSqlModelDB';

class UserSqlModelDB implements IModelDBUser {

  private conn: Connection | PoolConnection;

  private static instance: IModelDBUser;

  public static getIntance (): IModelDBUser {
    if (!UserSqlModelDB.instance) {
      UserSqlModelDB.instance = new UserSqlModelDB();
    }
    return UserSqlModelDB.instance;
  }

  private constructor () {
    this.conn = getConnSql();
  }

  public static parseSqlToUser (
    mongo: any,
    areaSql: any,
    cartSql?: any,
    cartArticleListSql?: any[]
  ): User {
    return {
      id: mongo._id?.toString(),
      userName: mongo.userName,
      email: mongo.email,
      cart: cartSql &&
        CartSqlModelDB.parseSqlToCart(
          cartSql,
          cartArticleListSql || []
        ),
      shippings: [],
      bday: mongo.bday,
      sex: SexEnum[mongo.sex],
      area: areaSql,
      measures: mongo.measures,
      favs: [],
      addresses: mongo.addresses.map((a) => UserSqlModelDB.parseSqlToAddress(a))
    };
  }

  public static parseSqlToAddress (mongo: any): Address {
    return {
      alias: mongo.alias,
      name: mongo.name,
      surname: mongo.surname,
      address: mongo.address,
      city: mongo.city,
      state: mongo.state,
      country: mongo.country,
      phone: mongo.phone,
      obs: mongo.obs
    };
  }

  read (id: string): NotFoundDbException | Promise<User> {
    throw new Error('Method not implemented.');
  }

}

export default UserSqlModelDB;
