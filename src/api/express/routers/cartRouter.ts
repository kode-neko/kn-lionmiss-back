import { Router } from 'express';
import {
  getCartId,
  postCartLine,
  putCartLine,
  deleteCartLine,
  postCartNewUser
} from '../controllers';

const router = Router();

router.get(
  '/:id',
  getCartId
);
router.post(
  '/new/user/:username',
  postCartNewUser
);
router.post(
  '/line',
  postCartLine
);
router.put(
  '/line',
  putCartLine
);
router.delete(
  '/:idCart/line/:numLine',
  deleteCartLine
);

export default router;
