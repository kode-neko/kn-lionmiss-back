import { Router } from 'express';
import {
  getArticleId,
  postArticleList,
  postArticle,
  putArticle,
  deleteArticle,
  getArticleIdAreaList
} from '../controllers';
import {
  validationBodyMidCreateFunc,
  validationIdBodyMid,
  validationIdMid,
  validationIdCreateFunc,
  validationSearchParamsMid
} from '../middlewares';

const router = Router();

// Article ops
router.get('/:id', validationIdMid, getArticleId);
router.post('/list', validationSearchParamsMid, postArticleList);
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
  '/:idArticle/area/:nameArea',
  validationIdCreateFunc('idArticle'),
  validationIdCreateFunc('nameArea'),
  getArticleIdAreaList
);

export default router;
