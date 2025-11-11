import { User } from "../models/User.js";
import { createAccessToken } from "../utils/token.js";
import { loginSchema, registerSchema } from "../validators/authValidators.js";

class AuthController {
  async register(req, res, next) {
    try {
      const payload = registerSchema.parse(req.body);

      const existingUser = await User.findOne({ email: payload.email});

      if (existingUser) {
        return res.status(400).json({ message: 'Ya existe un usuario con este email' });
      }

      const user = await User.create(payload);

      return res.status(201).json({
        message: 'Usuario registrado correctamente',
        user: this.#sanitizeUser(user),
      })

    } catch (error) {
      return next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = loginSchema.parse(req.body);

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      if (user.isTwoFactorEnabled) {
        return res.status(200).json({ message: '2FA enabled', user: this.#sanitizeUser(user) });
      }

      const accessToken = createAccessToken(user.id);

      return res.status(200).json({
        message: 'Login exitoso',
        token: accessToken,
        user: this.#sanitizeUser(user),
      })
    } catch (error) {
      return next(error);
    }
  }

  #sanitizeUser(user) {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isTwoFactorEnabled: user.isTwoFactorEnabled,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}

export const authController = new AuthController();