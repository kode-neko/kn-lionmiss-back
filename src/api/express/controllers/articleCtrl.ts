import { Request, Response } from 'express';
import { getArticle } from '../../../data-access';
import { errorResponse } from './utils';

// CRUD

function getArticleById (req: Request, res: Response) {
  const { id } = req.params;
  return getArticle()
    .read(id)
    .then((obj) => res.status(200).send(obj))
    .catch((err) => errorResponse(err, res));
}

function postArticleList (req: Request, res: Response) {
  const { searchParams } = req.body;
  return getArticle()
    .readList(searchParams)
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

function getArticleByIdArea (req: Request, res: Response) {
  const { idArticle, area } = req.params;
  return getArticle()
    .readByArea(idArticle, area)
    .then((obj) => res.status(200).send(obj))
    .catch((err) => errorResponse(err, res));
}

function postArticleListByArea (req: Request, res: Response) {
  const { searchParams, area } = req.body;
  return getArticle()
    .readListByArea(searchParams, area)
    .then((list) => res.status(200).send(list));
}

function postArticleArea (req: Request, res: Response) {
  const { id, articleArea } = req.body;
  return getArticle()
    .createArticleArea(id, articleArea)
    .then((list) => res.status(200).send(list));
}

function putArticleArea (req: Request, res: Response) {
  const { articleArea } = req.body;
  return getArticle()
    .updateArticleArea(articleArea)
    .then((list) => res.status(200).send(list));
}

function deleteArticleArea (req: Request, res: Response) {
  const { id, articleArea } = req.params;
  return getArticle()
    .deleteArticleArea(id, articleArea)
    .then((list) => res.status(200).send(list));
}

export {
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
};
