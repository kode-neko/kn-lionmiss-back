import { NotFoundDbException } from '../../error';
import { IModelDBComment } from '../../interfaces';
import { PrismaClient } from '@prisma/client';
import { getPrismaClient } from '../db/utils';
import { Comment, SearchParams } from '../../../model';

class CommentMongoModelDB implements IModelDBComment {

  private prisma: PrismaClient;

  private static instance: IModelDBComment;

  public static getIntance (): IModelDBComment {
    if (!CommentMongoModelDB.instance) {
      CommentMongoModelDB.instance = new CommentMongoModelDB();
    }
    return CommentMongoModelDB.instance;
  }

  private constructor () {
    this.prisma = getPrismaClient();
  }

  read (id: string): Promise<Comment | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  readList (searchParams?: SearchParams<Comment>): Promise<Comment[]> {
    throw new Error('Method not implemented.');
  }

  create (obj: Comment): Promise<Comment> {
    throw new Error('Method not implemented.');
  }

  update (obj: Comment): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  delete (id: string): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  /*
  read (id: string): Promise<Comment> {
    return this.prisma.comment
      .findFirst({
        where: { id: idToNum(id) },
        include: { pictureList: true }
      })
      .then((res) => {
        if (!res) throw new NotFoundDbException('Comment');
        return res;
      });
  }

  readList (searchParams: SearchParams<Comment>): Promise<Comment[]> {
    const {
      limit: take, skip, obj
    } = searchParams;
    let filter;
    if (obj) filter = [
      { article: obj.article },
      { user: obj.user }
    ];
    return this.prisma.comment
      .findMany({
        where: { AND: filter },
        include: { pictureList: true },
        skip,
        take
      })
      .then((list) => list);
  }

  create (obj: Comment): Promise<Comment> {
    const { id, ...rest } = obj;
    return this.prisma.comment
      .create({
        data: { ...rest },
        include: { pictureList: true }
      });
  }

  update (obj: Comment): Promise<void | NotFoundDbException> {
    const { id, ...rest } = obj;
    return this.prisma.comment
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

export default CommentMongoModelDB;
