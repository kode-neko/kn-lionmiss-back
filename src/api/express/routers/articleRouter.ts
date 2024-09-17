import {Router} from 'express';
import {
  getArticleId,
  postArticleList,
  postArticle,
  putArticle,
  deleteArticle,

  getArticleIdAreId,

  getArticleIdCommentId,
  postArticleIdCommentIdList,
  postArticleIdCommentId,
  putArticleIdCommentId,
  deleteArticleIdCommentId
} from '../controllers/articleCtrl';

const router = Router();

// Article ops
router.get(
  '/:id',
  getArticleId
);
router.post(
  '/list',
  postArticleList
);
router.post(
  '/',
  postArticle
);
router.put(
  '/',
  putArticle
);
router.delete(
  '/',
  deleteArticle
);

// Translations per area
router.get(
  '/:id/area/:id',
  getArticleIdAreId
);

// Comments related
router.get(
  '/:id/comment/:id',
  getArticleIdCommentId
);
router.post(
  '/:id/comment/:id/list',
  postArticleIdCommentIdList
);
router.post(
  '/:id/comment/:id',
  postArticleIdCommentId
);
router.put(
  '/:id/comment/:id',
  putArticleIdCommentId
);
router.delete(
  '/:id/comment/:id',
  deleteArticleIdCommentId
);

export default router;
