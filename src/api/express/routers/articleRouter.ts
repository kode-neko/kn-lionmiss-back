import { Router } from 'express';
import {
  getArticleById,
  postArticleList,
  postArticle,
  putArticle,
  deleteArticle,
  getArticleByIdArea,
  postArticleListByArea,
  postArticleArea,
  putArticleArea,
  deleteArticleArea
} from '../controllers';
import {
  attrValidMidCreate,
  bodyParamValidMidCreate,
  bodyValidMidCreate,
  idBodyValidMid,
  idParamValidMid,
  searchParamsBodyParamValidMid,
  searchParamsBodyValidMid
} from '../middlewares/validationsMid';

const router = Router();

// CRUD

/**
 * @swagger
 * /srticle/{id}:
 *   get:
 *     summary: Retrieve an Article by ID
 *     tags: [Article]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Article ID
 *     responses:
 *       200:
 *         description: Article found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article not found
 */
router.get(
  '/:id',
  idParamValidMid(),
  getArticleById
);

/**
 * @swagger
 * /article/list:
 *   post:
 *     summary: Retrieve a list of Articles
 *     tags: [Article]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/SearchParams'
 *     responses:
 *       200:
 *         description: Article found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticleList'
 *       404:
 *         description: Article not found
 */
router.post(
  '/list',
  searchParamsBodyValidMid,
  postArticleList
);

/**
 * @swagger
 * /article/area:
 *   post:
 *     summary: Create an Article
 *     tags: [Article]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/Article'
 *     responses:
 *       200:
 *         description: Article found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article not found
 */
router.post(
  '/',
  bodyValidMidCreate('article'),
  postArticle
);

/**
 * @swagger
 * /article/area:
 *   put:
 *     summary: Update an Article
 *     tags: [Article]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/Article'
 *     responses:
 *       200:
 *         description: Article found
 *       404:
 *         description: Article not found
 */
router.put(
  '/',
  idBodyValidMid,
  bodyParamValidMidCreate('article'),
  putArticle
);

/**
 * @swagger
 * /article/area/{id}:
 *   delete:
 *     summary: Delete an Article by ID or name
 *     tags: [Article]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Article ID
 *     responses:
 *       200:
 *         description: Article found
 *       404:
 *         description: Article not found
 */
router.delete(
  '/:id',
  idParamValidMid(),
  deleteArticle
);

// Translations per area

/**
 * @swagger
 * /article/{idArticle}/area/{area}:
 *   get:
 *     summary: Retrieve an Article by ID
 *     tags: [Article]
 *     parameters:
 *       - in: path
 *         name: idArticle
 *         required: true
 *         schema:
 *           type: string
 *         description: The Article ID
 *       - in: path
 *         name: area
 *         required: true
 *         schema:
 *           type: string
 *         description: The Area ID or name
 *     responses:
 *       200:
 *         description: ArticleArea found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticleArea'
 *       404:
 *         description: ArticleArea not found
 */
router.get(
  '/:idArticle/area/:area',
  attrValidMidCreate('idArticle'),
  attrValidMidCreate('area'),
  getArticleByIdArea
);

/**
 * @swagger
 * /article/area/list:
 *   post:
 *     summary: Retrieve a list of ArticleArea
 *     tags: [Article]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               searchParams:
 *                  $ref: '#/components/schemas/SearchParams'
 *               area:
 *                 type: string
 *                 description: The Area ID or name
 *                 example: "---"
 *     responses:
 *       200:
 *         description: Article found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticleList'
 *       404:
 *         description: Article not found
 */
router.post(
  '/area/list',
  searchParamsBodyParamValidMid,
  bodyParamValidMidCreate('area'),
  postArticleListByArea
);

/**
 * @swagger
 * /article/area:
 *   post:
 *     summary: Retrieve a list of ArticleArea
 *     tags: [Article]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idArticle:
 *                 type: string
 *                 description: The Article ID
 *                 example: "---"
 *               articleArea:
 *                  $ref: '#/components/schemas/ArticleArea'
 *     responses:
 *       201:
 *         description: Article found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article not found
 */
router.post(
  '/area',
  attrValidMidCreate('idArticle', 'body'),
  bodyParamValidMidCreate('articleArea'),
  postArticleArea
);

/**
 * @swagger
 * /article/area:
 *   put:
 *     summary: Retrieve a list of ArticleArea
 *     tags: [Article]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idArticle:
 *                 type: string
 *                 description: The Article ID
 *                 example: "---"
 *               articleArea:
 *                  $ref: '#/components/schemas/ArticleArea'
 *     responses:
 *       200:
 *         description: Article found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article not found
 */
router.put(
  '/area',
  attrValidMidCreate('idArticle', 'body'),
  bodyParamValidMidCreate('articleArea'),
  putArticleArea
);

/**
 * @swagger
 * /article/{idArticle}/area/{area}:
 *   delete:
 *     summary: Retrieve an Article by ID
 *     tags: [Article]
 *     parameters:
 *       - in: path
 *         name: idArticle
 *         required: true
 *         schema:
 *           type: string
 *         description: The Article ID
 *       - in: path
 *         name: area
 *         required: true
 *         schema:
 *           type: string
 *         description: The Area ID or name
 *     responses:
 *       200:
 *         description: ArticleArea found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticleArea'
 *       404:
 *         description: ArticleArea not found
 */
router.delete(
  '/:idArticle/area/:area',
  attrValidMidCreate('idArticle', 'body'),
  bodyParamValidMidCreate('articleArea'),
  deleteArticleArea
);

export default router;
