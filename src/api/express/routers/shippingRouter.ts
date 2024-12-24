import { Router } from 'express';
import {
  getShippingById,
  postShippingList,
  postShipping,
  putShipping,
  deleteShipping
} from '../controllers';

const router = Router();

// RUD Shipping

router.get(
  '/:id',
  getShippingById
);
router.post(
  '/',
  postShippingList
);
router.put(
  '/',
  putShipping
);
router.delete(
  '/:id',
  deleteShipping
);

// Create from Cart

router.get(
  '/cart/:cartId',
  postShipping
);

export default router;
