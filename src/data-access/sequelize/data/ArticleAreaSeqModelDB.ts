/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArticleArea } from '@model/index';
import { NotFoundDbException } from '../../error';
import { IModelDBArticleArea } from '../../interfaces';

class ArticleAreaSeqModelDB implements IModelDBArticleArea {

  private static instance: ArticleAreaSeqModelDB;

  public static getIntance (): ArticleAreaSeqModelDB {
    if (!ArticleAreaSeqModelDB.instance) {
      ArticleAreaSeqModelDB.instance = new ArticleAreaSeqModelDB();
    }
    return ArticleAreaSeqModelDB.instance;
  }

  private constructor () {

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

  update (obj: ArticleArea): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  delete (id: string): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

}

export default ArticleAreaSeqModelDB;
