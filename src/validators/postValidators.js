import { union, z } from 'zod';

const statusValues = ['draft', 'published', 'archived'];

export const postCreateSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  summary: z.string().optional(),
  excerpt: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  content: z.string().min(10, 'El contenido debe tener al menos 10 caracteres'),
  images: z
    .union([z.array(z.string()), z.string()])
    .optional()
    .default([])
    .transform((val) => {
      if (typeof val === 'string') {
        try {
          return JSON.parse(val);
        } catch {
          return [val];
        }
      }
      return Array.isArray(val) ? val : []
    }),
  status: z.enum(statusValues).default('draft'),
  coverImage: z.string().optional(),
});

export const postUpdateSchema = postCreateSchema.partial();