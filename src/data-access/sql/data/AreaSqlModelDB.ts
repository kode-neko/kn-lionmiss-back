/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Area, SearchParams } from '@model/index';
import { NotFoundDbException } from '@data-access/index';
import { IModelDBArea } from '../../interfaces';
import { Connection, PoolConnection } from 'mariadb';
import { getConnSql } from '../db/utils';
import { parseObjToStrCrit, prepareInsertStatement } from './utils';

class AreaSqlModelDB implements IModelDBArea {

  private conn: Connection | PoolConnection;

  private static instance: AreaSqlModelDB;

  public static getIntance (): AreaSqlModelDB {
    if (!AreaSqlModelDB.instance) {
      AreaSqlModelDB.instance = new AreaSqlModelDB();
    }
    return AreaSqlModelDB.instance;
  }

  private constructor () {
    this.conn = getConnSql();
  }

  public static parseSqlToArea (sql: any): Area {
    return {
      id: sql.id,
      name: sql.name,
      locale: sql.locale,
      country: sql.country,
      symbol: sql.symbol
    };
  }

  read (id: string): Promise<Area | NotFoundDbException> {
    return this.conn.query('SELECT * FROM area WHERE id = ?', [id])
      .then(([row]) => {
        if (row === 0) throw new NotFoundDbException('Area');
        return AreaSqlModelDB.parseSqlToArea(row);
      });
  }

  readByProps (obj: Omit<Area, 'id'>): Promise<Area | NotFoundDbException> {
    const criterials = parseObjToStrCrit(obj);
    return this.conn.query('SELECT * FROM area WHERE ?', [criterials])
      .then(([row]) => {
        if (row === 0) throw new NotFoundDbException('Area');
        return AreaSqlModelDB.parseSqlToArea(row);
      });
  }

  readList ({ limit, skip }: SearchParams<Area>): Promise<Area[]> {
    return this.conn.query('SELECT * FROM area LIMIT ? OFFSET ?', [limit,
      skip])
      .then((list) => {
        return list.map((a) => AreaSqlModelDB.parseSqlToArea(a));
      });
  }

  create (obj: Area): Promise<Area> {
    const { id, ...rest } = obj;
    const [fields,
      values] = prepareInsertStatement(rest);
    return this.conn.query('INSERT INTO area (?) VALUES * (?)', [fields,
      values])
      .then((list) => {
        return list.map((a) => AreaSqlModelDB.parseSqlToArea(a));
      });
  }

  update (obj: Area): Promise<void | NotFoundDbException> {
    const { id, ...rest } = obj;
    const idCrit = parseObjToStrCrit(id);
    const objModi = prepareInsertStatement(rest);
    return this.conn.query('UPDATE area SET ? WHERE ?', [objModi,
      idCrit])
      .then((list) => {
        return list.map((a) => AreaSqlModelDB.parseSqlToArea(a));
      });
  }

  delete (id: string): Promise<void | NotFoundDbException> {
    const idCrit = parseObjToStrCrit(id);
    return this.conn.query('DELETE FROM area WHERE ?', [idCrit])
      .then((list) => {
        return list.map((a) => AreaSqlModelDB.parseSqlToArea(a));
      });
  }

}

export default AreaSqlModelDB;
