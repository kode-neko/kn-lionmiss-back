import { Router } from 'express';
import {
  getCart,
  postCart,
  putCart
} from '../controllers';
import {
  validationBodyMidCreateFunc,
  validationIdMid
} from '../middlewares';

const router = Router();

router.get('/:id', validationIdMid, getCart);
router.post('/', validationBodyMidCreateFunc('cart'), postCart);
router.put('/', validationIdMid, validationBodyMidCreateFunc('cart'), putCart);

export default router;
