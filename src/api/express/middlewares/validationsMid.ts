import {
  NextFunction, Request, Response
} from 'express';
import {
  ArticleValSchema, CartValSchema, CommentValSchema, IdValSchema,
  ShippingValSchema,
  UserValSchema
} from '../../../utils/validations';
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

// Comment

function validationCommentMid (req: Request, res: Response, next: NextFunction) {
  const comment = req.body;
  CommentValSchema.parse(comment);
  next();
}

// User

function validationUserMid (req: Request, res: Response, next: NextFunction) {
  const user = req.body;
  UserValSchema.parse(user);
  next();
}

// Cart

function validationCartMid (req: Request, res: Response, next: NextFunction) {
  const cart = req.body;
  CartValSchema.parse(cart);
  next();
}

// Shipping

function validationShippingMid (req: Request, res: Response, next: NextFunction) {
  const shipping = req.body;
  ShippingValSchema.parse(shipping);
  next();
}

export {
  validationIdMid,
  validationIdNameMidCreateFunc,
  validationArticleMid,
  validationCommentMid,
  validationUserMid,
  validationCartMid,
  validationShippingMid
};
