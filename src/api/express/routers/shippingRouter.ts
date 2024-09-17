import {Router} from 'express';
import {
  getShippingId,
  postShippingList,
  postShipping,
  putShipping,
  deleteShipping
} from '../controllers/shippingCtrl';

const router = Router();

router.get(
  '/:id',
  getShippingId
);
router.post(
  '/list',
  postShippingList
);
router.post(
  '/',
  postShipping
);
router.put(
  '/:id',
  putShipping
);
router.delete(
  '/:id',
  deleteShipping
);

export default router;
