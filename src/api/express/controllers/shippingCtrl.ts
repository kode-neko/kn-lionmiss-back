import { Request, Response } from 'express';
import { getShipping } from '../../../data-access';
import { errorResponse } from './utils';

// RUD Shipping

function getShippingById (req: Request, res: Response) {
  const { id } = req.params;
  return getShipping()
    .read(id)
    .then((obj) => res.status(200).send(obj))
    .catch((err) => errorResponse(err, res));
}

function postShippingList (req: Request, res: Response) {
  return getShipping()
    .readList(req.body)
    .then((list) => res.status(200).send(list));
}

function putShipping (req: Request, res: Response) {
  return getShipping()
    .update(req.body)
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

// Create from Cart

function postShipping (req: Request, res: Response) {
  const { userId, shipping } = req.body;
  return getShipping()
    .createFromUserCart(userId, shipping)
    .then((objId) => res.status(201).send(objId));
}

export {
  getShippingById,
  postShippingList,
  postShipping,
  putShipping,
  deleteShipping
};
