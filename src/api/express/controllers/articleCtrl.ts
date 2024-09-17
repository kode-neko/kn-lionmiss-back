import {Request, Response} from 'express';

// Article ops

function getArticleId (req: Request, res: Response) {
  res.status(200).send({created: 'getArticleId'});
}

function postArticleList (req: Request, res: Response) {
  res.status(200).send({created: 'postArticleList'});
}

function postArticle (req: Request, res: Response) {
  res.status(201).send({created: 'postArticle'});
}

function putArticle (req: Request, res: Response) {
  res.status(200).send({created: 'putArticle'});
}

function deleteArticle (req: Request, res: Response) {
  res.status(200).send({created: 'deleteArticle'});
}

// Translations per area

function getArticleIdAreId (req: Request, res: Response) {
  res.status(200).send({created: 'getArticleIdAreId'});
}

// Comments related

function getArticleIdCommentId (req: Request, res: Response) {
  res.status(200).send({created: 'getArticleIdCommentId'});
}

function postArticleIdCommentIdList (req: Request, res: Response) {
  res.status(200).send({created: 'postArticleIdCommentIdList'});
}

function postArticleIdCommentId (req: Request, res: Response) {
  res.status(201).send({created: 'postArticleIdCommentId'});
}

function putArticleIdCommentId (req: Request, res: Response) {
  res.status(200).send({created: 'putArticleIdCommentId'});
}

function deleteArticleIdCommentId (req: Request, res: Response) {
  res.status(200).send({created: 'deleteArticleIdCommentId'});
}

export {
  getArticleId,
  postArticleList,
  postArticle,
  putArticle,
  deleteArticle,

  getArticleIdAreId,

  getArticleIdCommentId,
  postArticleIdCommentIdList,
  postArticleIdCommentId,
  putArticleIdCommentId,
  deleteArticleIdCommentId
};
