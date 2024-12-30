import { Router } from 'express';
import {
  getAreaById,
  postAreaList,
  postArea,
  putArea,
  deleteArea
} from '../controllers';
import {
  bodyParamValidMidCreate,
  bodyValidMidCreate,
  idBodyValidMid,
  idParamValidMid,
  searchParamsBodyValidMid
} from '../middlewares/validationsMid';

const router = Router();

// CRUD

router.get(
  '/:id',
  idParamValidMid,
  getAreaById
);
router.post(
  '/list',
  searchParamsBodyValidMid,
  postAreaList
);
router.post(
  '/',
  bodyValidMidCreate('area'),
  postArea
);
router.put(
  '/',
  idBodyValidMid,
  bodyParamValidMidCreate('area'),
  putArea
);
router.delete(
  '/:id',
  idParamValidMid,
  deleteArea
);

export default router;
