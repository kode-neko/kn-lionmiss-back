import { Request, Response } from 'express';
import { getCart } from '../../../data-access';
import { errorResponse } from './utils';

function getCartId (req: Request, res: Response) {
  const { id } = req.params;
  return getCart()
    .read(id)
    .then((obj) => res.status(200).send(obj))
    .catch((err) => errorResponse(err, res));
}

function postCartNewUser (req: Request, res: Response) {
  const { username } = req.params;
  return getCart()
    .newCartUser(username)
    .then((obj) => res.status(200).send(obj))
    .catch((err) => errorResponse(err, res));
}

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
  const { idCart, numLine } = req.body;
  return getCart()
    .deleteLine(idCart, numLine)
    .then((obj) => res.status(200).send(obj))
    .catch((err) => errorResponse(err, res));
}

export {
  getCartId,
  postCartNewUser,
  postCartLine,
  putCartLine,
  deleteCartLine
};
