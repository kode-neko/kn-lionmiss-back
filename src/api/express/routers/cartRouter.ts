import { Router } from 'express';
import {
  getCartId,
  postCartLine,
  putCartLine,
  deleteCartLine,
  postCartNewUser
} from '../controllers';
import {
  idParamValidMid,
  idBodyValidMid,
  bodyValidMidCreate,
  attrValidMidCreate
} from '../middlewares';

const router = Router();

router.get(
  '/:id',
  idParamValidMid,
  getCartId
);
router.post(
  '/new/user/:username',
  attrValidMidCreate('username'),
  postCartNewUser
);
router.post(
  '/line',
  bodyValidMidCreate('cartLine'),
  postCartLine
);
router.put(
  '/line',
  idBodyValidMid,
  bodyValidMidCreate('cartLine'),
  putCartLine
);
router.delete(
  '/:idCart/line/:numLine',
  attrValidMidCreate('idCart'),
  attrValidMidCreate('numLine'),
  deleteCartLine
);

export default router;
