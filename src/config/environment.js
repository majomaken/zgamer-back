import dotenv from 'dotenv';
import { z } from 'zod';

const envFile = process.env.NODE_ENV === 'development' ? '.env.dev' : '.env';

dotenv.config({
  debug: process.env.NODE_ENV === 'development', // Si esta en desarrollo, se muestren los errores. debug: true
  path: envFile,
});

const environmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'staging']).default('development'),
  PORT: z.coerce.number().int().min(1024).max(65535).default(3000),
  DOMAIN: z.string().default('localhost'),
  MONGO_URI: z.url('La variable MONGO URI debe ser una URL válida'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET debe tener al menos 32 caracteres'),
  JWT_EXPIRES_IN: z.string().min(2).default('1h'),
  TWO_FACTOR_CODE_TTL_MINUTES: z.coerce.number().int().min(1).max(30).default(10),
});

const parsedEnvironment = environmentSchema.safeParse(process.env);

if (!parsedEnvironment.success) {
  console.error('Erro al validar las variables de entorno:');
  console.error(parsedEnvironment.error.flatten().fieldErrors);
  throw new Error('Variables de entorno invalidas. Revisa tu archivo .env');
}

export const env = Object.freeze(parsedEnvironment.data);