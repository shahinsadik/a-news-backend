import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectDB } from '../../src/config/db';
import { Post } from '../../src/posts/post.model';
import '../../src/users/user.model';
import '../../src/categories/category.model';

function getRawBody(req: VercelRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => { resolve(data); });
    req.on('error', err => { reject(err); });
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await connectDB();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const post = await Post.findById(id)
        .populate('author', 'name email role')
        .populate('categories', 'name');
      if (!post) return res.status(404).json({ error: 'Post not found' });
      res.status(200).json(post);
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Failed to fetch post' });
    }
  } else if (req.method === 'PUT') {
    try {
      let body = req.body;
      if (!body || Object.keys(body).length === 0) {
        const raw = await getRawBody(req);
        body = JSON.parse(raw);
      }
      const post = await Post.findById(id);
      if (!post) return res.status(404).json({ error: 'Post not found' });
      Object.assign(post, body);
      await post.save();
      res.status(200).json(post);
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Failed to update post' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const post = await Post.findById(id);
      if (!post) return res.status(404).json({ error: 'Post not found' });
      await post.deleteOne();
      res.status(200).json({ message: 'Post deleted' });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Failed to delete post' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
} 