import { Router } from 'express';
import {
  getAreaById,
  postAreaList,
  postArea,
  putArea,
  deleteArea
} from '../controllers';

const router = Router();

// CRUD

router.get(
  '/:id',
  getAreaById
);
router.post(
  '/list',
  postAreaList
);
router.post(
  '/',
  postArea
);
router.put(
  '/',
  putArea
);
router.delete(
  '/:id',
  deleteArea
);

export default router;
