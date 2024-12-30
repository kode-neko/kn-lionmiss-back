/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { IdRequiredDbException, NotFoundDbException } from '../../../data-access';

function errorResponse (err: Error, res: Response): Response<any, Record<string, any>> {
  let code: number = 400;
  let msg: string = 'Undefined error';
  if (err instanceof NotFoundDbException) {
    code = 404;
    msg = 'Resource not found';
  } else if (err instanceof IdRequiredDbException) {
    code = 401;
    msg = 'The resource needs its identification field';
  }
  return res.status(code).send(msg);
}

export { errorResponse };
