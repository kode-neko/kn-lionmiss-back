import { User } from '@model/index';
import { Request, Response } from 'express';
import { getUser } from '../../../data-access';
import { errorResponse } from './utils';
import { compare } from 'bcrypt';
import { createTokenJwt } from '../../../utils';

// Factories

function userLogoutSession (req: Request) {
  req.session.destroy;
  return Promise.resolve({ logout: 'Session destroyed' });
}

function userLogoutJwt () {
  // TODO - Blacklist tokens
  return Promise.resolve({ logout: 'Token revoked' });
}

function factoryUserLogout (req: Request, res: Response, logoutFunc: (req: Request) => Promise<Record<string, string | boolean>>) {
  return logoutFunc(req)
    .then(() => res.status(200).send({ logout: true }));
}

async function userLoginJwt (_: Request, user: User) {
  const token = await createTokenJwt(user);
  return { token };
}

function userLoginSession (req: Request, user: User) {
  return Promise.resolve({
    loggedIn: true,
    userName: user.userName
  });
}

function factoryUserLogin (req: Request, res: Response, loginFunc: (req: Request, user: User) => Promise<Record<string, string | boolean>>) {
  const { userName, pass } = req.params;
  getUser()
    .read(userName)
    .then((user) => {
      if (!compare(pass, `${user.salt}${user.hash}`)) throw new Error('User not found');
      return loginFunc(req, user);
    })
    .then((info) => res.status(201).send(info))
    .catch((err) => errorResponse(err, res));
}

// Controllers

function getUserId (req: Request, res: Response) {
  const { username } = req.params;
  return getUser()
    .read(username)
    .then((obj) => res.status(200).send(obj))
    .catch((err) => errorResponse(err, res));
}

function postUserLoginJwt (req: Request, res: Response) {
  return factoryUserLogin(req, res, userLoginSession);
}

function postUserLoginSession (req: Request, res: Response) {
  return factoryUserLogin(req, res, userLoginJwt);
}

function portUserLogoutSession (req: Request, res: Response) {
  return factoryUserLogout(req, res, userLogoutSession);
}

function postUserLogoutJwt (req: Request, res: Response) {
  return factoryUserLogout(req, res, userLogoutJwt);
}

export {
  getUserId,
  postUserLoginJwt,
  postUserLoginSession,
  portUserLogoutSession,
  postUserLogoutJwt
};
