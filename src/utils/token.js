import jwt from 'jsonwebtoken';
import { env } from '../config/environment.js';

export function createAccessToken(userId) {
  return jwt.sign(
    {
      sub: userId,
      type: 'access'
    },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN },
  )
}