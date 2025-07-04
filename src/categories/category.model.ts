import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);

// Always generate a slug from name if slug is missing or empty
CategorySchema.pre('save', function (next) {
  if (!this.slug || this.slug.trim() === '') {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9\u0980-\u09FF]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  next();
});

export const Category = mongoose.model<ICategory>('Category', CategorySchema); 