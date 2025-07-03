import { z } from 'zod';

export const createAdSchema = z.object({
  title: z.string().min(2),
  imageUrl: z.string().url(),
  linkUrl: z.string().url(),
  position: z.enum(['sidebar', 'header', 'footer']),
  isActive: z.boolean().optional(),
});

export const updateAdSchema = createAdSchema.partial(); 