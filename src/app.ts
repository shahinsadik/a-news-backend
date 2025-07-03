import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './auth/auth.routes';
import postRoutes from './posts/post.routes';
import uploadRoutes from './uploads/upload.routes';
import categoryRoutes from './categories/category.routes';
import adRoutes from './ads/ad.routes';

dotenv.config();
const app = express();

app.use(express.json());

// Auth routes
app.use('/api/auth', authRoutes);
// Post routes
app.use('/api/posts', postRoutes);
// Upload routes
app.use('/api/uploads', uploadRoutes);
// Category routes
app.use('/api/categories', categoryRoutes);
// Ad routes
app.use('/api/ads', adRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('News portal server is running');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Centralized error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});