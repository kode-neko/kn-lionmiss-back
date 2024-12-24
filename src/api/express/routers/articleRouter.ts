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

const router = Router();

// Article ops
router.get(
  '/:id',
  getArticleById
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
  '/:id',
  deleteArticle
);

// Translations per area
router.get(
  '/:idArticle/area/:area',
  getArticleByIdArea
);
router.post(
  '/area/list',
  postArticleListByArea
);
router.post(
  '/area',
  postArticleArea
);
router.get(
  '/area',
  putArticleArea
);
router.get(
  '/:idArticle/area/:area',
  deleteArticleArea
);

export default router;
