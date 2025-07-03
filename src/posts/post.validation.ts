import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(2),
  content: z.string().min(1),
  categories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
  youtubeUrls: z.array(z.string()).optional(),
});

export const updatePostSchema = createPostSchema.partial(); 