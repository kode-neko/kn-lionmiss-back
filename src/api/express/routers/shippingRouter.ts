import { Router } from 'express';
import {
  getShippingById,
  postShippingList,
  postShipping,
  putShipping,
  deleteShipping
} from '../controllers';
import {
  attrValidMidCreate,
  bodyParamValidMidCreate,
  idBodyValidMid,
  idParamValidMid,
  searchParamsBodyValidMid
} from '../middlewares/validationsMid';

const router = Router();

// RUD Shipping

/**
 * @swagger
 * /shipping/{id}:
 *   get:
 *     summary: Retrieve an Shipping by ID
 *     tags: [Shipping]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The shipping ID
 *     responses:
 *       200:
 *         description: Shipping found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shipping'
 *       404:
 *         description: Shipping not found
 */
router.get(
  '/:id',
  idParamValidMid(),
  getShippingById
);

/**
 * @swagger
 * /shipping/list:
 *   post:
 *     summary: Retrieve a list of Shippings
 *     tags: [Shipping]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/SearchParams'
 *     responses:
 *       200:
 *         description: Shipping found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShippingList'
 *       404:
 *         description: Shipping not found
 */
router.post(
  '/list',
  searchParamsBodyValidMid,
  postShippingList
);

/**
 * @swagger
 * /shipping:
 *   put:
 *     summary: Update an Shipping
 *     tags: [Shipping]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/Shipping'
 *     responses:
 *       200:
 *         description: Shipping found
 *       404:
 *         description: Shipping not found
 */
router.put(
  '/',
  idBodyValidMid,
  bodyParamValidMidCreate('shipping'),
  putShipping
);

/**
 * @swagger
 * /shipping/{id}:
 *   delete:
 *     summary: Delete an Shipping by ID
 *     tags: [Shipping]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The shipping ID
 *     responses:
 *       200:
 *         description: Shipping found
 *       404:
 *         description: Shipping not found
 */
router.delete(
  '/:id',
  idParamValidMid(),
  deleteShipping
);

// Create from Cart

/**
 * @swagger
 * /shipping/cart:
 *   get:
 *     summary: Retrieve an Shipping by ID
 *     tags: [Shipping]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The Area ID or name
 *                 example: "---"
 *               shipping:
 *                  $ref: '#/components/schemas/SearchParams'
 *     responses:
 *       201:
 *         description: Shipping found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shipping'
 *       404:
 *         description: ArticleArea not found
 */
router.post(
  '/cart',
  attrValidMidCreate('userId', 'body'),
  bodyParamValidMidCreate('shipping'),
  postShipping
);

export default router;
