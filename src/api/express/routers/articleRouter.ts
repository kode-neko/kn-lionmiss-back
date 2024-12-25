import { Router } from 'express';
import {
  getArticleById,
  postArticleList,
  postArticle,
  putArticle,
  deleteArticle,
  getArticleByIdArea,
  postArticleListByArea,
  postArticleArea,
  putArticleArea,
  deleteArticleArea
} from '../controllers';
import {
  attrValidMidCreate,
  bodyParamValidMidCreate,
  bodyValidMidCreate, idBodyValidMid, idParamValidMid, searchParamsBodyParamValidMid, searchParamsBodyValidMid
} from '../middlewares/validationsMid';

const router = Router();

// Article ops
router.get(
  '/:id',
  idParamValidMid,
  getArticleById
);
router.post(
  '/list',
  searchParamsBodyValidMid,
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
  '/:id',
  idParamValidMid,
  deleteArticle
);

// Translations per area
router.get(
  '/:idArticle/area/:area',
  attrValidMidCreate('idArticle'),
  attrValidMidCreate('area'),
  getArticleByIdArea
);
router.post(
  '/area/list',
  searchParamsBodyParamValidMid,
  bodyParamValidMidCreate('area'),
  postArticleListByArea
);
router.post(
  '/area',
  idBodyValidMid,
  bodyParamValidMidCreate('articleArea'),
  postArticleArea
);
router.put(
  '/area',
  bodyParamValidMidCreate('articleArea'),
  putArticleArea
);
router.delete(
  '/:idArticle/area/:area',
  idParamValidMid,
  bodyParamValidMidCreate('articleArea'),
  deleteArticleArea
);

export default router;
