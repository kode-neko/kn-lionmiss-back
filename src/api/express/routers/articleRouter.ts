import {Router} from 'express';

const router = Router();

// Article info
router.get('/:id');
router.post('/list');
router.post('/');
router.get('/');
router.delete('/');

// Translations for area
router.get('/:id/area/:id');

// Comments related
router.get('/:id/comment/:id');
router.post('/:id/comment/:id/list');

export default router;
