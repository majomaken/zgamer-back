import { logger } from "../utils/logger.js";

export function errorHandler(err, req, res, next) {
  logger.error('Error no controlado', { error: err });

  if (res.headersSent) {
    return next(err);
  }

  const status = err.statusCode ?? 500;
  const message = err.message ?? 'Ha ocurrido un error inesperado';

  return res.status(status).json({
    message,
    ...(err.details ? { details: err.details} : {}),
  })
}