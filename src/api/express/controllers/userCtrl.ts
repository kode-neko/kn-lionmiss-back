import {Request, Response} from 'express';

function getUserId (req: Request, res: Response) {
  res.status(200).send({created: 'getUserId'});
}

function postUserLogin (req: Request, res: Response) {
  res.status(201).send({created: 'postUserLogin'});
}

function postUserLogout (req: Request, res: Response) {
  res.status(200).send({created: 'postUserLogout'});
}

function getUserIdCart (req: Request, res: Response) {
  res.status(200).send({created: 'getUserIdCart'});
}

export {
  getUserId,
  postUserLogin,
  postUserLogout,
  getUserIdCart
};
