import {
  NextFunction, Request, Response
} from 'express';
import {
  ArticleValSchema,
  CartValSchema,
  CommentValSchema,
  IdValSchema,
  idValSchemaCreateFunc,
  LoginValSchema,
  SearParamsValSchema,
  ShippingValSchema,
  UserValSchema
} from '@utils/validations';

function validationIdCreateFunc (idName: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ValidSchemaIdName = idValSchemaCreateFunc(idName);
    ValidSchemaIdName.parse(req.params[idName]);
    next();
  };
}

function validationIdMid () {
  validationIdCreateFunc('id');
}

function validationIdBodyMid (req: Request, res: Response, next: NextFunction) {
  IdValSchema.parse(req.body);
  next();
}

function validationSearchParamsMid (req: Request, res: Response, next: NextFunction) {
  SearParamsValSchema.parse(req.body);
  next();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapVals: Record<string, any> = {
  article: ArticleValSchema,
  comment: CommentValSchema,
  user: UserValSchema,
  cart: CartValSchema,
  shipping: ShippingValSchema
};

function validationBodyMidCreateFunc (name: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    mapVals[name].parse(req.body);
    next();
  };
}

function validationLoginMid (req: Request, res: Response, next: NextFunction) {
  LoginValSchema.parse(req.body);
  next();
}

export {
  validationIdMid,
  validationIdBodyMid,
  validationSearchParamsMid,
  validationIdCreateFunc,
  validationBodyMidCreateFunc,
  validationLoginMid
};
