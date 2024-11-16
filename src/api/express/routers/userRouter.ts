import { Router } from 'express';
import {
  getUserId,
  postUserLogin,
  postUserLogout
} from '../controllers';
import { validAttrMidCreate } from '../middlewares';

const router = Router();

router.get(
  '/:userName',
  validAttrMidCreate('userName'),
  getUserId
);
router.post(
  '/login',
  validAttrMidCreate('userName', 'body'),
  validAttrMidCreate('pass', 'body'),
  postUserLogin
);
router.post(
  '/logout',
  postUserLogout
);

export default router;
