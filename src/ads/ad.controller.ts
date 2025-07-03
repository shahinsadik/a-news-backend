import { Request, Response } from 'express';
import { Ad } from './ad.model';
import { AuthRequest } from '../middleware/auth';

export const createAd = async (req: AuthRequest, res: Response) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const { title, imageUrl, linkUrl, position, isActive } = req.body;
  const ad = new Ad({ title, imageUrl, linkUrl, position, isActive });
  await ad.save();
  res.status(201).json(ad);
};

export const getAds = async (req: Request, res: Response) => {
  const ads = await Ad.find();
  res.json(ads);
};

export const getAdById = async (req: Request, res: Response) => {
  const ad = await Ad.findById(req.params.id);
  if (!ad) return res.status(404).json({ error: 'Ad not found' });
  res.json(ad);
};

export const updateAd = async (req: AuthRequest, res: Response) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const ad = await Ad.findById(req.params.id);
  if (!ad) return res.status(404).json({ error: 'Ad not found' });
  Object.assign(ad, req.body);
  await ad.save();
  res.json(ad);
};

export const deleteAd = async (req: AuthRequest, res: Response) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  const ad = await Ad.findById(req.params.id);
  if (!ad) return res.status(404).json({ error: 'Ad not found' });
  await ad.deleteOne();
  res.json({ message: 'Ad deleted' });
}; 