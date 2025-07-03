import { Request, Response } from 'express';
import { Category } from './category.model';
import { AuthRequest } from '../middleware/auth';

export const createCategory = async (req: AuthRequest, res: Response) => {
  const { name } = req.body;
  const exists = await Category.findOne({ name });
  if (exists) return res.status(400).json({ error: 'Category already exists' });
  const category = new Category({ name });
  await category.save();
  res.status(201).json(category);
};

export const getCategories = async (req: Request, res: Response) => {
  const categories = await Category.find();
  res.json(categories);
};

export const getCategoryById = async (req: Request, res: Response) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ error: 'Category not found' });
  res.json(category);
};

export const updateCategory = async (req: AuthRequest, res: Response) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ error: 'Category not found' });
  if (req.body.name) category.name = req.body.name;
  await category.save();
  res.json(category);
};

export const deleteCategory = async (req: AuthRequest, res: Response) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ error: 'Category not found' });
  await category.deleteOne();
  res.json({ message: 'Category deleted' });
}; 