import { Router } from 'express';
import {
  getCartId,
  postCartLine,
  putCartLine,
  deleteCartLine,
  postCartNewUser
} from '../controllers';
import {
  validationBodyMidCreateFunc,
  validationIdMid
} from '../middlewares';

const router = Router();

router.get('/:id', validationIdMid, getCartId);
router.post('/new/user/:username', validationIdMid, postCartNewUser);
router.post('/line', validationBodyMidCreateFunc('cartLine'), postCartLine);
router.put('/line', validationIdMid, validationBodyMidCreateFunc('cartLine'), putCartLine);
router.delete('/:idCart/line/:numLine', validationIdMid, deleteCartLine);

export default router;
