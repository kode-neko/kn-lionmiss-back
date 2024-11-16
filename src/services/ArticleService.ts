import { articleList } from '@fixtures/article';
import {
  Article, SearchParams, Comment
} from '@model/index';
import { comment as commentFix } from '@fixtures/comment';
import {
  getArticle,
  IModelDBArticle,
  NotFoundDbException
} from '../data-access';

class ArticleService {

  private instance: ArticleService;

  private articleModel: IModelDBArticle;

  private constructor () {
    this.articleModel = getArticle();
  }

  public getInstance (): ArticleService {
    if (!this.instance) {
      this.instance = new ArticleService();
    }
    return this.instance;
  }

  public getArticle (id: string): Promise<Article | NotFoundDbException> {
    return this.articleModel.read(id);
  }

  public getListArticles (searchParams: SearchParams): Article[] {
    return articleList();
  }

  public createArticle (article: Article): Article {
    return {
      ...article,
      id: String(Date.now())
    };
  }

  public modifyArticle (article: Required<Article>): Article {
    return article;
  }

  public deleteArticle (id: string): boolean {
    return true;
  }

  public getComment (idArticle: string, idComment: string): Comment {
    return commentFix;
  }

  public getListComments (idArticle: string, idComment: string): Comment[] {
    return [commentFix];
  }

  public createComment (idArticle: string, comment: Comment): Comment {
    return {
      ...commentFix,
      id: String(Date.now())
    };
  }

  public modifyComment (idArticle: string, comment: Required<Comment>): Comment {
    return commentFix;
  }

  public deleteComment (idArticle: string, idComment: string): boolean {
    return true;
  }

}

export default ArticleService;
