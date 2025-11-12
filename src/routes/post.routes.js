import { Router } from 'express';
import { POST_ROUTES } from '../constants/paths.js';
import { postController } from '../controllers/PostController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = Router();
// POST
router.post(POST_ROUTES.create, authenticate, (req, res, next) => postController.create(req, res, next));
// GET ALL POSTS
router.get(POST_ROUTES.list, (req, res, next) => postController.list(req, res, next));
// GET POST BY ID
router.get(POST_ROUTES.details, (req, res, next) => postController.getById(req, res, next));
// UPDATE POST
router.put(POST_ROUTES.update, authenticate, (req, res, next) => postController.update(req, res, next));
// // DELETE POST
router.delete(POST_ROUTES.delete, authenticate, (req, res, next) => postController.remove(req, res, next))

export default router;