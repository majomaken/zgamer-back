import { z } from 'zod';

const statusValues = ['draft', 'published', 'archived'];

export const postCreateSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  content: z.string().min(10, 'El contenido debe tener al menos 10 caracteres'),
  status: z.enum(statusValues).default('draft'),
  coverImage: z.string().optional(),
});

export const postUpdateSchema = postCreateSchema.partial();