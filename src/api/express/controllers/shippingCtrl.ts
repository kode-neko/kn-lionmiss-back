import {Request, Response} from 'express';

function getShippingId (req: Request, res: Response) {
  res.status(200).send({created: 'getShippingId'});
}

function postShippingList (req: Request, res: Response) {
  res.status(200).send({created: 'postShippingList'});
}

function postShipping (req: Request, res: Response) {
  res.status(201).send({created: 'postShipping'});
}

function putShipping (req: Request, res: Response) {
  res.status(200).send({created: 'putShipping'});
}

function deleteShipping (req: Request, res: Response) {
  res.status(200).send({created: 'deleteShipping'});
}

export {
  getShippingId,
  postShippingList,
  postShipping,
  putShipping,
  deleteShipping
};
