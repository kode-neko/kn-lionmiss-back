import { Router } from 'express';
import {
  getShippingId,
  postShippingList,
  postShipping,
  putShipping,
  deleteShipping
} from '../controllers';

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
  '/',
  putShipping
);
router.delete(
  '/:id',
  deleteShipping
);

export default router;
