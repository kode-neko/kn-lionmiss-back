import { Request, Response } from 'express';
import { getShipping } from '../../../data-access';
import { errorResponse } from './utils';

// RUD Shipping

function getShippingId (req: Request, res: Response) {
  const { id } = req.params;
  return getShipping()
    .read(id)
    .then((obj) => res.status(200).send(obj))
    .catch((err) => errorResponse(err, res));
}

function postShippingList (req: Request, res: Response) {
  const { searchParams } = req.body;
  return getShipping()
    .readList(searchParams)
    .then((list) => res.status(200).send(list));
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

// Create from Cart

function postShipping (req: Request, res: Response) {
  const { cartId } = req.params;
  return getShipping()
    .createFromCart(cartId)
    .then((objId) => res.status(201).send(objId));
}

export {
  getShippingId,
  postShippingList,
  postShipping,
  putShipping,
  deleteShipping
};
