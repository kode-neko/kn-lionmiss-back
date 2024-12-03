import {
  NextFunction, Request, Response
} from 'express';
import { extractHeader } from './utils';
import {
  checkHeaderAuthJwt, checkSubAuthJwt, getPaylaodAuthJwt
} from '../../../utils';

async function chkTokenJwtMid (req: Request, _: Response, next: NextFunction) {
  const authHeader = extractHeader(req);
  const token = await checkHeaderAuthJwt(authHeader);
  const payload = await getPaylaodAuthJwt(token);
  checkSubAuthJwt(payload);
  next();
}

// TODO - OpenIDC

export { chkTokenJwtMid };
