import { Request, Response } from 'express';
import { getComment } from '../../../data-access';
import { errorResponse } from './utils';

// CRUD

function getCommentById (req: Request, res: Response) {
  const { id } = req.params;
  return getComment()
    .read(id)
    .then((obj) => res.status(200).send(obj))
    .catch((err) => errorResponse(err, res));
}

function postCommentList (req: Request, res: Response) {
  return getComment()
    .readList(req.body)
    .then((list) => res.status(200).send(list));
}

function postComment (req: Request, res: Response) {
  return getComment()
    .create(req.body)
    .then((objId) => res.status(201).send(objId));
}

function putComment (req: Request, res: Response) {
  return getComment()
    .update(req.body)
    .then(() => res.status(200))
    .catch((err) => errorResponse(err, res));
}

function deleteComment (req: Request, res: Response) {
  const { id } = req.params;
  return getComment()
    .delete(id)
    .then(() => res.status(200))
    .catch((err) => errorResponse(err, res));
}

export {
  getCommentById,
  postCommentList,
  postComment,
  putComment,
  deleteComment
};
