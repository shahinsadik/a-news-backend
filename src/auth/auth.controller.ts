import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../users/user.model';
import { AuthRequest } from '../middleware/auth';

export const login = async (req: Request, res: Response) => {
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
};

export const addEditor = async (req: AuthRequest, res: Response) => {
  // Only admin can add editor
  if (req.user?.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error: 'Email already in use' });
  const editor = new User({ name, email, password, role: 'editor' });
  await editor.save();
  res.status(201).json({ message: 'Editor created', editor: { id: editor._id, name: editor.name, email: editor.email, role: editor.role } });
}; 