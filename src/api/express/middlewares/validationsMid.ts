import {
  NextFunction, Request, Response
} from 'express';
import {
  ArticleIdValSchema, ArticleValSchema, CommentIdValSchema, CommentValSchema, IdValSchema
} from '../../../utils/validations';
import {ArticleIdAreaIdValSchema, ArticleIdCommentIdValSchema} from '../../../utils/validations/articleVals';
import {createIdNameValSchemaFunc} from '../../../utils/validations/appVals';

// Generic

function validationIdMid (req: Request, res: Response, next: NextFunction) {
  IdValSchema.parse(req.params);
  next();
}

function validationIdNameMidCreateFunc (idName: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ValidSchemaIdName = createIdNameValSchemaFunc(idName);
    ValidSchemaIdName.parse(req.params[idName]);
    next();
  };
}

// Article

function validationArticleMid (req: Request, res: Response, next: NextFunction) {
  const article = req.body;
  ArticleValSchema.parse(article);
  next();
}

function validationArticleIdMid (req: Request, res: Response, next: NextFunction) {
  const article = req.body;
  ArticleIdValSchema.parse(article);
  next();
}

// Article - Area

function validationArticleIdAreaId (req: Request, res: Response, next: NextFunction) {
  const article = req.body;
  ArticleIdAreaIdValSchema.parse(article);
  next();
}

// Article - Comment

function validationArticleIdCommentId (req: Request, res: Response, next: NextFunction) {
  const article = req.body;
  ArticleIdCommentIdValSchema.parse(article);
  next();
}

// Comment

function validationComment (req: Request, res: Response, next: NextFunction) {
  const article = req.body;
  CommentValSchema.parse(article);
  next();
}

function validationCommentId (req: Request, res: Response, next: NextFunction) {
  const article = req.body;
  CommentIdValSchema.parse(article);
  next();
}

export {
  validationIdMid,
  validationIdNameMidCreateFunc,

  validationArticleMid,
  validationArticleIdMid,
  validationArticleIdAreaId,
  validationArticleIdCommentId,

  validationComment,
  validationCommentId
};
