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
  deleteArticleIdCommentId,
  getArticleIdAreaList,
  getArticleIdAreaId
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
  '/:idArticle/area/list',
  getArticleIdAreaId
);
router.get(
  '/:idArticle/area/:idArea',
  getArticleIdAreaList
);

// Comments related
router.get(
  '/:idArticle/comment/:idComment',
  getArticleIdCommentId
);
router.post(
  '/:idArticle/comment/:idComment/list',
  postArticleIdCommentIdList
);
router.post(
  '/:idArticle/comment',
  postArticleIdCommentId
);
router.put(
  '/:idArticle/comment',
  putArticleIdCommentId
);
router.delete(
  '/:idArticle/comment/:idComment',
  deleteArticleIdCommentId
);

export default router;
