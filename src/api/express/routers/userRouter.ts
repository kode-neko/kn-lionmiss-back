import {Router} from 'express';

const router = Router();

router.get('/:id');
router.post('/login');
router.post('/logout');
router.get('/:id/cart');

export default router;
