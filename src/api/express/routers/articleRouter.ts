import {Router} from 'express';
import {
  getArticleId,
  postArticleList,
  postArticle,
  putArticle,
  deleteArticle,
  getArticleIdCommentId,
  postArticleIdCommentIdList,
  postArticleIdCommentId,
  putArticleIdCommentId,
  deleteArticleIdCommentId,
  getArticleIdAreaList,
  getArticleIdAreaId
} from '../controllers/articleCtrl';
import {
  validationBodyMidCreateFunc,
  validationIdBodyMid,
  validationIdMid,
  validationIdCreateFunc,
  validationSearchParamsMid
} from '../middlewares/validationsMid';

const router = Router();

// Article ops
router.get('/:id',validationIdMid,getArticleId);
router.post('/list',validationSearchParamsMid,postArticleList);
router.post(
  '/',
  validationIdBodyMid,
  validationBodyMidCreateFunc('article'),
  postArticle
);
router.put(
  '/',
  validationIdBodyMid,
  validationBodyMidCreateFunc('article'),
  putArticle
);
router.delete(
  '/',
  validationIdMid,
  deleteArticle
);

// Translations per area
router.get(
  '/:idArticle/area/list',
  validationIdCreateFunc('idArticle'),
  getArticleIdAreaId
);
router.get(
  '/:idArticle/area/:idArea',
  validationIdCreateFunc('idArticle'),
  validationIdCreateFunc('idArea'),
  getArticleIdAreaList
);

// Comments related
router.get(
  '/:idArticle/comment/:idComment',
  validationIdCreateFunc('idArticle'),
  validationIdCreateFunc('idComment'),
  getArticleIdCommentId
);
router.post(
  '/:idArticle/comment/:idComment/list',
  validationIdCreateFunc('idArticle'),
  validationIdCreateFunc('idComment'),
  postArticleIdCommentIdList
);
router.post(
  '/:idArticle/comment',
  validationIdCreateFunc('idArticle'),
  postArticleIdCommentId
);
router.put(
  '/:idArticle/comment',
  validationIdCreateFunc('idArticle'),
  putArticleIdCommentId
);
router.delete(
  '/:idArticle/comment/:idComment',
  validationIdCreateFunc('idArticle'),
  validationIdCreateFunc('idComment'),
  deleteArticleIdCommentId
);

export default router;
