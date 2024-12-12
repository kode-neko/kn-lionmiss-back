import {
  NextFunction, Request, Response
} from 'express';
import { extractHeader } from './utils';
import {
  checkHeaderAuthJwt, checkSubAuthJwt, getPaylaodAuthJwt
} from '../../../utils';
import { AuthException } from './error';

async function chkAuthJwtMid (req: Request) {
  const authHeader = extractHeader(req);
  const token = await checkHeaderAuthJwt(authHeader);
  const payload = await getPaylaodAuthJwt(token);
  checkSubAuthJwt(payload);
}

function chkSessionMid (req: Request) {
  if (!req.session.loggedIn) throw new AuthException('There is no session');
}

function chkAuthMid (req: Request, res: Response, next: NextFunction) {
  const { AUTH_SYS } = process.env;
  switch (AUTH_SYS) {
    case 'jwt':
      chkAuthJwtMid(req);
      break;
    case 'session':
      chkSessionMid(req);
      break;
    default:
      chkAuthJwtMid(req);
  }
  next();
}

// TODO - OpenIDC

export {
  chkAuthJwtMid, chkSessionMid, chkAuthMid
};
