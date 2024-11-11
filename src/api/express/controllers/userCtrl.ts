import { Request, Response } from 'express';
import { getUser } from '../../../data-access';
import { errorResponse } from './utils';

function getUserId (req: Request, res: Response) {
  const { username } = req.params;
  return getUser()
    .read(username)
    .then((obj) => res.status(200).send(obj))
    .catch((err) => errorResponse(err, res));
}

function postUserLogin (req: Request, res: Response) {
  return res.status(201).send({ created: 'postUserLogin' });
}

function postUserLogout (req: Request, res: Response) {
  return res.status(200).send({ created: 'postUserLogout' });
}

export {
  getUserId,
  postUserLogin,
  postUserLogout
};
