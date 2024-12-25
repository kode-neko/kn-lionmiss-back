import { Router } from 'express';
import {
  getCartById,
  postCartLine,
  putCartLine,
  deleteCartLine
} from '../controllers';
import {
  attrValidMidCreate, bodyParamValidMidCreate, idParamValidMid
} from '../middlewares/validationsMid';

const router = Router();

// R Cart

router.get(
  '/:id',
  idParamValidMid,
  getCartById
);

// CartLine

router.post(
  '/line',
  attrValidMidCreate('idCart', 'body'),
  bodyParamValidMidCreate('cartLine'),
  postCartLine
);
router.put(
  '/line',
  attrValidMidCreate('idCart', 'body'),
  bodyParamValidMidCreate('cartLine'),
  putCartLine
);
router.delete(
  '/line',
  attrValidMidCreate('idCart', 'body'),
  bodyParamValidMidCreate('cartLine'),
  deleteCartLine
);

export default router;
