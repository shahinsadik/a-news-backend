import mongoose, { Document, Schema } from 'mongoose';
import { User } from '../users/user.model';

export interface IPost extends Document {
  title: string;
  slug: string;
  content: string;
  author: mongoose.Types.ObjectId;
  categories: mongoose.Types.ObjectId[];
  tags: string[];
  images: string[];
  youtubeUrls: string[];
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    tags: [{ type: String }],
    images: [{ type: String }],
    youtubeUrls: [{ type: String }],
  },
  { timestamps: true }
);

PostSchema.pre('validate', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  next();
});

export const Post = mongoose.model<IPost>('Post', PostSchema); 