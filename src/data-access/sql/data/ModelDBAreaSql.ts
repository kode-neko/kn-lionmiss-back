import { IModelDBArea } from '../../interfaces';
import { NotFoundDbException } from '../../error';
import { PrismaClient } from '@prisma/client';
import { getPrismaClient } from '../db/utils';
import { Area, SearchParams } from '../../../model';

class AreaMongoModelDB implements IModelDBArea {

  private prisma: PrismaClient;

  private static instance: AreaMongoModelDB;

  public static getInstance (): AreaMongoModelDB {
    if (!AreaMongoModelDB.instance) {
      AreaMongoModelDB.instance = new AreaMongoModelDB();
    }
    return AreaMongoModelDB.instance;
  }

  private constructor () {
    this.prisma = getPrismaClient();
  }

  read (id: string): Promise<Area> {
    throw new Error('Method not implemented.');
  }

  readList (searchParams: SearchParams<Area>): Promise<Area[]> {
    throw new Error('Method not implemented.');
  }

  create (obj: Area): Promise<Area> {
    throw new Error('Method not implemented.');
  }

  update (obj: Area): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  delete (id: string): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  /*
  read (id: string): Promise<Area> {
    return this.prisma.area
      .findFirst({ where: { OR: [{ id: idToNum(id) }, { name: id }] } })
      .then((res) => {
        if (!res) throw new NotFoundDbException('Area');
        return { ...res, id: idToStr(res.id) };
      });
  }

  readList (searchParams: SearchParams<Area>): Promise<Area[]> {
    const {
      skip, limit: take, tags
    } = searchParams;
    return this.prisma.area
      .findMany({
        where: { name: { in: tags } },
        skip,
        take
      })
      .then((list) => {
        return list.map(({ id, ...rest }) => ({ id: idToStr(id), ...rest }));
      });
  }

  create (obj: Area): Promise<Area> {
    const { id, ...rest } = obj;
    return this.prisma.area
      .create({ data: { ...rest } })
      .then(({ id, ...rest }) => ({ id: idToStr(id), ...rest }));
  }

  update (obj: Area): Promise<void | NotFoundDbException> {
    const { id, ...rest } = obj;
    return this.prisma.area
      .update({
        where: { id: idToNum(id) },
        data: { ...rest }
      })
      .then(() => Promise.resolve())
      .catch(() => {
        throw new NotFoundDbException('Area');
      });
  }

  delete (id: string): Promise<void | NotFoundDbException> {
    return this.prisma.area
      .delete({ where: { id: idToNum(id) } })
      .then(() => Promise.resolve())
      .catch(() => {
        throw new NotFoundDbException('Area');
      });
  }
*/

}

export default AreaMongoModelDB;
