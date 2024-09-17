import {Router} from 'express';

const router = Router();

router.get('/:id');
router.post('/list');
router.post('/');
router.put('/:id');
router.delete('/:id');

export default router;
