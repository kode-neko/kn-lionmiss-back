import { Router } from 'express';
import {
  getArticleId,
  postArticleList,
  postArticle,
  putArticle,
  deleteArticle,
  getArticleIdAreaName
} from '../controllers';
import {
  idBodyValidMid,
  idParamValidMid,
  searchParamsValidMid,
  bodyValidMidCreate,
  attrValidMidCreate
} from '../middlewares';

const router = Router();

// Article ops
router.get(
  '/:id',
  idParamValidMid,
  getArticleId
);
router.post(
  '/list',
  searchParamsValidMid,
  postArticleList
);
router.post(
  '/',
  bodyValidMidCreate('article'),
  postArticle
);
router.put(
  '/',
  idBodyValidMid,
  bodyValidMidCreate('article'),
  putArticle
);
router.delete(
  '/',
  idParamValidMid,
  deleteArticle
);

// Translations per area
router.get(
  '/:idArticle/area/:nameArea',
  attrValidMidCreate('idArticle'),
  attrValidMidCreate('nameArea'),
  getArticleIdAreaName
);

export default router;
