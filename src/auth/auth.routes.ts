import { Router } from 'express';
import { login, addEditor } from './auth.controller';
import { authMiddleware } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { loginSchema, addEditorSchema } from './auth.validation';

const router = Router();

router.post('/login', validate(loginSchema), login);
router.post('/users', authMiddleware, validate(addEditorSchema), addEditor); // Only admin can add editor

export default router; 