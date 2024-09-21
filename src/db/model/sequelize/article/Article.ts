import IModelDB from '../../IModelDB';
import { Article } from '@model/index';

class ArticleSeqModelDB implements IModelDB<Article> {

  read (id: string): Promise<Article> {
    throw new Error('Method not implemented.');
  }

  readList (searchParams: Article): Promise<Article[]> {
    throw new Error('Method not implemented.');
  }

  create (obj: Article): Promise<Article> {
    throw new Error('Method not implemented.');
  }

  update (obj: Article): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  delete (id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

}

export default ArticleSeqModelDB;
