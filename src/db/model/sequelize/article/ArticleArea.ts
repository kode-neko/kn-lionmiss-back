import IModelDB from '../../IModelDB';
import { ArticleArea } from '@model/index';

class ArticleAreaSeqModelDB implements IModelDB<ArticleArea> {

  read (id: string): Promise<ArticleArea> {
    throw new Error('Method not implemented.');
  }

  readList (searchParams: ArticleArea): Promise<ArticleArea[]> {
    throw new Error('Method not implemented.');
  }

  create (obj: ArticleArea): Promise<ArticleArea> {
    throw new Error('Method not implemented.');
  }

  update (obj: ArticleArea): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  delete (id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

}

export default ArticleAreaSeqModelDB;
