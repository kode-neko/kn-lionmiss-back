import {
  ErrorRequestHandler,
  NextFunction, Request, Response
} from 'express';

function errorMid (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).send({ error: err });
}

export { errorMid };
