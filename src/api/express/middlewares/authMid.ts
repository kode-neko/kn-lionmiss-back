import {
  NextFunction, Request, Response
} from 'express';
import {
  checkHeaderAuthJwt, checkSubAuthJwt, getPaylaodAuthJwt
} from './auth/jwtAut';
import { extractHeader } from './auth/utils';

async function authJwtMid (req: Request, _: Response, next: NextFunction) {
  const authHeader = extractHeader(req);
  const token = await checkHeaderAuthJwt(authHeader);
  const payload = await getPaylaodAuthJwt(token);
  checkSubAuthJwt(payload);
  next();
}

export default authJwtMid;
