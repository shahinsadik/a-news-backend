import { Router } from 'express';
import { uploadImages } from './upload.controller';
import { authMiddleware } from '../middleware/auth';
import { upload } from './multer';

const router = Router();

router.post('/images', authMiddleware, upload.array('images', 10), uploadImages);

export default router; 