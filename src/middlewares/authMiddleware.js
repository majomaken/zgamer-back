import jwt from 'jsonwebtoken';
import { GLOBAL_HTTP_STATUS } from "../constants/global.js";
import { env } from '../config/environment.js';
import { User } from '../models/User.js';

export async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(GLOBAL_HTTP_STATUS.UNAUTHORIZED.code).json({
        message: GLOBAL_HTTP_STATUS.UNAUTHORIZED.message,
        status: GLOBAL_HTTP_STATUS.UNAUTHORIZED.word,
      })
    }

    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, env.JWT_SECRET);

    const user = await User.findById(payload.sub).select('-password -twoFactorCode');

    if (!user) {
      return res.status(GLOBAL_HTTP_STATUS.NOT_FOUND.code).json({
        message: GLOBAL_HTTP_STATUS.NOT_FOUND.message,
        status: GLOBAL_HTTP_STATUS.NOT_FOUND.word,
      })
    }

    req.user = user;
    next();
  } catch {
    return res.status(GLOBAL_HTTP_STATUS.UNAUTHORIZED.code).json({
      message: GLOBAL_HTTP_STATUS.UNAUTHORIZED.message,
      status: GLOBAL_HTTP_STATUS.UNAUTHORIZED.word,
    })
  }
}