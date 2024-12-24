import { Router } from 'express';
import {
  getArticleId,
  postArticleList,
  postArticle,
  putArticle,
  deleteArticle,
  getArticleIdAreaName
} from '../controllers';

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
  '/:idArticle/area/:nameArea',
  getArticleIdAreaName
);

export default router;
