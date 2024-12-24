import { Router } from 'express';
import {
  getCommentById,
  postCommentList,
  postComment,
  putComment,
  deleteComment
} from '../controllers';

const router = Router();

// CRUD

router.get(
  '/:id',
  getCommentById
);
router.post(
  '/list',
  postCommentList
);
router.post(
  '/',
  postComment
);
router.put(
  '/',
  putComment
);
router.delete(
  '/:id',
  deleteComment
);

export default router;
