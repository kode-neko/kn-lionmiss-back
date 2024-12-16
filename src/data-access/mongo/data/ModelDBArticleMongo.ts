import {
  Collection, Db, MongoClient
} from 'mongodb';
import { IModelDBArticle } from '../../interfaces';
import { NotFoundDbException } from '../../error';
import {
  AreaMongo, ArticleAreaMongo, ArticleMongo
} from '../db/interfaces';
import {
  Area, Article, ArticleArea, SearchParams
} from '../../../model';
import { getConnMongo } from '../db/utils';

class ArticleMongoModelDB implements IModelDBArticle {

  private client: MongoClient;

  private db: Db;

  private collArt: Collection<ArticleMongo>;

  private collArea: Collection<AreaMongo>;

  private collArtArea: Collection<ArticleAreaMongo>;

  private static instance: IModelDBArticle;

  public static getIntance (): IModelDBArticle {
    if (!ArticleMongoModelDB.instance) {
      ArticleMongoModelDB.instance = new ArticleMongoModelDB();
    }
    return ArticleMongoModelDB.instance;
  }

  private constructor () {
    [this.client,
      this.db] = getConnMongo();
    this.collArt = this.db.collection<ArticleMongo>('article');
    this.collArea = this.db.collection<AreaMongo>('area');
  }

  readByArea (id: string, area: Area): Promise<Article | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  readListByArea (searchParams: SearchParams<Article>, area: Area): Promise<Article[]> {
    throw new Error('Method not implemented.');
  }

  createArticleArea (id: string, articleArea: ArticleArea): Promise<ArticleArea> {
    throw new Error('Method not implemented.');
  }

  updateArticleArea (articleArea: ArticleArea): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  deleteArticleArea (id: string): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  read (id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  readList (searchParams?: SearchParams<T>): Promise<Article[]> {
    throw new Error('Method not implemented.');
  }

  create (obj: Article): Promise<Article> {
    throw new Error('Method not implemented.');
  }

  update (obj: Article): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

  delete (id: string): Promise<void | NotFoundDbException> {
    throw new Error('Method not implemented.');
  }

}

export default ArticleMongoModelDB;
