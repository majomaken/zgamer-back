import express from 'express';
import cors from 'cors';
import { requestDebugger } from './middlewares/requestDebugger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import router from './routes/index.js';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(requestDebugger);

  app.get('/health', (req, res) => {
    res.status(200).json({ message: 'El servidor está funcionando correctamente' });
  })

  app.use('/api', router);

  app.use(errorHandler);

  return app;
}