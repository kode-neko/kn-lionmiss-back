import { Router } from 'express';
import {
  getUserId,
  getUserIdCart,
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
router.get('/:username/cart', validationIdCreateFunc('username'), getUserIdCart);

export default router;
