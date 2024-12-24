import { Request, Response } from 'express';
import { getCart } from '../../../data-access';
import { errorResponse } from './utils';

// R Cart

function getCartById (req: Request, res: Response) {
  const { id } = req.params;
  return getCart()
    .read(id)
    .then((obj) => res.status(200).send(obj))
    .catch((err) => errorResponse(err, res));
}

// CartLine

function postCartLine (req: Request, res: Response) {
  const { idCart, cartLine } = req.body;
  return getCart()
    .createLine(idCart, cartLine)
    .then((list) => res.status(200).send(list))
    .catch((err) => errorResponse(err, res));
}

function putCartLine (req: Request, res: Response) {
  const { idCart, cartLine } = req.body;
  return getCart()
    .updateLine(idCart, cartLine)
    .then(() => res.status(200))
    .catch((err) => errorResponse(err, res));
}

function deleteCartLine (req: Request, res: Response) {
  const { idCart, orderLine } = req.body;
  return getCart()
    .deleteLine(idCart, orderLine)
    .then((obj) => res.status(200).send(obj))
    .catch((err) => errorResponse(err, res));
}

export {
  getCartById,
  postCartLine,
  putCartLine,
  deleteCartLine
};
