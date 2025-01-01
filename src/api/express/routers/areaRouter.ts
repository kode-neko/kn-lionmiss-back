import { Router } from 'express';
import {
  getAreaById,
  postAreaList,
  postArea,
  putArea,
  deleteArea
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
 * /area/{id}:
 *   get:
 *     summary: Retrieve an Area by ID or name
 *     tags: [Area]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The area ID
 *     responses:
 *       200:
 *         description: Area found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Area'
 *       404:
 *         description: Area not found
 */
router.get(
  '/:id',
  idParamValidMid(),
  getAreaById
);

/**
 * @swagger
 * /area/list:
 *   post:
 *     summary: Retrieve a list of Areas
 *     tags: [Area]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/SearchParams'
 *     responses:
 *       200:
 *         description: Area found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AreaList'
 *       404:
 *         description: Area not found
 */
router.post(
  '/list',
  searchParamsBodyValidMid,
  postAreaList
);

/**
 * @swagger
 * /area:
 *   post:
 *     summary: Create an Area
 *     tags: [Area]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/Area'
 *     responses:
 *       200:
 *         description: Area found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Area'
 *       404:
 *         description: Area not found
 */
router.post(
  '/',
  bodyValidMidCreate('area'),
  postArea
);

/**
 * @swagger
 * /area:
 *   put:
 *     summary: Update an area
 *     tags: [Area]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/Area'
 *     responses:
 *       200:
 *         description: Area found
 *       404:
 *         description: Area not found
 */
router.put(
  '/',
  idBodyValidMid(),
  bodyParamValidMidCreate('area'),
  putArea
);

/**
 * @swagger
 * /area/{id}:
 *   delete:
 *     summary: Delete an Area by ID or name
 *     tags: [Area]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The area ID
 *     responses:
 *       200:
 *         description: Area found
 *       404:
 *         description: Area not found
 */
router.delete(
  '/:id',
  idParamValidMid(),
  deleteArea
);

export default router;
