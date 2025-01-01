import { Router } from 'express';
import {
  getCommentById,
  postCommentList,
  postComment,
  putComment,
  deleteComment
} from '../controllers';
import {
  bodyParamValidMidCreate,
  bodyValidMidCreate,
  idBodyValidMid,
  idParamValidMid,
  searchParamsBodyValidMid
} from '../middlewares/validationsMid';

const router = Router();

// CRUD

/**
 * @swagger
 * /comment/{id}:
 *   get:
 *     summary: Retrieve an Comment by ID
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: Comment found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comment not found
 */
router.get(
  '/:id',
  idParamValidMid(),
  getCommentById
);

/**
 * @swagger
 * /comment/list:
 *   post:
 *     summary: Retrieve a list of Comments
 *     tags: [Comment]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/SearchParams'
 *     responses:
 *       200:
 *         description: Comment found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentList'
 *       404:
 *         description: Comment not found
 */
router.post(
  '/list',
  searchParamsBodyValidMid,
  postCommentList
);

/**
 * @swagger
 * /comment:
 *   post:
 *     summary: Create an Comment
 *     tags: [Comment]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: Comment found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comment not found
 */
router.post(
  '/',
  bodyValidMidCreate('comment'),
  postComment
);

/**
 * @swagger
 * /comment:
 *   put:
 *     summary: Update an Comment
 *     tags: [Comment]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: Comment found
 *       404:
 *         description: Comment not found
 */
router.put(
  '/',
  idBodyValidMid,
  bodyParamValidMidCreate('comment'),
  putComment
);

/**
 * @swagger
 * /comment/{id}:
 *   delete:
 *     summary: Delete an Comment by ID
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: Comment found
 *       404:
 *         description: Comment not found
 */
router.delete(
  '/:id',
  idParamValidMid(),
  deleteComment
);

export default router;
