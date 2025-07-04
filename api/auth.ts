import { VercelRequest, VercelResponse } from '@vercel/node';
import { User } from '../src/users/user.model';
import { connectDB } from '../src/config/db';
import jwt from 'jsonwebtoken';
import { Category } from '../src/categories/category.model';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await connectDB();

  if (req.method === 'POST') {
    // Login
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
} 