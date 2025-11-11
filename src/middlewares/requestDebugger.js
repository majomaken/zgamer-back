import { env } from "../config/environment.js";
import { logger } from "../utils/logger.js";

export function requestDebugger(req, res, next) {
  if (env.NODE_ENV === 'development') {
    logger.debug('Petición entrante', {
      status: res.statusCode,
      method: req.method,
      url: req.originalUrl,
      params: req.params,
      query: req.query,
      body: req.body,
    })
  }

  next();
}