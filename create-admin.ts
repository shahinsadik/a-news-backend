import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './src/users/user.model';
import { connectDB } from './src/config/db';
import { Router } from 'express';

dotenv.config();

// Set your admin credentials here
const name = 'Shahin Sadik';
const email = 'shahinsadik@gmail.com';
const password = 'Sd@01706995324';

async function main() {
  await connectDB();
  const existingAdmin = await User.findOne({ role: 'admin' });
  if (existingAdmin) {
    console.log('An admin user already exists.');
    process.exit(0);
  }
  try {
    const admin = new User({ name, email, password, role: 'admin' });
    await admin.save();
    console.log('Admin user created successfully!');
  } catch (err: any) {
    console.error('Error creating admin:', err.message);
  } finally {
    mongoose.disconnect();
  }
}

const router = Router();

// You can add your category routes here

export default router;

main();