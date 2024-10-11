import { Router } from 'express';
import {
  getCart,
  postCartLine,
  putCartLine,
  deleteCartLine
} from '../controllers';
import {
  validationBodyMidCreateFunc,
  validationIdMid
} from '../middlewares';

const router = Router();

router.get('/:id', validationIdMid, getCart);
router.post('/:id/line', validationBodyMidCreateFunc('cartLine'), postCartLine);
router.put('/:id/line', validationIdMid, validationBodyMidCreateFunc('cartLine'), putCartLine);
router.delete('/:id/line/:id', validationIdMid, deleteCartLine);

export default router;
