import { Router } from 'express';
import {
  getUserId,
  postUserLoginJwt,
  postUserLoginSession,
  portUserLogoutSession,
  postUserLogoutJwt
} from '../controllers';
import { attrValidMidCreate, loginValidMid } from '../middlewares';

const { AUTH_SYS } = process.env;

const router = Router();

let postUserLogin;
let postUserLogout;

switch (AUTH_SYS) {
  case 'session':
    postUserLogin = postUserLoginJwt;
    postUserLogout = postUserLogoutJwt;
    break;
  default:
    postUserLogin = postUserLoginSession;
    postUserLogout = portUserLogoutSession;
}

router.get(
  '/:userName',
  attrValidMidCreate('userName'),
  getUserId
);
router.post(
  '/login',
  loginValidMid,
  postUserLogin
);
router.post(
  '/logout',
  postUserLogout
);

export default router;
