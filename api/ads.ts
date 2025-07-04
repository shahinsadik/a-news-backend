import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectDB } from '../src/config/db';
import { Ad } from '../src/ads/ad.model';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const ads = await Ad.find();
      res.status(200).json(ads);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch ads' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, image, link } = req.body;
      const ad = new Ad({ title, image, link });
      await ad.save();
      res.status(201).json(ad);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create ad' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
} 