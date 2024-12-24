import { Router } from 'express';
import {
  getUserById,
  postUserLoginJwt,
  postUserLoginSession,
  portUserLogoutSession,
  postUserLogoutJwt
} from '../controllers';

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
  getUserById
);
router.post(
  '/login',
  postUserLogin
);
router.post(
  '/logout',
  postUserLogout
);

export default router;
