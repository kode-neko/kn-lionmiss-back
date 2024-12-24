import { Router } from 'express';
import {
  getCartById,
  postCartLine,
  putCartLine,
  deleteCartLine
} from '../controllers';

const router = Router();

// R Cart

router.get(
  '/:id',
  getCartById
);

// CartLine

router.post(
  '/line',
  postCartLine
);
router.put(
  '/line',
  putCartLine
);
router.delete(
  '/line',
  deleteCartLine
);

export default router;
