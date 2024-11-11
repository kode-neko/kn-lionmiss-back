import { Router } from 'express';
import {
  getUserId,
  postUserLogin,
  postUserLogout
} from '../controllers';
import {
  validationIdCreateFunc,
  validationLoginMid
} from '../middlewares';

const router = Router();

router.get('/:userame', validationIdCreateFunc('username'), getUserId);
router.post('/login', validationLoginMid, postUserLogin);
router.post('/logout', postUserLogout);

export default router;
