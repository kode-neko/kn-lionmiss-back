import { Router } from 'express';
import {
  getShippingId,
  postShippingList,
  postShipping,
  putShipping,
  deleteShipping
} from '../controllers';
import {
  idBodyValidMid,
  idParamValidMid,
  searchParamsValidMid,
  bodyValidMidCreate
} from '../middlewares';
const router = Router();

router.get(
  '/:id',
  idParamValidMid,
  getShippingId
);
router.post(
  '/list',
  searchParamsValidMid,
  postShippingList
);
router.post(
  '/',
  bodyValidMidCreate('shipping'),
  postShipping
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

export default router;
