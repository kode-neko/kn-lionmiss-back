import { Router } from 'express';
import {
  getCommentById,
  postCommentList,
  postComment,
  putComment,
  deleteComment
} from '../controllers';
import {
  bodyValidMidCreate, idBodyValidMid, idParamValidMid, searchParamsBodyValidMid
} from '../middlewares/validationsMid';

const router = Router();

// CRUD

router.get(
  '/:id',
  idParamValidMid,
  getCommentById
);
router.post(
  '/list',
  searchParamsBodyValidMid,
  postCommentList
);
router.post(
  '/',
  bodyValidMidCreate('comment'),
  postComment
);
router.put(
  '/',
  idBodyValidMid,
  bodyValidMidCreate('comment'),
  putComment
);
router.delete(
  '/:id',
  idParamValidMid,
  deleteComment
);

export default router;