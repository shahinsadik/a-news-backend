import { Request, Response } from 'express';
import { Post } from './post.model';
import { AuthRequest } from '../middleware/auth';

export const createPost = async (req: AuthRequest, res: Response) => {
  const { title, content, categories, tags, images, youtubeUrls } = req.body;
  const post = new Post({
    title,
    content,
    categories,
    tags,
    images,
    youtubeUrls,
    author: req.user!.userId,
  });
  await post.save();
  res.status(201).json(post);
};

export const getPosts = async (req: Request, res: Response) => {
  const posts = await Post.find().populate('author', 'name email role').populate('categories', 'name');
  res.json(posts);
};

export const getPostById = async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.id).populate('author', 'name email role').populate('categories', 'name');
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
};

export const updatePost = async (req: AuthRequest, res: Response) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  // Only admin or owner (editor) can update
  if (req.user!.role !== 'admin' && post.author.toString() !== req.user!.userId) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  Object.assign(post, req.body);
  await post.save();
  res.json(post);
};

export const deletePost = async (req: AuthRequest, res: Response) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  // Only admin or owner (editor) can delete
  if (req.user!.role !== 'admin' && post.author.toString() !== req.user!.userId) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  await post.deleteOne();
  res.json({ message: 'Post deleted' });
}; 