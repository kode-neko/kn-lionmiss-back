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
  bodyParamValidMidCreate,
  idBodyValidMid,
  idParamValidMid,
  searchParamsBodyValidMid
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
  searchParamsBodyValidMid,
  postShippingList
);
router.put(
  '/',
  idBodyValidMid,
  bodyParamValidMidCreate('shipping'),
  putShipping
);
router.delete(
  '/:id',
  idParamValidMid,
  deleteShipping
);

// Create from Cart

router.post(
  '/cart',
  attrValidMidCreate('userId', 'body'),
  bodyParamValidMidCreate('shipping'),
  postShipping
);

export default router;
