import { Request, Response } from "express";

function getCart(req: Request, res: Response) {
  res.status(200).send({created: 'getCart'});
}

function postCart(req: Request, res: Response) {
  res.status(201).send({created: 'postCart'});
}

function putCart(req: Request, res: Response) {
  res.status(200).send({created: 'putCart'});
}

export {
  getCart,
  postCart,
  putCart
}