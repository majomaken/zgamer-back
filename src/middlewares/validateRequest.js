import { ZodError } from 'zod';
import { GLOBAL_HTTP_STATUS } from '../constants/global.js';

function formatZodErrors(zodError) {
  if (!(zodError instanceof ZodError)) {
    return {};
  }

  const errors = {};

  zodError.issues.forEach((error) => {
    const path = error.path.join('.');
    if (!errors[path]) {
      errors[path] = [];
    }
    errors[path].push(error.message);
  })

  return errors;
}

export function validateRequest(validatorSchema) {
  return (req, res, next) => {
    const result = validatorSchema.safeParse(req.body);

    if (!result.success) {
      const errors = formatZodErrors(result.error);
      return res.status(GLOBAL_HTTP_STATUS.BAD_REQUEST.code).json({
        status: GLOBAL_HTTP_STATUS.BAD_REQUEST.word,
        message: GLOBAL_HTTP_STATUS.BAD_REQUEST.message,
        errors,
      })
    }

    req.body = result.data;
    next();
  }
}
