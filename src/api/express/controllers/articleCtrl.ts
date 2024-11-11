import { Request, Response } from 'express';
import { getArticle } from '../../../data-access';
import { errorResponse } from './utils';

// Article ops

function getArticleId (req: Request, res: Response) {
  const { id } = req.params;
  return getArticle()
    .read(id)
    .then((obj) => res.status(200).send(obj))
    .catch((err) => errorResponse(err, res));
}

function postArticleList (req: Request, res: Response) {
  const { skip, limit } = req.body;
  return getArticle()
    .readList({ skip, limit })
    .then((list) => res.status(200).send(list));
}

function postArticle (req: Request, res: Response) {
  return getArticle()
    .create(req)
    .then((objId) => res.status(201).send(objId));
}

function putArticle (req: Request, res: Response) {
  return getArticle()
    .update(req)
    .then(() => res.status(200))
    .catch((err) => errorResponse(err, res));
}

function deleteArticle (req: Request, res: Response) {
  const { id } = req.params;
  return getArticle()
    .delete(id)
    .then(() => res.status(200))
    .catch((err) => errorResponse(err, res));
}

// Translations per area

function getArticleIdAreaId (req: Request, res: Response) {
  const { idArticle, nameArea } = req.params;
  return getArticle()
    .readInfoArea(idArticle, nameArea)
    .then((obj) => res.status(200).send(obj))
    .catch((err) => errorResponse(err, res));
}

export {
  getArticleId,
  postArticleList,
  postArticle,
  putArticle,
  deleteArticle,
  getArticleIdAreaId
};
