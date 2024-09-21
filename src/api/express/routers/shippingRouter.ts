import {Router} from 'express';
import {
  getShippingId,
  postShippingList,
  postShipping,
  putShipping,
  deleteShipping
} from '../controllers/shippingCtrl';
import { validationBodyMidCreateFunc, validationIdBodyMid, validationIdMid, validationSearchParamsMid } from '../middlewares/validationsMid';

const router = Router();

router.get(
  '/:id',
  validationIdMid,
  getShippingId
);
router.post(
  '/list',
  validationSearchParamsMid,
  postShippingList
);
router.post(
  '/',
  validationIdBodyMid,
  validationBodyMidCreateFunc('shipping'),
  postShipping
);
router.put(
  '/:id',
  validationBodyMidCreateFunc('shipping'),
  putShipping
);
router.delete(
  '/:id',
  validationIdMid,
  deleteShipping
);

export default router;
