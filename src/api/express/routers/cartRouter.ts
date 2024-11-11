import { Router } from 'express';
import {
  postCartLine,
  putCartLine,
  deleteCartLine
} from '../controllers';
import {
  validationBodyMidCreateFunc,
  validationIdMid
} from '../middlewares';

const router = Router();

router.get('/:id', validationIdMid, getCartId);
router.post('/line', validationBodyMidCreateFunc('cartLine'), postCartLine);
router.put('/line', validationIdMid, validationBodyMidCreateFunc('cartLine'), putCartLine);
router.delete('/:idCart/line/:numLine', validationIdMid, deleteCartLine);

export default router;
