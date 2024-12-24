import { Request, Response } from 'express';
import { getArea } from '../../../data-access';
import { errorResponse } from './utils';

// CRUD

function getAreaById (req: Request, res: Response) {
  const { id } = req.params;
  return getArea()
    .read(id)
    .then((obj) => res.status(200).send(obj))
    .catch((err) => errorResponse(err, res));
}

function postAreaList (req: Request, res: Response) {
  const { skip, limit } = req.body;
  return getArea()
    .readList({ skip, limit })
    .then((list) => res.status(200).send(list));
}

function postArea (req: Request, res: Response) {
  return getArea()
    .create(req)
    .then((objId) => res.status(201).send(objId));
}

function putArea (req: Request, res: Response) {
  return getArea()
    .update(req)
    .then(() => res.status(200))
    .catch((err) => errorResponse(err, res));
}

function deleteArea (req: Request, res: Response) {
  const { id } = req.params;
  return getArea()
    .delete(id)
    .then(() => res.status(200))
    .catch((err) => errorResponse(err, res));
}

export {
  getAreaById,
  postAreaList,
  postArea,
  putArea,
  deleteArea
};
