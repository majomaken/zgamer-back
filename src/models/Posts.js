import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'El título es obligatorio'],
      trim: true,
    },
    summary: {
      type: String,
      trim: true,
    },
    excerpt: {
      type: String,
      trim: true,
    },
    content: {
      type: String, // Text, Varchar
      required: [true, 'El contenido es obligatorio'],
    },
    tags: {
      type: [String],
      default: [],
    },
    coverImage: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    images: {
      type: [String],
      default: [],
    }
  },
  {
    timestamps: true,
  },
);

postSchema.index({ title: 'text', content: 'text' });

export const Post = mongoose.model('Post', postSchema);
