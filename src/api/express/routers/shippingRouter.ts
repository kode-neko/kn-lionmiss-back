import { Router } from 'express';
import {
  getShippingById,
  postShippingList,
  postShipping,
  putShipping,
  deleteShipping
} from '../controllers';
import {
  attrValidMidCreate,
  bodyValidMidCreate, idBodyValidMid, idParamValidMid,
  searchParamsBodyParamValidMid
} from '../middlewares/validationsMid';

const router = Router();

// RUD Shipping

router.get(
  '/:id',
  idParamValidMid,
  getShippingById
);
router.post(
  '/',
  searchParamsBodyParamValidMid,
  postShippingList
);
router.put(
  '/',
  idBodyValidMid,
  bodyValidMidCreate('shipping'),
  putShipping
);
router.delete(
  '/:id',
  idParamValidMid,
  deleteShipping
);

// Create from Cart

router.get(
  '/cart/:cartId',
  attrValidMidCreate('cartId'),
  postShipping
);

export default router;
