import { Router } from 'express';
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from './category.controller';
import { authMiddleware } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createCategorySchema, updateCategorySchema } from './category.validation';

const router = Router();

router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.post('/', authMiddleware, validate(createCategorySchema), createCategory); // admin/editor
router.put('/:id', authMiddleware, validate(updateCategorySchema), updateCategory); // admin only
router.delete('/:id', authMiddleware, deleteCategory); // admin only

export default router; 