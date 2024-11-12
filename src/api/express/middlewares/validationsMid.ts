import {
  NextFunction, Request, Response
} from 'express';
import {
  ArticleValSchema,
  CartValSchema,
  CommentValSchema,
  IdValSchema,
  idValSchemaCreateFunc,
  SearchParamsValSchema,
  ShippingValSchema,
  UserValSchema,
  CartLineValSchema,
  UserLoginValSchema
} from './validations';

function validAttrMidCreate (idName = 'id', petition = 'params') {
  return (req: Request, res: Response, next: NextFunction) => {
    const ValidSchemaIdName = idValSchemaCreateFunc(idName);
    ValidSchemaIdName.parse(req[petition][idName]);
    next();
  };
}

function idBodyValidMid () {
  validAttrMidCreate('id', 'body');
}

function idParamValidMid () {
  return validAttrMidCreate();
}

function bodyValidMId (req: Request, res: Response, next: NextFunction) {
  IdValSchema.parse(req.body);
  next();
}

function searchParamsValidMid (req: Request, res: Response, next: NextFunction) {
  SearchParamsValSchema.parse(req.body);
  next();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapVals: Record<string, any> = {
  article: ArticleValSchema,
  comment: CommentValSchema,
  user: UserValSchema,
  cart: CartValSchema,
  cartLine: CartLineValSchema,
  shipping: ShippingValSchema
};

function bodyValidMidCreate (name: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    mapVals[name].parse(req.body);
    next();
  };
}

function loginValidMid (req: Request, res: Response, next: NextFunction) {
  UserLoginValSchema.parse(req.body);
  next();
}

export {
  validAttrMidCreate,
  idBodyValidMid,
  idParamValidMid,
  bodyValidMId,
  searchParamsValidMid,
  bodyValidMidCreate,
  loginValidMid
};
