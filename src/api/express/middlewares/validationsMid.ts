import {
  NextFunction, Request, Response
} from 'express';
import {
  ArticleValSchema, CartValSchema, CommentValSchema, IdValSchema,
  ShippingValSchema,
  UserValSchema
} from '../../../utils/validations';
import {createIdNameValSchemaFunc} from '../../../utils/validations/appVals';

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

export {
  validationIdMid,
  validationIdNameMidCreateFunc,
  validationBodyMidCreateFunc
};
