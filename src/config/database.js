import mongoose from 'mongoose';
import { env } from './environment.js';
import { logger } from '../utils/logger.js';

class Database {
  constructor() {
    this.connection = null;
  }


  async connect() {
    if (this.connection) {
      return this.connection;
    }

    try {
      mongoose.set('strictQuery', true);

      this.connection = await mongoose.connect(env.MONGO_URI, {
        autoIndex: env.NODE_ENV === 'development',
      });

      logger.info('✅ Conectado a MongoDB');
      return this.connection;
    } catch (error) {
      logger.error('No se pudo conectar a la base de datos', { error: error.message });
      throw error;
    }
  }
}

export const database = new Database();