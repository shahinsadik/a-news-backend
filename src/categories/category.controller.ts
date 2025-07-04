import { Request, Response } from 'express';
import { Category } from './category.model';
import { AuthRequest } from '../middleware/auth';

export const createCategory = async (req: AuthRequest, res: Response) => {
  const { name, slug } = req.body;
  // Always generate a slug if not provided or empty
  let finalSlug = slug && slug.trim() ? slug.trim() : name
    .toLowerCase()
    .replace(/[^a-z0-9\u0980-\u09FF]+/g, '-')
    .replace(/(^-|-$)+/g, '');
  if (!finalSlug) {
    return res.status(400).json({ error: 'Slug cannot be empty' });
  }
  const exists = await Category.findOne({ slug: finalSlug });
  if (exists) return res.status(400).json({ error: 'Category with this slug already exists' });
  console.log('Saving category:', { name, slug: finalSlug });
  const category = new Category({ name, slug: finalSlug });
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
  if (req.body.slug) {
    const newSlug = req.body.slug.trim();
    if (!newSlug) return res.status(400).json({ error: 'Slug cannot be empty' });
    // Check for duplicate slug
    const exists = await Category.findOne({ slug: newSlug, _id: { $ne: category._id } });
    if (exists) return res.status(400).json({ error: 'Category with this slug already exists' });
    category.slug = newSlug;
  }
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