import { VercelRequest, VercelResponse } from '@vercel/node';
import { Post } from '../src/posts/post.model';
import { connectDB } from '../src/config/db';
import mongoose from 'mongoose';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const posts = await Post.find()
        .populate('author', 'name email role')
        .populate('categories', 'name');
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, content, categories, tags, images, youtubeUrls, author } = req.body;
      const post = new Post({
        title,
        content,
        categories,
        tags,
        images,
        youtubeUrls,
        author, // In a real app, get this from auth middleware
      });
      await post.save();
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create post' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
} 