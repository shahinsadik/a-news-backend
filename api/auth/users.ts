import { VercelRequest, VercelResponse } from '@vercel/node';
import { User } from '../../src/users/user.model';
import { connectDB } from '../../src/config/db';
import jwt from 'jsonwebtoken';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await connectDB();

  if (req.method === 'POST') {
    // Check for Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      // @ts-ignore
      if (decoded.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
      }
      const { name, email, password } = req.body;
      const exists = await User.findOne({ email });
      if (exists) return res.status(400).json({ error: 'Email already in use' });
      const editor = new User({ name, email, password, role: 'editor' });
      await editor.save();
      res.status(201).json({ message: 'Editor created', editor: { id: editor._id, name: editor.name, email: editor.email, role: editor.role } });
    } catch (error) {
      res.status(401).json({ error: 'Invalid or expired token' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
} 