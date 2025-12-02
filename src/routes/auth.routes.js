import { Router } from 'express';
import { authController } from '../controllers/AuthController.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { loginSchema, registerSchema } from '../validators/authValidators.js';

const router = Router();

router.post('/register', validateRequest(registerSchema), (req, res, next) => authController.register(req, res, next));
router.post('/login', validateRequest(loginSchema), (req, res, next) => authController.login(req, res, next));
// router.post('/verify-2fa');

export default router;