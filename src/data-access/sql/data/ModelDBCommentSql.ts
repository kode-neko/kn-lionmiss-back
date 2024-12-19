import { SearchParams, Comment } from '@model/index';
import { NotFoundDbException } from '../../error';
import { IModelDBComment } from '../../interfaces';
import { PrismaClient } from '@prisma/client';
import { getPrismaClient } from '../db/utils';
import { idToNum, idToStr } from './utils';

type CommentPrisma = {
  commentToPicture: ({
    commentToPicture: {
      id: number;
      ext: string;
      src: string;
      alt: string;
    };
  } & {
    comment: number;
    picture: number;
  })[];
} & {
  id: number;
  user: number;
  article: number;
  title: string;
  body: string;
  rating: number;
};

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

  private parseToComment (prisma: CommentPrisma): Comment {
    const {
      id, commentToPicture, user, article, ...rest
    } = prisma;
    const pictureList = commentToPicture
      .map(({ commentToPicture: { id, ...rest } }) => ({ id: idToStr(id), ...rest }));
    return {
      id: idToStr(id), ...rest, pictureList, idArticle: article.toString(), idUser: user.toString()
    };
  }

  read (id: string): Promise<Comment> {
    return this.prisma.comment
      .findFirst({
        where: { id: idToNum(id) },
        include: { commentToPicture: { include: { commentToPicture: true } } }
      })
      .then((res) => {
        if (!res) throw new NotFoundDbException('Comment');
        return this.parseToComment(res);
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
        include: { commentToPicture: { include: { commentToPicture: true } } },
        skip,
        take
      })
      .then((list) => list.map(this.parseToComment));
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

}

export default CommentMongoModelDB;
