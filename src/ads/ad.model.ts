import mongoose, { Document, Schema } from 'mongoose';

export interface IAd extends Document {
  title: string;
  imageUrl: string;
  linkUrl: string;
  position: 'sidebar' | 'header' | 'footer';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AdSchema = new Schema<IAd>(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    linkUrl: { type: String, required: true },
    position: { type: String, enum: ['sidebar', 'header', 'footer'], required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Ad = mongoose.model<IAd>('Ad', AdSchema); 