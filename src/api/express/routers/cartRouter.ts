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
  validAttrMidCreate
} from '../middlewares';

const router = Router();

router.get(
  '/:id',
  idParamValidMid,
  getCartId
);
router.post(
  '/new/user/:username',
  validAttrMidCreate('username'),
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
  validAttrMidCreate('idCart'),
  validAttrMidCreate('numLine'),
  deleteCartLine
);

export default router;
