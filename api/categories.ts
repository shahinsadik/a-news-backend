import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectDB } from '../src/config/db';
import { Category } from '../src/categories/category.model';

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
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message || 'Failed to fetch categories' });
    }
  } else if (req.method === 'POST') {
    try {
      let body = req.body;
      if (!body || Object.keys(body).length === 0) {
        const raw = await getRawBody(req);
        body = JSON.parse(raw);
      }
      const { name, slug: providedSlug } = body;
      let slug = providedSlug;
      if (!slug || slug.trim() === '') {
        if (!name || name.trim() === '') {
          return res.status(400).json({ error: 'Name is required' });
        }
        slug = name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
      }
      if (!slug || slug.trim() === '') {
        return res.status(400).json({ error: 'Slug is required' });
      }
      // Detailed logging for debugging
     
      const category = new Category({ name, slug });
      await category.save();
      res.status(201).json(category);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message || 'Failed to create category' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
} 