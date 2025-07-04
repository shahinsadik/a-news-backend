import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectDB } from '../src/config/db';
import { Post } from '../src/posts/post.model';
import '../src/users/user.model';
import '../src/categories/category.model';

function getRawBody(req: VercelRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      resolve(data);
    });
    req.on('error', err => {
      reject(err);
    });
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const posts = await Post.find()
        .populate('author', 'name email role')
        .populate('categories', 'name');
      res.status(200).json(posts);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message || 'Failed to fetch posts' });
    }
  } else if (req.method === 'POST') {
    try {
      let body = req.body;
      if (!body || Object.keys(body).length === 0) {
        const raw = await getRawBody(req);
        body = JSON.parse(raw);
      }
      const { title, content, categories, tags, images, youtubeUrls, author } = body;
      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
      }
      // In production, extract author from JWT token
      const post = new Post({
        title,
        content,
        categories,
        tags,
        images,
        youtubeUrls,
        author // Should be set from authentication in production
      });
      await post.save();
      res.status(201).json(post);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message || 'Failed to create post' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
} 