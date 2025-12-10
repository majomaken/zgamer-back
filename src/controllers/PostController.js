import { GLOBAL_HTTP_STATUS } from '../constants/global.js';
import { Post } from '../models/Posts.js';
import { postCreateSchema, postUpdateSchema } from '../validators/postValidators.js';

class PostController {
  async list(req, res, next) {
    try {
      const { page = '1', limit = '10' } = req.query;
      const parsedPage = parseInt(page);
      const parsedLimit = parseInt(limit);
      
      const safePage = isNaN(parsedPage) ?? parsedPage < 1 ? 1 : parsedPage;
      const safeLimit = isNaN(parsedLimit) ?? parsedLimit < 1 ? 10 : parsedLimit;
      const skip = (safePage - 1) * safeLimit;

      // Consultar los posts y el total de posts
      const [posts, total] = await Promise.all([
        Post.find()
          .sort({ createdAt: -1 }) // Ordenación descendente por fecha de creación
          .skip(skip)
          .limit(safeLimit)
          .populate('author', 'name email'),
        Post.countDocuments(),
      ]);

      const totalPage = total > 0 ? Math.ceil(total / safeLimit) : 0;

      return res.status(GLOBAL_HTTP_STATUS.SUCCESS.code).json({
        message: GLOBAL_HTTP_STATUS.SUCCESS.message,
        status: GLOBAL_HTTP_STATUS.SUCCESS.word,
        data: {
          posts,
          pagination: {
            page: safePage,
            limit: safeLimit,
            total,
            totalPage,
          }
        },
      })
    } catch (error) {
      return next(error);
    }
  }

  async getById(req, res, next) {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'name email');

        if (!post) {
          return res.status(GLOBAL_HTTP_STATUS.NOT_FOUND.code).json({
            message: GLOBAL_HTTP_STATUS.NOT_FOUND.message,
            status: GLOBAL_HTTP_STATUS.NOT_FOUND.word,
          });
        }

        return res.status(GLOBAL_HTTP_STATUS.SUCCESS.code).json({
          message: GLOBAL_HTTP_STATUS.SUCCESS.message,
          status: GLOBAL_HTTP_STATUS.SUCCESS.word,
          data: post,
        });
    } catch (error) {
      return next(error);
    }
  }

  async create(req, res, next) {
    try {
      const payload = req.body;

      const post = await Post.create({
        ...payload,
        author: req.user.id,
      });

      await post.populate('author', 'name email');

      return res.status(GLOBAL_HTTP_STATUS.CREATED.code).json({
        message: GLOBAL_HTTP_STATUS.CREATED.message,
        status: GLOBAL_HTTP_STATUS.CREATED.word,
        data: post,
      });
    }
    catch (error) {
      return next(error);
    }
  }

  async update(req, res, next) {
    try {
      const payload = req.body;
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(GLOBAL_HTTP_STATUS.NOT_FOUND.code).json({
          message: GLOBAL_HTTP_STATUS.NOT_FOUND.message,
          status: GLOBAL_HTTP_STATUS.NOT_FOUND.word,
        });
      }

      if (post.author.toString() !== req.user.id && req.user.role !== 'admin' && req.user.role !== 'moderator') {
        return res.status(GLOBAL_HTTP_STATUS.FORBIDDEN.code).json({
          message: GLOBAL_HTTP_STATUS.FORBIDDEN.message,
          status: GLOBAL_HTTP_STATUS.FORBIDDEN.word,
        });
      }
      
      Object.assign(post, payload);
      await post.save();
      await post.populate('author', 'name email');

      return res.status(GLOBAL_HTTP_STATUS.SUCCESS.code).json({
        message: GLOBAL_HTTP_STATUS.SUCCESS.message,
        status: GLOBAL_HTTP_STATUS.SUCCESS.word,
        data: post,
      });

    } catch (error) {
      return next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(GLOBAL_HTTP_STATUS.NOT_FOUND.code).json({
          message: GLOBAL_HTTP_STATUS.NOT_FOUND.message,
          status: GLOBAL_HTTP_STATUS.NOT_FOUND.word,
        });
      }

      if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(GLOBAL_HTTP_STATUS.FORBIDDEN.code).json({
          message: GLOBAL_HTTP_STATUS.FORBIDDEN.message,
          status: GLOBAL_HTTP_STATUS.FORBIDDEN.word,
        });
      }

      await post.deleteOne();

      return res.status(GLOBAL_HTTP_STATUS.SUCCESS.code).json({
        message: GLOBAL_HTTP_STATUS.SUCCESS.message,
        status: GLOBAL_HTTP_STATUS.SUCCESS.word,
      });
    } catch (error) {
      return next(error);
    }
  }

}

export const postController = new PostController();