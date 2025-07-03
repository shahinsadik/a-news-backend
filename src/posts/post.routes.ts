import { Router } from 'express';
import { createPost, getPosts, getPostById, updatePost, deletePost } from './post.controller';
import { authMiddleware } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createPostSchema, updatePostSchema } from './post.validation';

const router = Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', authMiddleware, validate(createPostSchema), createPost);
router.put('/:id', authMiddleware, validate(updatePostSchema), updatePost);
router.delete('/:id', authMiddleware, deletePost);

export default router; 