import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectDB } from '../src/config/db';
// import your upload logic as needed

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await connectDB();

  if (req.method === 'POST') {
    // File upload logic would go here
    // Note: Vercel serverless has limitations for file uploads (no streaming, only small files)
    res.status(501).json({ error: 'File upload not implemented in serverless function.' });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
} 