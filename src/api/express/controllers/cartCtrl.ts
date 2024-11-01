import { Request, Response } from 'express';

function getCart (req: Request, res: Response) {
  res.status(200).send({ created: 'getCart' });
}

function postCart (req: Request, res: Response) {
  res.status(200).send({ created: 'getCart' });
}

function postCartLine (req: Request, res: Response) {
  res.status(201).send({ created: 'postCartLine' });
}

function putCartLine (req: Request, res: Response) {
  res.status(200).send({ created: 'putCartLine' });
}

function deleteCartLine (req: Request, res: Response) {
  res.status(200).send({ created: 'deleteCartLine' });
}

export {
  getCart,
  postCart,
  postCartLine,
  putCartLine,
  deleteCartLine
};
