import { Router } from 'express';
import { createAd, getAds, getAdById, updateAd, deleteAd } from './ad.controller';
import { authMiddleware } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createAdSchema, updateAdSchema } from './ad.validation';

const router = Router();

router.get('/', getAds);
router.get('/:id', getAdById);
router.post('/', authMiddleware, validate(createAdSchema), createAd); // admin only
router.put('/:id', authMiddleware, validate(updateAdSchema), updateAd); // admin only
router.delete('/:id', authMiddleware, deleteAd); // admin only

export default router; 