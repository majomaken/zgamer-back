export const GLOBAL_HTTP_STATUS = {
  SUCCESS: {
    code: 200,
    message: 'Operación exitosa',
    word: 'OK',
  },
  CREATED: {
    code: 201,
    message: 'Recurso creado correctamente',
    word: 'created',
  },
  NO_CONTENT: {
    code: 204,
    message: 'No content',
    word: 'no content',
  },
  BAD_REQUEST: {
    code: 400,
    message: 'Solicitud inválida',
    word: 'bad request',
  },
  UNAUTHORIZED: {
    code: 401,
    message: 'No autorizado',
    word: 'unauthorized',
  },
  FORBIDDEN: {
    code: 403,
    message: 'Acceso prohibido',
    word: 'forbidden',
  },
  NOT_FOUND: {
    code: 404,
    message: 'Recurso no encontrado',
    word: 'not found',
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: 'Error interno del servidor',
    word: 'internal server error',
  },
};
