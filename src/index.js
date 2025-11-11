import { createApp } from './app.js';
import { database } from './config/database.js';
import { env } from './config/environment.js';
import { logger } from './utils/logger.js';

const app = createApp();

async function startServer() {
  try {
    await database.connect();

    app.listen(env.PORT, () => {
      logger.info('Servidor corriendo', {
        url: `http://${env.DOMAIN}:${env.PORT}`,
        environment: env.NODE_ENV,
      })
    })
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

startServer();