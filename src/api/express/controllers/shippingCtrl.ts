import { Request, Response } from 'express';
import { getShipping } from '../../../data-access';
import { errorResponse } from './utils';

function getShippingId (req: Request, res: Response) {
  const { id } = req.params;
  return getShipping()
    .read(id)
    .then((obj) => res.status(200).send(obj))
    .catch((err) => errorResponse(err, res));
}

function postShippingList (req: Request, res: Response) {
  const { skip, limit } = req.body;
  return getShipping()
    .readList({ skip, limit })
    .then((list) => res.status(200).send(list));
}

function postShipping (req: Request, res: Response) {
  return getShipping()
    .create(req)
    .then((objId) => res.status(201).send(objId));
}

function putShipping (req: Request, res: Response) {
  return getShipping()
    .update(req)
    .then(() => res.status(200))
    .catch((err) => errorResponse(err, res));
}

function deleteShipping (req: Request, res: Response) {
  const { id } = req.params;
  return getShipping()
    .delete(id)
    .then(() => res.status(200))
    .catch((err) => errorResponse(err, res));
}

export {
  getShippingId,
  postShippingList,
  postShipping,
  putShipping,
  deleteShipping
};
