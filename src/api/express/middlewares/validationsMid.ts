import {
  NextFunction, Request, Response
} from 'express';
import {
  ArticleValSchema,
  CartValSchema,
  CommentValSchema,
  idValSchemaCreateFunc,
  SearchParamsValSchema,
  ShippingValSchema,
  UserValSchema,
  CartLineValSchema,
  UserLoginValSchema,
  ArticleAreaValSchema,
  AreaValSchema
} from './validations';

function attrValidMidCreate (idName = 'id', petition = 'params') {
  return (req: Request, _: Response, next: NextFunction) => {
    const ValidSchemaIdName = idValSchemaCreateFunc(idName);
    ValidSchemaIdName.parse(req[petition][idName]);
    next();
  };
}

function idBodyValidMid () {
  attrValidMidCreate('id', 'body');
}

function idParamValidMid () {
  return attrValidMidCreate();
}

function searchParamsBodyValidMid (req: Request, res: Response, next: NextFunction) {
  SearchParamsValSchema.parse(req.body);
  next();
}

function searchParamsBodyParamValidMid (req: Request, res: Response, next: NextFunction) {
  SearchParamsValSchema.parse(req.body.searchParams);
  next();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapVals: Record<string, any> = {
  area: AreaValSchema,
  article: ArticleValSchema,
  articleArea: ArticleAreaValSchema,
  comment: CommentValSchema,
  user: UserValSchema,
  cart: CartValSchema,
  cartLine: CartLineValSchema,
  shipping: ShippingValSchema
};

// All body is a model object
function bodyValidMidCreate (name: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    mapVals[name].parse(req.body);
    next();
  };
}

// A param body is a model object
function bodyParamValidMidCreate (name: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    mapVals[name].parse(req.body[name]);
    next();
  };
}

function loginValidMid (req: Request, res: Response, next: NextFunction) {
  UserLoginValSchema.parse(req.body);
  next();
}

export {
  attrValidMidCreate,
  idBodyValidMid,
  idParamValidMid,
  searchParamsBodyValidMid,
  searchParamsBodyParamValidMid,
  bodyValidMidCreate,
  bodyParamValidMidCreate,
  loginValidMid
};
